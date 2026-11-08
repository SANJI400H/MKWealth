import { NextResponse } from "next/server";
import {
  cookieShouldBeSecure,
  createGuideAccessToken,
  guideAccessCookieOptions,
  guidePublicOrigin,
  verifyGuideGrantToken,
  GUIDE_ACCESS_COOKIE,
} from "@/lib/guide-access";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/** Redeem approved unlock token → set guide cookie → open library. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = guidePublicOrigin(url.origin);
  const token = url.searchParams.get("t") ?? "";
  const verified = await verifyGuideGrantToken(token);

  if (!verified.ok) {
    return NextResponse.redirect(`${origin}/guide?error=invalid`);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/guide?error=config`);
  }
  const { data: leads } = await supabase
    .from("website_leads")
    .select("id,status")
    .eq("email", verified.email)
    .eq("source", "guide")
    .order("submitted_at", { ascending: false })
    .limit(1);
  const lead = leads?.[0];
  if (!lead || lead.status === "rejected" || lead.status === "lost") {
    return NextResponse.redirect(`${origin}/guide?error=invalid`);
  }

  const access = await createGuideAccessToken(lead.id);
  if (!access) {
    return NextResponse.redirect(`${origin}/guide?error=config`);
  }

  const response = NextResponse.redirect(`${origin}/guide?unlocked=1`);
  response.cookies.set(
    GUIDE_ACCESS_COOKIE,
    access,
    guideAccessCookieOptions(cookieShouldBeSecure(request.url)),
  );
  return response;
}

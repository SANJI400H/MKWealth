import { NextResponse } from "next/server";
import {
  cookieShouldBeSecure,
  createGuideAccessToken,
  guideAccessCookieOptions,
  guidePublicOrigin,
  verifyGuideGrantToken,
  GUIDE_ACCESS_COOKIE,
} from "@/lib/guide-access";

/** Redeem approved unlock token → set guide cookie → open library. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = guidePublicOrigin(url.origin);
  const token = url.searchParams.get("t") ?? "";
  const verified = await verifyGuideGrantToken(token);

  if (!verified.ok) {
    return NextResponse.redirect(`${origin}/guide?error=invalid`);
  }

  const access = await createGuideAccessToken();
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

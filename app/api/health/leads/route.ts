import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { leadSheetConfigured } from "@/lib/lead-sheet";
import { getSupabaseAdmin, missingSupabaseEnv } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function configured(name: string): boolean {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0;
}

function tokenMatches(provided: string, expected: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

/** Booleans only. Requires the HEALTHCHECK_TOKEN header. Never returns secret values. */
export async function GET(request: Request) {
  const expected = process.env.HEALTHCHECK_TOKEN?.trim() ?? "";
  const provided = request.headers.get("x-healthcheck-token") ?? "";
  if (!expected || !tokenMatches(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const present = {
    SUPABASE_URL: configured("SUPABASE_URL") || configured("NEXT_PUBLIC_SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: configured("SUPABASE_SERVICE_ROLE_KEY"),
    RESEND_API_KEY: configured("RESEND_API_KEY"),
    LEAD_NOTIFY_EMAIL: configured("LEAD_NOTIFY_EMAIL"),
    LEAD_FROM_EMAIL: configured("LEAD_FROM_EMAIL"),
    GOOGLE_SHEET: leadSheetConfigured(),
    GA4: configured("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
    META_PIXEL: configured("NEXT_PUBLIC_META_PIXEL_ID"),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ present, missing: missingSupabaseEnv(), database: false }, { status: 503 });
  }

  const { error } = await supabase.from("website_leads").select("id").limit(1);
  if (error) {
    console.error("[lead] supabase health check failed", error.message);
    return NextResponse.json({ present, database: false }, { status: 503 });
  }

  return NextResponse.json({ present, database: true });
}

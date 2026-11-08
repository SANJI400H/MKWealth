import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import {
  cookieShouldBeSecure,
  createGuideAccessToken,
  guideAccessCookieOptions,
  GUIDE_ACCESS_COOKIE,
} from "@/lib/guide-access";

/**
 * Investor Guide qualification.
 * Unlocks only after the lead row is saved. No cookie is issued if the details
 * could not be stored.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const clientNotes = typeof input.notes === "string" ? input.notes : "";
  const cleanedNotes = clientNotes
    .replace(/guide_status=\S+/gi, "")
    .replace(/\s+\|\s+/g, " | ")
    .replace(/^\s*\|\s*|\s*\|\s*$/g, "")
    .trim();

  const result = await submitLead({
    ...input,
    source: "guide",
    intent: typeof input.intent === "string" ? input.intent : "Investor Guide qualification",
    leadScoreHint: "tier_2",
    notes: cleanedNotes ? `${cleanedNotes} | guide_status=auto_approved` : "guide_status=auto_approved",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  if (!result.saved || !result.leadId) {
    return NextResponse.json(
      { error: "Your details could not be saved, so the guides stayed locked. Try again." },
      { status: 503 },
    );
  }

  const token = await createGuideAccessToken(result.leadId);
  if (!token) {
    return NextResponse.json(
      { error: "Guide access is not configured. Contact Morgan directly." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({
    ok: true,
    status: "approved",
    emailed: result.emailed,
    saved: true,
    message: "Guide unlocked.",
  });
  response.cookies.set(GUIDE_ACCESS_COOKIE, token, guideAccessCookieOptions(cookieShouldBeSecure(request.url)));
  return response;
}

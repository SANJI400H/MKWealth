import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import {
  cookieShouldBeSecure,
  createGuideAccessToken,
  getGuideGrantKey,
  guideAccessCookieOptions,
  guidePublicOrigin,
  isGuideAutoApproveEnabled,
  GUIDE_ACCESS_COOKIE,
} from "@/lib/guide-access";

/**
 * Investor Guide qualification submit.
 * Always notifies Morgan. Unlocks immediately only when GUIDE_AUTO_APPROVE=true;
 * otherwise status stays pending until /api/guide/grant.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const auto = isGuideAutoApproveEnabled();
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";

  const result = await submitLead({
    ...input,
    source: "guide",
    intent: typeof input.intent === "string" ? input.intent : "Investor Guide qualification",
    leadScoreHint: "tier_2",
    notes:
      typeof input.notes === "string" && input.notes.trim()
        ? `${input.notes} | guide_status=${auto ? "auto_approved" : "pending_manual"}`
        : `guide_status=${auto ? "auto_approved" : "pending_manual"}`,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  if (auto) {
    const token = await createGuideAccessToken();
    const response = NextResponse.json({
      ok: true,
      status: "approved",
      emailed: result.emailed,
      saved: result.saved,
      leadId: result.leadId,
      message: "Guide unlocked.",
    });
    if (token) {
      response.cookies.set(
        GUIDE_ACCESS_COOKIE,
        token,
        guideAccessCookieOptions(cookieShouldBeSecure(request.url)),
      );
    }
    return response;
  }

  // Include approve link for Morgan in notify email body via a second note — already in lead notes.
  // Build grant URL for ops (returned to client only as pending message; full URL in Resend to LEAD_NOTIFY).
  const grantKey = getGuideGrantKey();
  let approveUrl = "";
  if (email && grantKey) {
    approveUrl = `${guidePublicOrigin(new URL(request.url).origin)}/api/guide/grant?email=${encodeURIComponent(email)}&key=${encodeURIComponent(grantKey)}&action=approve`;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";
  if (apiKey && notify && approveUrl) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [notify],
          subject: `Guide access pending: ${email || result.payload.email}`,
          text: [
            "A prospect completed Investor Guide qualification and awaits approval.",
            "",
            `Name: ${result.payload.name}`,
            `Phone: ${result.payload.phone}`,
            `Email: ${result.payload.email}`,
            `Notes: ${result.payload.notes}`,
            "",
            `Approve (sends unlock link to prospect):`,
            approveUrl,
            "",
            `Reject:`,
            approveUrl.replace("action=approve", "action=reject"),
          ].join("\n"),
        }),
      });
    } catch (error) {
      console.error("guide-request: notify failed", error);
    }
  }

  return NextResponse.json({
    ok: true,
    status: "pending",
    emailed: result.emailed,
    saved: result.saved,
    leadId: result.leadId,
    message:
      "Details received. Morgan will review your application. You will receive an unlock link by email if approved.",
  });
}

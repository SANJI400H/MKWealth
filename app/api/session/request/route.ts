import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import { getSessionGrantKey, sessionPublicOrigin } from "@/lib/session-access";
import { siteConfig } from "@/lib/site-config";

/**
 * Strategy session intake.
 * Saves lead as pending_manual and emails Morgan Approve / Reject links.
 * Morgan books Google Calendar + Meet after approval (no visitor self-booking).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";

  const result = await submitLead({
    ...input,
    source: "strategy-session",
    intent:
      typeof input.intent === "string" && input.intent.trim()
        ? input.intent
        : "30-minute-strategy-session",
    leadScoreHint: "high",
    notes:
      typeof input.notes === "string" && input.notes.trim()
        ? `${input.notes} | session_status=pending_manual`
        : "session_status=pending_manual",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const grantKey = getSessionGrantKey();
  const origin = sessionPublicOrigin(new URL(request.url).origin);
  let approveUrl = "";
  if (email && grantKey) {
    approveUrl = `${origin}/api/session/grant?email=${encodeURIComponent(email)}&key=${encodeURIComponent(grantKey)}&action=approve`;
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
          subject: `Strategy session pending: ${email || result.payload.email}`,
          text: [
            "A prospect requested a 30-minute strategy session and awaits your approval.",
            "",
            `Name: ${result.payload.name}`,
            `Phone: ${result.payload.phone}`,
            `Email: ${result.payload.email}`,
            `Owns property: ${result.payload.existingUaeProperty || "—"}`,
            `Capital: ${result.payload.budgetRange || "—"}`,
            `Notes: ${result.payload.notes}`,
            "",
            "Approve (opens this site — pick Meet time, paste link, email client):",
            approveUrl,
            "",
            "Reject:",
            approveUrl.replace("action=approve", "action=reject"),
            "",
            "After Approve: create a Google Calendar event with Meet for their email,",
            "paste the Meet link on the approval page, and the client is emailed that link.",
            `Booking schedule: ${siteConfig.bookingUrl}`,
          ].join("\n"),
        }),
      });
    } catch (error) {
      console.error("session-request: notify failed", error);
    }
  }

  return NextResponse.json({
    ok: true,
    status: "pending",
    emailed: result.emailed,
    saved: result.saved,
    leadId: result.leadId,
    message:
      "Details received. Morgan will review your request and send a calendar invite with Google Meet if approved.",
  });
}

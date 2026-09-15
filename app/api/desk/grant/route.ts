import { NextResponse } from "next/server";
import {
  createDeskGrantToken,
  getDeskGrantKey,
} from "@/lib/desk-access";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

/**
 * Admin approval endpoint.
 * GET /api/desk/grant?email=client@example.com&key=DESK_GRANT_SECRET
 * Returns an unlock URL Morgan can forward (and emails the client when Resend is configured).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("email") ?? "").trim().toLowerCase();
  const key = url.searchParams.get("key") ?? "";
  const expected = getDeskGrantKey();

  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email query param required." }, { status: 400 });
  }

  const token = await createDeskGrantToken(email);
  if (!token) {
    return NextResponse.json(
      { error: "Could not create grant token. Check DESK_ACCESS_SECRET." },
      { status: 500 },
    );
  }

  const unlockUrl = absoluteUrl(`/desk/unlock?t=${encodeURIComponent(token)}`);

  let emailed = false;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";
  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject: "Your Private Desk access — Morgan Kaiser",
          text: [
            "Morgan has approved your Private Desk access.",
            "",
            `Open this link to unlock (valid for a limited time):`,
            unlockUrl,
            "",
            "After unlocking, visit the Private Desk anytime from the site navigation.",
            "",
            siteConfig.name,
          ].join("\n"),
        }),
      });
      emailed = response.ok;
      if (!response.ok) {
        console.error("desk-grant: Resend failed", response.status, await response.text().catch(() => ""));
      }
    } catch (error) {
      console.error("desk-grant: Resend error", error);
    }
  }

  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (apiKey && notify) {
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
          subject: `Desk approved: ${email}`,
          text: `Unlock URL (also emailed to client if delivery succeeded: ${emailed}):\n${unlockUrl}`,
        }),
      });
    } catch {
      /* ignore notify failure */
    }
  }

  return NextResponse.json({ ok: true, email, unlockUrl, emailed });
}

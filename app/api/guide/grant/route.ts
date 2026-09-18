import { NextResponse } from "next/server";
import {
  createGuideGrantToken,
  getGuideGrantKey,
  guidePublicOrigin,
} from "@/lib/guide-access";

async function sendResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<{ ok: boolean; status: number | null; detail: string }> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        subject: opts.subject,
        text: opts.text,
      }),
    });
    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).slice(0, 240);
      return { ok: false, status: response.status, detail };
    }
    return { ok: true, status: response.status, detail: "" };
  } catch {
    return { ok: false, status: null, detail: "network_error" };
  }
}

function wantsHtml(request: Request, url: URL) {
  if (url.searchParams.get("format") === "json") return false;
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

function htmlPage(title: string, body: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:10vh auto;padding:1.5rem;line-height:1.5;color:#111}code,a{word-break:break-all} .ok{color:#0a7} .warn{color:#a60}</style></head><body>${body}</body></html>`;
}

/**
 * Morgan / ops approval for Investor Guide.
 * GET /api/guide/grant?email=&key=&action=approve|reject
 * Browser → HTML with unlock link. Add &format=json for API.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("email") ?? "").trim().toLowerCase();
  const key = url.searchParams.get("key") ?? "";
  const action = (url.searchParams.get("action") ?? "approve").toLowerCase();
  const expected = getGuideGrantKey();
  const html = wantsHtml(request, url);

  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";
  const notify = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const origin = guidePublicOrigin(url.origin);

  if (action === "reject") {
    let prospectEmailed = false;
    let prospectDetail = "";
    if (apiKey) {
      const sent = await sendResend({
        apiKey,
        from,
        to: email,
        subject: "Investor Guide application — Morgan Kaiser",
        text: [
          "Thank you for your interest in Morgan Kaiser's Investor Guide.",
          "",
          "We are unable to approve access at this time. If your situation changes, reply to this email or book a strategy session.",
        ].join("\n"),
      });
      prospectEmailed = sent.ok;
      prospectDetail = sent.detail;
      if (!sent.ok && notify) {
        await sendResend({
          apiKey,
          from,
          to: notify,
          subject: `Guide rejected: ${email}`,
          text: `Rejected ${email}. Prospect email delivery: failed (${sent.status} ${sent.detail}). Notify them manually if needed.`,
        });
      }
    }
    if (html) {
      return new NextResponse(
        htmlPage(
          "Guide rejected",
          `<h1>Rejected</h1><p>Application for <strong>${email}</strong> marked rejected.</p><p class="${prospectEmailed ? "ok" : "warn"}">Prospect email: ${prospectEmailed ? "sent" : "not sent — notify manually if needed"}.</p>`,
        ),
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }
    return NextResponse.json({ ok: true, email, status: "rejected", emailed: prospectEmailed });
  }

  const token = await createGuideGrantToken(email);
  if (!token) {
    return NextResponse.json({ error: "Could not create unlock token." }, { status: 500 });
  }

  const unlockUrl = `${origin}/guide/unlock?t=${encodeURIComponent(token)}`;

  let emailed = false;
  let resendStatus: number | null = null;
  let resendDetail = "";
  let notifyOk = false;

  if (apiKey) {
    const prospect = await sendResend({
      apiKey,
      from,
      to: email,
      subject: "Your Investor Guide access — Morgan Kaiser",
      text: [
        "Morgan has approved your access to the private Investor Guide.",
        "",
        "Open this link to choose your topics:",
        unlockUrl,
        "",
        "Private videos and PDF briefings will be emailed to you for the topics you select.",
        "You can return to the guide on this browser after unlocking.",
      ].join("\n"),
    });
    emailed = prospect.ok;
    resendStatus = prospect.status;
    resendDetail = prospect.detail;

    // Always send Morgan the unlock URL (Resend onboarding often cannot email arbitrary prospect addresses).
    if (notify) {
      const ops = await sendResend({
        apiKey,
        from,
        to: notify,
        subject: emailed
          ? `Guide approved + emailed: ${email}`
          : `Guide approved — FORWARD unlock link: ${email}`,
        text: [
          `Approved Investor Guide access for ${email}.`,
          "",
          `Prospect email delivery: ${emailed ? "OK" : `FAILED (${resendStatus ?? "n/a"}) ${resendDetail}`}`,
          "",
          "Unlock link (forward to the prospect if email failed):",
          unlockUrl,
        ].join("\n"),
      });
      notifyOk = ops.ok;
    }
  }

  if (html) {
    return new NextResponse(
      htmlPage(
        "Guide approved",
        `<h1 class="ok">Approved</h1>
<p>Access approved for <strong>${email}</strong>.</p>
<p class="${emailed ? "ok" : "warn"}">Prospect email: <strong>${emailed ? "sent" : "not sent"}</strong>${emailed ? "" : " (Resend may block unverified recipients — forward the link below)."}</p>
<p>Unlock link:</p>
<p><a href="${unlockUrl}">${unlockUrl}</a></p>
<p>Ops notify email: ${notifyOk ? "sent" : notify ? "failed" : "not configured"}.</p>`,
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.json({
    ok: true,
    email,
    status: "approved",
    unlockUrl,
    emailed,
    notifyOk,
    resendStatus,
  });
}

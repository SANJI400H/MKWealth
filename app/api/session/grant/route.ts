import { NextResponse } from "next/server";
import { getSessionGrantKey, sessionPublicOrigin } from "@/lib/session-access";
import { siteConfig } from "@/lib/site-config";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

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
<style>
body{font-family:system-ui,sans-serif;max-width:40rem;margin:8vh auto;padding:1.5rem;line-height:1.5;color:#111}
a{color:#681A2B;word-break:break-all}
.ok{color:#0a7}.warn{color:#a60}
label{display:block;margin-top:1rem;font-size:.875rem;color:#444}
input,textarea{width:100%;margin-top:.35rem;padding:.65rem .75rem;border:1px solid #ccc;border-radius:4px;font:inherit;box-sizing:border-box}
button{margin-top:1rem;padding:.7rem 1.1rem;border:0;border-radius:4px;background:#681A2B;color:#fff;font:inherit;cursor:pointer}
.steps{margin:1.25rem 0;padding-left:1.2rem}
</style></head><body>${body}</body></html>`;
}

async function updateSessionLeadStatus(
  email: string,
  status: "qualified" | "rejected" | "session_booked",
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("email", email.toLowerCase())
    .eq("source", "strategy-session");
  if (error) {
    console.error("session-grant: status update failed", error.message);
    return false;
  }
  return true;
}

function authOrError(url: URL) {
  const email = (url.searchParams.get("email") ?? "").trim().toLowerCase();
  const key = url.searchParams.get("key") ?? "";
  const expected = getSessionGrantKey();
  if (!expected || key !== expected) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  if (!email.includes("@")) {
    return { error: NextResponse.json({ error: "Valid email required." }, { status: 400 }) };
  }
  return { email, key };
}

/**
 * Morgan / ops approval for strategy sessions.
 * GET  /api/session/grant?email=&key=&action=approve|reject
 *   → Approve opens THIS site with calendar CTA + form to paste Meet link (no jump to .ae).
 * POST /api/session/grant  (email, key, meetLink, whenNote?)
 *   → Emails prospect the Meet / calendar link Morgan picked.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const auth = authOrError(url);
  if ("error" in auth && auth.error) return auth.error;
  const email = auth.email!;
  const key = auth.key!;
  const action = (url.searchParams.get("action") ?? "approve").toLowerCase();
  const html = wantsHtml(request, url);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";
  const notify = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const origin = sessionPublicOrigin(url.origin);
  const bookingUrl = siteConfig.bookingUrl;

  if (action === "reject") {
    await updateSessionLeadStatus(email, "rejected");
    let prospectEmailed = false;
    if (apiKey) {
      const sent = await sendResend({
        apiKey,
        from,
        to: email,
        subject: "Strategy session request — Morgan Kaiser",
        text: [
          "Thank you for your interest in a strategy session with Morgan Kaiser.",
          "",
          "We are unable to offer a session at this time. If your situation changes, reply to this email or request again from the site.",
          "",
          origin,
        ].join("\n"),
      });
      prospectEmailed = sent.ok;
      if (!sent.ok && notify) {
        await sendResend({
          apiKey,
          from,
          to: notify,
          subject: `Strategy session rejected: ${email}`,
          text: `Rejected ${email}. Prospect email delivery: failed (${sent.status} ${sent.detail}). Notify them manually if needed.`,
        });
      }
    }
    if (html) {
      return new NextResponse(
        htmlPage(
          "Session rejected",
          `<h1>Rejected</h1><p>Strategy session for <strong>${email}</strong> marked rejected.</p><p class="${prospectEmailed ? "ok" : "warn"}">Prospect email: ${prospectEmailed ? "sent" : "not sent — notify manually if needed"}.</p>`,
        ),
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }
    return NextResponse.json({ ok: true, email, status: "rejected", emailed: prospectEmailed });
  }

  await updateSessionLeadStatus(email, "qualified");

  if (html) {
    const sendUrl = `${origin}/api/session/grant`;
    return new NextResponse(
      htmlPage(
        "Approve + send Meet link",
        `<h1 class="ok">Lead approved</h1>
<p><strong>${email}</strong> is approved. Complete booking on this page — do not use an old .ae link.</p>
<ol class="steps">
  <li>Open your calendar and create an event with <strong>Google Meet</strong>, inviting <code>${email}</code>.</li>
  <li>Copy the Meet link (or the calendar invite link).</li>
  <li>Paste it below and send — the client gets the approval email with that link.</li>
</ol>
<p><a href="${bookingUrl}" target="_blank" rel="noopener noreferrer">Open booking schedule →</a></p>
<form method="POST" action="${sendUrl}">
  <input type="hidden" name="email" value="${email}" />
  <input type="hidden" name="key" value="${key}" />
  <input type="hidden" name="action" value="send_meet" />
  <label>Meeting / Google Meet link
    <input name="meetLink" type="url" required placeholder="https://meet.google.com/…" />
  </label>
  <label>When (optional note for the client)
    <input name="whenNote" type="text" placeholder="e.g. Tue 23 Sep, 4:00 PM GST" />
  </label>
  <button type="submit">Email client approval + Meet link</button>
</form>`,
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.json({
    ok: true,
    email,
    status: "approved_pending_meet_link",
    bookingUrl,
    message: "POST meetLink to email the client.",
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let email = "";
  let key = "";
  let meetLink = "";
  let whenNote = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    key = typeof body.key === "string" ? body.key : "";
    meetLink = typeof body.meetLink === "string" ? body.meetLink.trim() : "";
    whenNote = typeof body.whenNote === "string" ? body.whenNote.trim() : "";
  } else {
    const form = await request.formData();
    email = String(form.get("email") ?? "")
      .trim()
      .toLowerCase();
    key = String(form.get("key") ?? "");
    meetLink = String(form.get("meetLink") ?? "").trim();
    whenNote = String(form.get("whenNote") ?? "").trim();
  }

  const expected = getSessionGrantKey();
  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(meetLink)) {
    return NextResponse.json({ error: "A valid http(s) Meet / calendar link is required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";
  const notify = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const origin = sessionPublicOrigin(new URL(request.url).origin);

  await updateSessionLeadStatus(email, "session_booked");

  let emailed = false;
  let notifyOk = false;
  let resendDetail = "";

  if (apiKey) {
    const prospect = await sendResend({
      apiKey,
      from,
      to: email,
      subject: "Your strategy session is booked — Morgan Kaiser",
      text: [
        "Morgan has approved and booked your 30-minute property strategy session.",
        "",
        whenNote ? `When: ${whenNote}` : null,
        "Join with this link:",
        meetLink,
        "",
        "Add it to your calendar if you have not already received a Google Calendar invite.",
        "",
        "See you then,",
        "Morgan Kaiser",
      ]
        .filter(Boolean)
        .join("\n"),
    });
    emailed = prospect.ok;
    resendDetail = prospect.detail;

    if (notify) {
      const ops = await sendResend({
        apiKey,
        from,
        to: notify,
        subject: emailed
          ? `Meet link sent to client: ${email}`
          : `Meet link ready — FORWARD to client: ${email}`,
        text: [
          `Session booked for ${email}.`,
          whenNote ? `When: ${whenNote}` : "",
          `Meet link: ${meetLink}`,
          "",
          `Prospect email: ${emailed ? "OK" : `FAILED ${resendDetail}`}`,
          "",
          origin,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      notifyOk = ops.ok;
    }
  }

  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/html") || contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    return new NextResponse(
      htmlPage(
        "Meet link sent",
        `<h1 class="${emailed ? "ok" : "warn"}">${emailed ? "Client emailed" : "Email failed"}</h1>
<p>Lead: <strong>${email}</strong></p>
<p>Meet link: <a href="${meetLink}">${meetLink}</a></p>
${whenNote ? `<p>When: ${whenNote}</p>` : ""}
<p>Prospect email: <strong>${emailed ? "sent" : "not sent — forward the link manually"}</strong></p>
<p>Ops notify: ${notifyOk ? "sent" : notify ? "failed" : "not configured"}</p>`,
      ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.json({
    ok: true,
    email,
    status: "session_booked",
    meetLink,
    emailed,
    notifyOk,
  });
}

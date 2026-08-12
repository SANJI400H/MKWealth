const PHONE_PATTERN = /^\+?[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  source?: unknown;
  intent?: unknown;
};

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  source: string;
  intent: string;
  submittedAt: string;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseLead(body: LeadInput):
  | { ok: true; payload: LeadPayload }
  | { ok: false; error: string; status: number } {
  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone).replace(/[\s()-]/g, "");
  const email = asTrimmedString(body.email);
  const source = asTrimmedString(body.source) || "guide-gate";
  const intent = asTrimmedString(body.intent);

  if (!name || name.length < 2) {
    return { ok: false, error: "Enter your full name.", status: 400 };
  }
  if (!PHONE_PATTERN.test(phone)) {
    return {
      ok: false,
      error: "Enter a valid phone number with country code (e.g. +971…).",
      status: 400,
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address.", status: 400 };
  }

  return {
    ok: true,
    payload: {
      name,
      phone,
      email,
      source,
      intent,
      submittedAt: new Date().toISOString(),
    },
  };
}

async function notifyByEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";

  if (!apiKey || !to) return false;

  const subject = `New lead (${payload.source}${payload.intent ? ` · ${payload.intent}` : ""})`;
  const text = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Source: ${payload.source}`,
    payload.intent ? `Intent: ${payload.intent}` : null,
    `Submitted: ${payload.submittedAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("lead: Resend failed", response.status, detail);
    return false;
  }

  return true;
}

export async function submitLead(body: LeadInput) {
  const parsed = parseLead(body);
  if (!parsed.ok) return parsed;

  const emailed = await notifyByEmail(parsed.payload);
  if (!emailed) {
    console.info("lead (email not configured or failed):", parsed.payload);
  }

  return { ok: true as const, emailed, payload: parsed.payload };
}

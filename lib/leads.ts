/**
 * Expanded CRM-ready lead model.
 * Not all fields are required on every form. Progressive collection.
 */

const PHONE_PATTERN = /^\+?[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LEAD_SOURCES = [
  "guide",
  "guide-gate", // legacy alias
  "tools",
  "calculator",
  "analyse",
  "strategy-session",
  "insight",
  "whatsapp",
  "newsletter",
  "service",
  "invest",
  "contact",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  source?: unknown;
  intent?: unknown;
  country?: unknown;
  propertyName?: unknown;
  purchasePrice?: unknown;
  expectedRent?: unknown;
  marketType?: unknown;
  objective?: unknown;
  timeline?: unknown;
  notes?: unknown;
  budgetRange?: unknown;
  propertyType?: unknown;
  market?: unknown;
  financing?: unknown;
  existingUaeProperty?: unknown;
  contentSource?: unknown;
  calculatorSnapshot?: unknown;
  attribution?: unknown;
  leadScoreHint?: unknown;
};

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  source: string;
  intent: string;
  country: string;
  propertyName: string;
  purchasePrice: string;
  expectedRent: string;
  marketType: string;
  objective: string;
  timeline: string;
  notes: string;
  budgetRange: string;
  propertyType: string;
  market: string;
  financing: string;
  existingUaeProperty: string;
  contentSource: string;
  calculatorSnapshot: string;
  attribution: string;
  leadScoreHint: string;
  submittedAt: string;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asJsonString(value: unknown) {
  if (value == null || value === "") return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

export function parseLead(body: LeadInput):
  | { ok: true; payload: LeadPayload }
  | { ok: false; error: string; status: number } {
  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone).replace(/[\s()-]/g, "");
  const email = asTrimmedString(body.email);
  const source = asTrimmedString(body.source) || "guide";
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
      country: asTrimmedString(body.country),
      propertyName: asTrimmedString(body.propertyName),
      purchasePrice: asTrimmedString(body.purchasePrice),
      expectedRent: asTrimmedString(body.expectedRent),
      marketType: asTrimmedString(body.marketType),
      objective: asTrimmedString(body.objective),
      timeline: asTrimmedString(body.timeline),
      notes: asTrimmedString(body.notes),
      budgetRange: asTrimmedString(body.budgetRange),
      propertyType: asTrimmedString(body.propertyType),
      market: asTrimmedString(body.market),
      financing: asTrimmedString(body.financing),
      existingUaeProperty: asTrimmedString(body.existingUaeProperty),
      contentSource: asTrimmedString(body.contentSource),
      calculatorSnapshot: asJsonString(body.calculatorSnapshot),
      attribution: asJsonString(body.attribution),
      leadScoreHint: asTrimmedString(body.leadScoreHint),
      submittedAt: new Date().toISOString(),
    },
  };
}

async function notifyByEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "Morgan Kaiser <onboarding@resend.dev>";

  if (!apiKey || !to) return false;

  try {
    const subject = `New lead (${payload.source}${payload.intent ? ` · ${payload.intent}` : ""})`;
    const lines = Object.entries(payload)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);

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
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("lead: Resend failed", response.status, detail);
      return false;
    }

    return true;
  } catch (error) {
    console.error("lead: Resend request error", error);
    return false;
  }
}

export async function submitLead(body: LeadInput) {
  const parsed = parseLead(body);
  if (!parsed.ok) return parsed;

  // Hook point for future CRM webhook
  // await forwardToCrm(parsed.payload)

  const emailed = await notifyByEmail(parsed.payload);
  if (!emailed) {
    console.info("lead (email not configured or failed):", parsed.payload);
  }

  return { ok: true as const, emailed, payload: parsed.payload };
}

import { NextResponse } from "next/server";

const PHONE_PATTERN = /^\+?[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadBody {
  name?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  email?: unknown;
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
  }
  if (!PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number with country code." }, { status: 400 });
  }
  if (!PHONE_PATTERN.test(whatsapp)) {
    return NextResponse.json({ error: "Enter a valid WhatsApp number with country code." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const payload = {
    name,
    phone,
    whatsapp,
    email,
    source: "guide-gate",
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("guide-lead: webhook responded", response.status);
      return NextResponse.json({ error: "Could not submit right now. Please try again." }, { status: 502 });
    }
  } else {
    // GHL deferred — unlock locally; log lead for now.
    console.info("guide-lead (no webhook):", payload);
  }

  return NextResponse.json({ ok: true });
}

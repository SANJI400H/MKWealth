import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

/** Legacy endpoint — same simple lead capture as /api/lead. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await submitLead({
    name: body.name,
    phone: body.phone,
    email: body.email,
    source: "guide",
    intent: body.intent,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, emailed: result.emailed });
}

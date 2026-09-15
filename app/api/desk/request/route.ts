import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

/** Prospect requests Private Desk access (does not unlock). Morgan approves via /api/desk/grant. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const result = await submitLead({
    ...input,
    source: "desk-request",
    intent: typeof input.intent === "string" ? input.intent : "Private Desk access",
    leadScoreHint: "high",
    notes:
      typeof input.notes === "string" && input.notes.trim()
        ? input.notes
        : "Requested Private Desk access. Approve via /api/desk/grant?email=EMAIL&key=DESK_GRANT_SECRET",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    ok: true,
    emailed: result.emailed,
    message:
      "Request received. After your strategy call, Morgan will send an unlock link if approved.",
  });
}

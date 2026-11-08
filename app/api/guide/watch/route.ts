import { NextResponse } from "next/server";
import { guideLeadFromCookies } from "@/lib/guide-session";
import { parseWatchBody, recordGuideWatch } from "@/lib/guide-watch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const lead = await guideLeadFromCookies();
  if (!lead) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseWatchBody(body);
  if (!parsed) return NextResponse.json({ error: "Invalid watch event." }, { status: 400 });

  await recordGuideWatch({
    leadId: lead.leadId,
    videoId: parsed.videoId,
    event: parsed.event,
    positionSec: parsed.positionSec,
    durationSec: parsed.durationSec,
    userAgent: request.headers.get("user-agent") ?? "",
  });

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
}

import { getPrivateGuide, GUIDE_VIDEO_BUCKET } from "@/content/private-guides";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type WatchEvent = "start" | "progress" | "complete";

const EVENTS = new Set<WatchEvent>(["start", "progress", "complete"]);

export function parseWatchBody(body: unknown): {
  videoId: string;
  event: WatchEvent;
  positionSec: number | null;
  durationSec: number | null;
} | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const videoId = typeof record.videoId === "string" ? record.videoId : "";
  const event = typeof record.event === "string" ? record.event : "";
  if (!getPrivateGuide(videoId) || !EVENTS.has(event as WatchEvent)) return null;
  return {
    videoId,
    event: event as WatchEvent,
    positionSec: finiteNumber(record.positionSec),
    durationSec: finiteNumber(record.durationSec),
  };
}

function finiteNumber(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 60 * 60 * 12) return null;
  return Math.round(n * 10) / 10;
}

export async function recordGuideWatch(input: {
  leadId: string;
  videoId: string;
  event: WatchEvent;
  positionSec: number | null;
  durationSec: number | null;
  userAgent: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const row = {
    lead_id: input.leadId,
    video_id: input.videoId,
    event: input.event,
    position_sec: input.positionSec,
    duration_sec: input.durationSec,
    user_agent: input.userAgent.slice(0, 240),
  };

  const inserted = await supabase.from("guide_watch_events").insert(row);
  if (!inserted.error) return;

  if (input.event === "progress") return;

  const { data } = await supabase.from("website_leads").select("notes").eq("id", input.leadId).maybeSingle();
  const notes = typeof data?.notes === "string" ? data.notes : "";
  const line = `[watch] ${new Date().toISOString()} ${input.videoId} ${input.event}${
    input.positionSec != null ? ` ${input.positionSec}s` : ""
  }`;
  if (notes.length < 12000) {
    await supabase
      .from("website_leads")
      .update({ notes: notes ? `${notes}\n${line}` : line })
      .eq("id", input.leadId);
  }

  const path = `watch-log/${input.leadId}.json`;
  const existing = await supabase.storage.from(GUIDE_VIDEO_BUCKET).download(path);
  let events: unknown[] = [];
  if (existing.data) {
    try {
      const parsed = JSON.parse(await existing.data.text()) as unknown;
      if (Array.isArray(parsed)) events = parsed.slice(-199);
    } catch {
      events = [];
    }
  }
  events.push({ ...row, at: new Date().toISOString() });
  await supabase.storage.from(GUIDE_VIDEO_BUCKET).upload(path, JSON.stringify(events), {
    contentType: "application/json",
    upsert: true,
  });
}

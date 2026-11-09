import { NextResponse } from "next/server";
import { getPrivateGuide, GUIDE_VIDEO_BUCKET } from "@/content/private-guides";
import { guideLeadFromCookies } from "@/lib/guide-session";
import { getSupabaseServerConfig } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function storageConfig(): { url: string; key: string } | null {
  return getSupabaseServerConfig();
}

/** Playlist only. Segment URLs point back at this site so the cookie is checked again. */
export async function GET(_request: Request, ctx: { params: { id: string } }) {
  const lead = await guideLeadFromCookies();
  if (!lead) return new NextResponse("Unauthorized", { status: 401 });

  const guide = getPrivateGuide(ctx.params.id);
  if (!guide || !/^guide-\d{2}\/index\.m3u8$/.test(guide.objectPath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const cfg = storageConfig();
  if (!cfg) return new NextResponse("Unavailable", { status: 503 });

  const upstream = await fetch(
    `${cfg.url}/storage/v1/object/authenticated/${GUIDE_VIDEO_BUCKET}/${guide.objectPath}`,
    {
      headers: { Authorization: `Bearer ${cfg.key}`, apikey: cfg.key },
      cache: "no-store",
    },
  );
  if (!upstream.ok) return new NextResponse("Not found", { status: 404 });

  const raw = await upstream.text();
  const body = raw
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return line;
      const match = trimmed.match(/^seg(\d+)\.ts$/);
      if (!match) return "";
      return `/api/guide/media/${guide.id}/seg/${Number(match[1])}`;
    })
    .filter((line) => line !== "")
    .join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
  });
}

import { NextResponse } from "next/server";
import { getPrivateGuide, GUIDE_VIDEO_BUCKET } from "@/content/private-guides";
import { guideLeadFromCookies } from "@/lib/guide-session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function storageConfig(): { url: string; key: string } | null {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "").trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  if (!url || !key) return null;
  return { url, key };
}

export async function GET(_request: Request, ctx: { params: { id: string; n: string } }) {
  const lead = await guideLeadFromCookies();
  if (!lead) return new NextResponse("Unauthorized", { status: 401 });

  const guide = getPrivateGuide(ctx.params.id);
  if (!/^\d{1,4}$/.test(ctx.params.n) || !guide) return new NextResponse("Not found", { status: 404 });

  const cfg = storageConfig();
  if (!cfg) return new NextResponse("Unavailable", { status: 503 });

  const name = `seg${ctx.params.n.padStart(3, "0")}.ts`;
  const upstream = await fetch(
    `${cfg.url}/storage/v1/object/authenticated/${GUIDE_VIDEO_BUCKET}/${guide.id}/${name}`,
    {
      headers: { Authorization: `Bearer ${cfg.key}`, apikey: cfg.key },
      cache: "no-store",
    },
  );
  if (!upstream.ok) return new NextResponse("Not found", { status: 404 });

  const headers = new Headers({
    "Content-Type": "video/mp2t",
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Cross-Origin-Resource-Policy": "same-origin",
  });
  const length = upstream.headers.get("content-length");
  if (length) headers.set("Content-Length", length);

  return new NextResponse(upstream.body, { status: 200, headers });
}

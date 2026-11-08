import { NextResponse } from "next/server";
import { privateGuides } from "@/content/private-guides";
import { guideLeadFromCookies } from "@/lib/guide-session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Titles and order only. Media bytes stay behind /api/guide/media. */
export async function GET() {
  const lead = await guideLeadFromCookies();
  if (!lead) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  return NextResponse.json(
    {
      guides: privateGuides.map((guide, index) => ({
        id: guide.id,
        title: guide.title,
        index,
      })),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import {
  createToolsAccessToken,
  shouldUnlockToolsForLeadSource,
  TOOLS_ACCESS_COOKIE,
  toolsAccessCookieOptions,
} from "@/lib/tools-access";

function cookieShouldBeSecure(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return false;
    return url.protocol === "https:";
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await submitLead((body ?? {}) as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const response = NextResponse.json({
    ok: true,
    emailed: result.emailed,
    saved: result.saved,
    leadId: result.leadId,
  });

  if (shouldUnlockToolsForLeadSource(result.payload.source)) {
    const token = await createToolsAccessToken();
    if (token) {
      response.cookies.set(
        TOOLS_ACCESS_COOKIE,
        token,
        toolsAccessCookieOptions(cookieShouldBeSecure(request)),
      );
    }
  }

  return response;
}

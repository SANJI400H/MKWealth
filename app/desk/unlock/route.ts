import { NextResponse } from "next/server";
import {
  cookieShouldBeSecure,
  createDeskAccessToken,
  deskAccessCookieOptions,
  DESK_ACCESS_COOKIE,
  verifyDeskGrantToken,
} from "@/lib/desk-access";

/** GET /desk/unlock?t=… — redeem grant token, set desk cookie, redirect to /desk. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const token = url.searchParams.get("t") ?? "";
  const verified = await verifyDeskGrantToken(token);

  if (!verified.ok) {
    return NextResponse.redirect(`${origin}/desk?error=invalid`);
  }

  const access = await createDeskAccessToken();
  if (!access) {
    return NextResponse.redirect(`${origin}/desk?error=config`);
  }

  const response = NextResponse.redirect(`${origin}/desk?unlocked=1`);
  response.cookies.set(
    DESK_ACCESS_COOKIE,
    access,
    deskAccessCookieOptions(cookieShouldBeSecure(request.url)),
  );
  return response;
}

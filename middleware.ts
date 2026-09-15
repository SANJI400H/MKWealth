import { NextResponse, type NextRequest } from "next/server";

/**
 * Guide property can live on a dedicated host (e.g. guide.morgankaiser.com).
 * - On the guide host: only /guide* and needed APIs/assets; other paths → main site.
 * - On the main host: /guide redirects to NEXT_PUBLIC_GUIDE_URL when configured (keeps library off the main nav experience).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname } = request.nextUrl;
  const guideUrl = process.env.NEXT_PUBLIC_GUIDE_URL?.replace(/\/$/, "");
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morgankaiser.com").replace(/\/$/, "");

  const isGuideHost =
    Boolean(guideUrl) &&
    (host.startsWith("guide.") ||
      host === new URL(guideUrl!).host ||
      host === `www.${new URL(guideUrl!).host}`);

  if (isGuideHost) {
    const allowed =
      pathname.startsWith("/guide") ||
      pathname.startsWith("/api/guide") ||
      pathname.startsWith("/api/lead") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/videos") ||
      pathname.startsWith("/reports") ||
      pathname.startsWith("/images") ||
      pathname === "/favicon.ico" ||
      pathname === "/robots.txt";
    if (!allowed) {
      return NextResponse.redirect(new URL("/", siteUrl));
    }
    return NextResponse.next();
  }

  // Main site: send /guide traffic to the guide subdomain when configured
  if (guideUrl && (pathname === "/guide" || pathname.startsWith("/guide/"))) {
    const target = new URL(pathname + request.nextUrl.search, guideUrl);
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

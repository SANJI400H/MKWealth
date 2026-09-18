/**
 * Strategy session manual approval (Morgan books Meet after approve).
 * Reuses guide/desk grant secrets so ops does not need a third key.
 */

export function getSessionGrantKey(): string | null {
  return (
    process.env.SESSION_GRANT_SECRET?.trim() ||
    process.env.GUIDE_GRANT_SECRET?.trim() ||
    process.env.DESK_GRANT_SECRET?.trim() ||
    process.env.GUIDE_ACCESS_SECRET?.trim() ||
    process.env.TOOLS_ACCESS_SECRET?.trim() ||
    null
  );
}

/**
 * Origin for Approve links in emails.
 * Always use the host that handled the lead request (localhost in dev, live domain in prod).
 * Do not prefer NEXT_PUBLIC_SITE_URL — a wrong/old value (e.g. morgankaiser.ae) breaks approve.
 */
export function sessionPublicOrigin(requestOrigin: string): string {
  const fromRequest = requestOrigin.replace(/\/$/, "");
  if (fromRequest) return fromRequest;
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

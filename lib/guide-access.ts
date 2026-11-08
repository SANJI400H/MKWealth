/** Approved access to Investor Guide library (videos / PDFs). Separate from calculator Tools gate. */

export const GUIDE_ACCESS_COOKIE = "mk_guide_access";
export const GUIDE_ACCESS_MAX_AGE_SEC = 60 * 60 * 24 * 90;
export const GUIDE_GRANT_TOKEN_TTL_SEC = 60 * 60 * 24 * 14;

function getSecret(): string | null {
  const secret =
    process.env.GUIDE_ACCESS_SECRET?.trim() ||
    process.env.DESK_ACCESS_SECRET?.trim() ||
    process.env.TOOLS_ACCESS_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("guide-access: GUIDE_ACCESS_SECRET missing; fail closed");
    }
    return null;
  }
  return secret;
}

export function getGuideGrantKey(): string | null {
  return process.env.GUIDE_GRANT_SECRET?.trim() || process.env.DESK_GRANT_SECRET?.trim() || getSecret();
}

/** When true, completing qualification unlocks the guide immediately (still emails Morgan). */
export function isGuideAutoApproveEnabled(): boolean {
  const v = process.env.GUIDE_AUTO_APPROVE?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(signature);
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i]! ^ b[i]!;
  }
  return diff === 0;
}

async function verifySigned(payload: string, signature: string, secret: string): Promise<boolean> {
  const expected = await sign(payload, secret);
  try {
    return timingSafeEqualBytes(fromBase64Url(signature), fromBase64Url(expected));
  } catch {
    return false;
  }
}

const LEAD_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Cookie is bound to one saved lead. An unbound or expired token does not unlock. */
export async function createGuideAccessToken(leadId: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret || !LEAD_ID_PATTERN.test(leadId)) return null;
  const exp = Math.floor(Date.now() / 1000) + GUIDE_ACCESS_MAX_AGE_SEC;
  const payload = `${leadId}|${exp}`;
  const signature = await sign(`guide:${payload}`, secret);
  return `${payload}.${signature}`;
}

export async function readGuideAccess(
  value: string | undefined | null,
): Promise<{ leadId: string } | null> {
  if (!value) return null;
  const secret = getSecret();
  if (!secret) return null;
  const lastDot = value.lastIndexOf(".");
  if (lastDot <= 0) return null;
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!(await verifySigned(`guide:${payload}`, signature, secret))) return null;
  const sep = payload.lastIndexOf("|");
  if (sep <= 0) return null;
  const leadId = payload.slice(0, sep);
  const exp = Number(payload.slice(sep + 1));
  if (!LEAD_ID_PATTERN.test(leadId) || !Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  return { leadId };
}

export async function verifyGuideAccessCookie(value: string | undefined | null): Promise<boolean> {
  return (await readGuideAccess(value)) !== null;
}

export async function createGuideGrantToken(email: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return null;
  const exp = Math.floor(Date.now() / 1000) + GUIDE_GRANT_TOKEN_TTL_SEC;
  const payload = `${normalized}|${exp}`;
  const signature = await sign(`guide-grant:${payload}`, secret);
  return `${payload}.${signature}`;
}

export async function verifyGuideGrantToken(
  token: string | undefined | null,
): Promise<{ ok: true; email: string } | { ok: false }> {
  if (!token) return { ok: false };
  const secret = getSecret();
  if (!secret) return { ok: false };
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return { ok: false };
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!(await verifySigned(`guide-grant:${payload}`, signature, secret))) return { ok: false };
  const [email, expRaw] = payload.split("|");
  const exp = Number(expRaw);
  if (!email || !Number.isFinite(exp) || exp * 1000 < Date.now()) return { ok: false };
  return { ok: true, email };
}

export function guideAccessCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: GUIDE_ACCESS_MAX_AGE_SEC,
  };
}

export function cookieShouldBeSecure(requestUrl: string) {
  try {
    const url = new URL(requestUrl);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return false;
    return url.protocol === "https:";
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

/** Public origin for the guide property (subdomain). Falls back to main site. */
export function guidePublicOrigin(requestOrigin?: string): string {
  const configured = process.env.NEXT_PUBLIC_GUIDE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (requestOrigin) return requestOrigin;
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morgankaiser.com").replace(/\/$/, "");
}

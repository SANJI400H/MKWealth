/** HttpOnly cookie unlocking Tools calculators + Guide for ~90 days. */

export const TOOLS_ACCESS_COOKIE = "mk_tools_access";
export const TOOLS_ACCESS_MAX_AGE_SEC = 60 * 60 * 24 * 90;

const SOURCES_THAT_UNLOCK = new Set(["tools", "guide-gate", "calculator"]);

function getSecret(): string | null {
  const secret = process.env.TOOLS_ACCESS_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("tools-access: TOOLS_ACCESS_SECRET is missing; fail closed");
    }
    return null;
  }
  return secret;
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

/** Create signed cookie value `exp.signature`. */
export async function createToolsAccessToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + TOOLS_ACCESS_MAX_AGE_SEC;
  const payload = String(exp);
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyToolsAccessCookie(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const secret = getSecret();
  if (!secret) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload, secret);
  try {
    const a = fromBase64Url(signature);
    const b = fromBase64Url(expected);
    if (!timingSafeEqualBytes(a, b)) return false;
  } catch {
    return false;
  }

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  return true;
}

export function shouldUnlockToolsForLeadSource(source: string): boolean {
  return SOURCES_THAT_UNLOCK.has(source);
}

export function toolsAccessCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: TOOLS_ACCESS_MAX_AGE_SEC,
  };
}

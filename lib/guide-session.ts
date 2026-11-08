import { cookies } from "next/headers";
import { GUIDE_ACCESS_COOKIE, readGuideAccess } from "@/lib/guide-access";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const BLOCKED = new Set(["rejected", "lost"]);
const CACHE_MS = 30_000;

const leadCache = new Map<string, { ok: boolean; until: number }>();

/** Signed cookie plus a live lead row. Fail closed if either check fails. */
export async function guideLeadFromCookies(): Promise<{ leadId: string } | null> {
  const access = await readGuideAccess(cookies().get(GUIDE_ACCESS_COOKIE)?.value);
  if (!access) return null;

  const now = Date.now();
  const cached = leadCache.get(access.leadId);
  if (cached && cached.until > now) return cached.ok ? access : null;

  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("website_leads")
    .select("id,status")
    .eq("id", access.leadId)
    .maybeSingle();

  const ok = !error && Boolean(data) && !BLOCKED.has(String(data?.status ?? ""));
  leadCache.set(access.leadId, { ok, until: now + CACHE_MS });
  return ok ? access : null;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null = null;

/**
 * Read a server env var at runtime.
 * Dynamic lookup so Next does not bake NEXT_PUBLIC_* or a missing build-time value into the server bundle.
 */
function serverEnv(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

/** URL and service-role key for server routes. Never send the key to the browser. */
export function getSupabaseServerConfig(): { url: string; key: string } | null {
  const url = (serverEnv("SUPABASE_URL") || serverEnv("NEXT_PUBLIC_SUPABASE_URL")).replace(/\/$/, "");
  const key = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  return { url, key };
}

export function missingSupabaseEnv(): string[] {
  const missing: string[] = [];
  if (!serverEnv("SUPABASE_URL") && !serverEnv("NEXT_PUBLIC_SUPABASE_URL")) {
    missing.push("SUPABASE_URL");
  }
  if (!serverEnv("SUPABASE_SERVICE_ROLE_KEY")) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  return missing;
}

/** Server-only Supabase client (service role). Never import this into client components. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const config = getSupabaseServerConfig();
  if (!config) return null;
  if (!admin) {
    admin = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseServerConfig() !== null;
}

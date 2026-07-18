import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supabase now issues "publishable" keys (sb_publishable_…); older projects
// have a legacy anon JWT. Either works as the public client key.
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// null when env vars aren't set — the app then runs local-only (no login/sync).
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

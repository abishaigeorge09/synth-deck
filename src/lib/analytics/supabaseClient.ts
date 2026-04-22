import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null | undefined

/**
 * Returns a Supabase browser client when `VITE_SUPABASE_*` env vars are set.
 * Otherwise returns `null` — the deck runs normally without analytics.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cached !== undefined) return cached

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  if (!url?.trim() || !anonKey?.trim()) {
    cached = null
    return cached
  }

  cached = createClient(url.trim(), anonKey.trim(), {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { params: { eventsPerSecond: 10 } },
  })
  return cached
}

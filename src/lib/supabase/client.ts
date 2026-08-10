import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gdsmqhhzddjixifznecx.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PreMvrBnNmApzyle76sAOw_8IbkOiHL'

  return createBrowserClient(
    url,
    key
  )
}

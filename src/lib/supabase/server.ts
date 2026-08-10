import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gdsmqhhzddjixifznecx.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PreMvrBnNmApzyle76sAOw_8IbkOiHL'

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function createAdminClient() {
  // Uses the service role key to bypass RLS for admin operations
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gdsmqhhzddjixifznecx.supabase.co'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkc21xaGh6ZGRqaXhpZnpuZWN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDQ3NTQ4OSwiZXhwIjoyMTAwMDUxNDg5fQ.DuQ7OK-OmfG-aBQvYm_MDrMlAsy5rsTiEuTjE2498G0'

  return createServerClient(
    url,
    serviceKey,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {}
      }
    }
  )
}

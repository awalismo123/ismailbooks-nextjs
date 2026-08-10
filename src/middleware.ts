import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

async function handleMiddleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gdsmqhhzddjixifznecx.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PreMvrBnNmApzyle76sAOw_8IbkOiHL'

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(
      url,
      key,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session
    const { data: { user } } = await supabase.auth.getUser()

    // Check NextAuth cookie
    const nextAuthToken =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    const hasSession = !!user || !!nextAuthToken;

    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = ['/dashboard', '/admin', '/payment']
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtected && !hasSession) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Auth routes
    const authRoutes = ['/login', '/register', '/forgot-password', '/auth/reset-password']
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

    if (isAuthRoute && hasSession) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  } catch {
    // If anything fails in session refresh, continue request gracefully
  }

  return supabaseResponse
}

export async function middleware(request: NextRequest) {
  return handleMiddleware(request)
}

export async function proxy(request: NextRequest) {
  return handleMiddleware(request)
}

export default handleMiddleware

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

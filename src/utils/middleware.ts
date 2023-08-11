import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { AUTH_PAGES, REDIRECT_ON_AUTH_PAGES } from '@/config/constants'
import { KeySchema } from './schemas'
import type { Database } from '@/types/supabase'

export async function AppMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient<Database>({ req, res })

    const code = req.nextUrl.searchParams.get('code')

    if (code) {
      const codeSessionRes = await supabase.auth.exchangeCodeForSession(code).catch(() => null)

      if (!codeSessionRes?.error) {
        return res
      }
    }

    const isAuthPage = AUTH_PAGES.includes(req.nextUrl.pathname)
    const isRedirectPage = REDIRECT_ON_AUTH_PAGES.includes(req.nextUrl.pathname)

    if (isAuthPage || isRedirectPage) {
      const sessionRes = await supabase.auth.getSession()
      const session = sessionRes.data.session

      if (!session && isAuthPage) {
        throw Error('Unauthorized')
      }

      if (session && isRedirectPage) {
        const redirectTo = req.nextUrl.searchParams.get('redirectTo') ?? '/dashboard'

        return NextResponse.redirect(new URL(redirectTo, req.url))
      }
    }

    return res
  } catch (error) {
    const url = new URL(`/login`, req.url)
    const redirectTo = req.url.replace(req.nextUrl.origin, '')

    url.searchParams.set('redirectTo', redirectTo)

    return NextResponse.redirect(url)
  }
}

export async function LinksMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient<Database>({ req, res })
    const key = KeySchema.parse(req.nextUrl.pathname.slice(1))

    const { data } = await supabase
      .from('links')
      .select('id, key, destination')
      .eq('key', key)
      .maybeSingle()
      .throwOnError()

    if (!data) throw Error('Link not found')

    return NextResponse.redirect(data.destination)
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

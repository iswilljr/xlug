import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import type { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const xlug = req.nextUrl.pathname.split('/').pop()

    const supabase = createMiddlewareClient<Database>({ req, res })
    const { data, error } = await supabase.from('xlugs').select('*').eq('xlug', xlug).single()

    if (error) return res

    const redirectTo = new URL(data.destination)

    return NextResponse.redirect(redirectTo)
  } catch (error) {
    return res
  }
}

export const config = {
  matcher: '/x/:xlug*',
}

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { UnauthorizedError, routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const GET = routeHandler(async req => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const session = (await supabase.auth.getSession()).data.session

  if (!session) {
    throw new UnauthorizedError()
  }

  const searchParams = new URL(req.url).searchParams
  const orderAscending = searchParams.get('ascending') === 'true'

  const { data } = await supabase
    .from('links')
    .select('*')
    .eq('userId', session.user.id)
    .order('createdAt', { ascending: orderAscending })
    .throwOnError()

  if (!data) throw new Error('Unexpected error')

  return NextResponse.json({ links: data })
})

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { UnauthorizedError, routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const GET = routeHandler(async req => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const session = (await supabase.auth.getSession()).data.session

  if (!session) {
    throw new UnauthorizedError()
  }

  const { data } = await supabase.from('links').select('*').eq('userId', session.user.id).throwOnError()

  if (!data) throw new Error('Unexpected error')

  return NextResponse.json({ links: data })
})

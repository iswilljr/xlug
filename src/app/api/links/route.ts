import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const GET = routeHandler(
  async (_req, ctx) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('userId', ctx.session.user.id)
      .order('createdAt', { ascending: false })
      .throwOnError()

    if (!data) throw new Error('Unexpected error')

    return NextResponse.json({ links: data })
  },
  { protected: true }
)

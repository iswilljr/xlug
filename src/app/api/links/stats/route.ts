import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { UnauthorizedError, routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const GET = routeHandler(
  async (_req, ctx) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const isPublic = _req.nextUrl.searchParams.has('public')

    if (!isPublic && ctx.session == null) throw new UnauthorizedError()

    const { data } = await supabase
      .from(isPublic ? 'public_stats_most_clicked' : 'stats_most_clicked')
      .select('*')
      .throwOnError()

    return NextResponse.json(data)
  },
  { passSession: true }
)

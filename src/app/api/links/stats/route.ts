import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const GET = routeHandler(
  async (_req, ctx) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase.from('stats_most_clicked').select('*').throwOnError()

    return NextResponse.json(data)
  },
  { protected: true }
)

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { routeHandler } from '@/utils/handler'
import { TabEnumSchema } from '@/utils/schemas'
import type { Database } from '@/types/supabase'
import type { z } from 'zod'

export const dynamic = 'force-dynamic'

type Tab = z.infer<typeof TabEnumSchema>

const tabs = {
  browser: 'stats_browser',
  city: 'stats_city',
  clicks: 'stats_clicks',
  country: 'stats_country',
  device: 'stats_device',
  os: 'stats_os',
  referrer: 'stats_referrer',
} as const satisfies Record<Tab, string>

export const GET = routeHandler(
  async (_req, ctx) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const tab = TabEnumSchema.parse(_req.nextUrl.searchParams.get('tab') ?? 'clicks')
    const tabView = tabs[tab]

    const { data } = await supabase.from(tabView).select('*').eq('key', ctx.params.key).throwOnError()

    return NextResponse.json(data)
  },
  { protected: true }
)

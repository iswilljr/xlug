import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { subDays, subHours } from 'date-fns'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { PUBLIC_DEFAULT_LINK_KEY } from '@/config/constants'
import { CustomError, UnauthorizedError, routeHandler } from '@/utils/handler'
import { IntervalEnumSchema, TabEnumSchema } from '@/utils/schemas'
import { getTimeZone } from '@/utils/dates'
import type { Database } from '@/types/supabase'
import type { z } from 'zod'

export const dynamic = 'force-dynamic'

type Tab = z.infer<typeof TabEnumSchema>
type Interval = z.infer<typeof IntervalEnumSchema>

const tabFunctions = {
  browser: 'stats_browser',
  city: 'stats_city',
  clicks: 'stats_clicks',
  country: 'stats_country',
  device: 'stats_device',
  os: 'stats_os',
  referrer: 'stats_referrer',
} as const satisfies Record<Tab, string>

const intervals: Record<Interval, () => Date> = {
  '1h': () => subHours(new Date(), 1),
  '24h': () => subDays(new Date(), 1),
  '7d': () => subDays(new Date(), 7),
  '30d': () => subDays(new Date(), 30),
  '90d': () => subDays(new Date(), 30),
  all: () => new Date(2024, 0, 1),
}

export const GET = routeHandler(
  async (_req, ctx) => {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const isPublic = ctx?.params?.key === PUBLIC_DEFAULT_LINK_KEY

    const timeZone = _req.nextUrl.searchParams.get('timeZone')
    const tabValue = TabEnumSchema.parse(_req.nextUrl.searchParams.get('tab') ?? 'clicks')
    const intervalValue = IntervalEnumSchema.parse(_req.nextUrl.searchParams.get('interval') ?? '30d')
    const getInterval = intervals[intervalValue]

    const timeZoneEnumSchema = Intl.supportedValuesOf('timeZone')

    if (timeZone && !timeZoneEnumSchema.includes(timeZone)) {
      throw new CustomError('Invalid Time Zone', 400)
    }

    const tab = tabFunctions[tabValue]
    const interval = getInterval()

    const params = {
      key_param: ctx.params.key,
      created_at_param: interval.toISOString(),
      ...(tabValue === 'clicks'
        ? {
            date_trunc_param: intervalValue === '1h' ? 'minute' : intervalValue === '24h' ? 'hour' : 'day',
            time_zone_param: timeZone ?? getTimeZone(),
          }
        : {}),
    }

    if (!isPublic && ctx.session == null) throw new UnauthorizedError()

    const { data } = await supabase.rpc(tab, params).select('*').throwOnError()

    return NextResponse.json(data)
  },
  { passSession: true }
)

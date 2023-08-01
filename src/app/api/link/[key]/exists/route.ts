import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { routeHandler } from '@/utils/handler'
import type { Database } from '@/types/supabase'

export const GET = routeHandler(async (_req, ctx) => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { data } = await supabase.from('links').select('*').eq('key', ctx.params.key).maybeSingle().throwOnError()

  return NextResponse.json({ exists: data != null })
})

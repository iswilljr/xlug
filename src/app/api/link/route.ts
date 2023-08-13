import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { CustomError, routeHandler } from '@/utils/handler'
import { DestinationSchema, LinkSchema, RandomKey } from '@/utils/schemas'
import { extractMetadata } from '@/utils/metadata'
import type { Database } from '@/types/supabase'

export const POST = routeHandler(async req => {
  const body = await req.json()
  const destinationParam = body.destination
  const destination = DestinationSchema.parse(destinationParam)

  const metadata = await extractMetadata(destination).catch(() => null)

  const link = LinkSchema.parse({
    destination,
    key: RandomKey(),
    description: metadata?.description,
  })

  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { data } = await supabase.from('links').insert(link).select('*').maybeSingle().throwOnError()

  if (!data) throw new CustomError('Unexpected error', 500)

  return NextResponse.json(data)
})

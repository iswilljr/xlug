import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { CustomError, routeHandler } from '@/utils/handler'
import { LinkSchema, PublicLinkSchema, RandomKey } from '@/utils/schemas'
import { extractMetadata } from '@/utils/metadata'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const POST = routeHandler(async req => {
  const body = await req.json()
  const linkData = PublicLinkSchema.parse(body)

  const description =
    linkData.description ?? (await extractMetadata(linkData.destination).catch(() => null))?.description

  const link = LinkSchema.parse({
    description,
    destination: linkData.destination,
    key: linkData.key ?? RandomKey(),
  })

  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { data } = await supabase.from('links').insert(link).select('*').maybeSingle().throwOnError()

  if (!data) throw new CustomError('Unexpected error', 500)

  return NextResponse.json(data)
})

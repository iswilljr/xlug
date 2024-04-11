import { NextResponse } from 'next/server'
import { CustomError, routeHandler } from '@/utils/handler'
import { DestinationSchema } from '@/utils/schemas'
import { extractMetadata } from '@/utils/metadata'

export const dynamic = 'force-dynamic'

export const GET = routeHandler(async req => {
  const urlParam = req.nextUrl.searchParams.get('url')

  if (!urlParam) throw new CustomError('Missing "url" from search params')

  const url = DestinationSchema.parse(urlParam)
  const metadata = await extractMetadata(url)

  return NextResponse.json(metadata)
})

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { CustomError, NotFoundError, UnauthorizedError, routeHandler } from '@/utils/handler'
import { EditLinkSchema, LinkSchema } from '@/utils/schemas'
import type { Database } from '@/types/supabase'

export const GET = routeHandler(async (_req, ctx) => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const key = LinkSchema.shape.key.safeParse(ctx.params.key)
  if (!key.success) throw new CustomError('Invalid Key')

  const { data } = await supabase
    .from('links')
    .select('id, key, destination')
    .eq('key', key.data)
    .maybeSingle()
    .throwOnError()

  if (!data) throw new NotFoundError(`Could not found a link with key "${key.data}"`)

  return NextResponse.json(data)
})

export const POST = routeHandler(async (req, ctx) => {
  const body = await req.json()
  const { key, destination, description } = LinkSchema.parse({
    ...body,
    ...ctx.params, // overwrite key value
  })

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const session = (await supabase.auth.getSession()).data.session

  const { data } = await supabase
    .from('links')
    .insert({
      key,
      description,
      destination,
      userId: session?.user.id ?? null,
    })
    .select('*')
    .maybeSingle()
    .throwOnError()

  if (!data) throw new CustomError('Unexpected error', 500)

  return NextResponse.json(data)
})

export const PATCH = routeHandler(async (req, ctx) => {
  const key = LinkSchema.shape.key.safeParse(ctx.params.key)
  if (!key.success) throw new CustomError('Invalid Key')

  const json = await req.json()
  const body = EditLinkSchema.parse(json)

  const supabase = createRouteHandlerClient<Database>({ cookies })

  const session = (await supabase.auth.getSession()).data.session

  if (!session) {
    throw new UnauthorizedError()
  }

  const { data } = await supabase
    .from('links')
    .update(body)
    .eq('key', key.data)
    .eq('userId', session.user.id)
    .select('*')
    .maybeSingle()
    .throwOnError()

  if (!data) throw new NotFoundError(`Could not found a link with key "${key.data}"`)

  return NextResponse.json(data)
})

export const DELETE = routeHandler(async (_req, ctx) => {
  const key = LinkSchema.shape.key.safeParse(ctx.params.key)
  if (!key.success) throw new CustomError('Invalid Key')

  const supabase = createRouteHandlerClient<Database>({ cookies })

  const session = (await supabase.auth.getSession()).data.session

  if (!session) {
    throw new UnauthorizedError()
  }

  const { data } = await supabase
    .from('links')
    .delete()
    .eq('key', key.data)
    .eq('userId', session.user.id)
    .select('*')
    .maybeSingle()
    .throwOnError()

  if (!data) throw new NotFoundError(`Could not found a link with key "${key.data}"`)

  return NextResponse.json(data)
})

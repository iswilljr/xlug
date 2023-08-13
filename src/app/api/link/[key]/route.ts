import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { CustomError, NotFoundError, routeHandler } from '@/utils/handler'
import { EditLinkSchema, KeySchema, LinkSchema } from '@/utils/schemas'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export const POST = routeHandler(
  async (req, ctx) => {
    const body = await req.json()
    const { key, destination, description } = LinkSchema.parse({
      ...body,
      ...ctx.params, // overwrite key value
    })

    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase
      .from('links')
      .insert({
        key,
        description,
        destination,
        userId: ctx.session.user.id,
      })
      .select('*')
      .maybeSingle()
      .throwOnError()

    if (!data) throw new CustomError('Unexpected error', 500)

    return NextResponse.json(data)
  },
  { protected: true }
)

export const PATCH = routeHandler(
  async (req, ctx) => {
    const key = KeySchema.safeParse(ctx.params.key)
    if (!key.success) throw new CustomError('Invalid Key')

    const json = await req.json()
    const body = EditLinkSchema.parse(json)

    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase
      .from('links')
      .update(body)
      .eq('key', key.data)
      .eq('userId', ctx.session.user.id)
      .select('*')
      .maybeSingle()
      .throwOnError()

    if (!data) throw new NotFoundError(`Could not found a link with key "${key.data}"`)

    return NextResponse.json(data)
  },
  { protected: true }
)

export const DELETE = routeHandler(
  async (_req, ctx) => {
    const key = KeySchema.safeParse(ctx.params.key)
    if (!key.success) throw new CustomError('Invalid Key')

    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { data } = await supabase
      .from('links')
      .delete()
      .eq('key', key.data)
      .eq('userId', ctx.session.user.id)
      .select('*')
      .maybeSingle()
      .throwOnError()

    if (!data) throw new NotFoundError(`Could not found a link with key "${key.data}"`)

    return NextResponse.json(data)
  },
  { protected: true }
)

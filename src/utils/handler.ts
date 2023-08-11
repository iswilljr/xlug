import { ZodError } from 'zod'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/supabase-js'

export interface RouteHandlerOptions<P extends boolean, S extends boolean> {
  protected?: P
  passSession?: S
}

interface RouteHandlerContext<Q extends Record<string, string>, P extends boolean, S extends boolean> {
  params: Q
  session: P extends true ? Session : S extends true ? Session | null : never
}

type NextRouteHandler<Params extends Record<string, string>, Protected extends boolean, PassSession extends boolean> = (
  req: NextRequest,
  ctx: RouteHandlerContext<Params, Protected, PassSession>
) => Promise<Response> | Response

export class CustomError extends Error {
  constructor(
    readonly message: string,
    readonly statusCode = 400
  ) {
    super(message)
  }
}

export class UnauthorizedError extends CustomError {
  constructor(readonly message = 'Unauthorized') {
    super(message, 401)
  }
}

export class NotFoundError extends CustomError {
  constructor(readonly message = 'Not Found') {
    super(message, 404)
  }
}

const errors: Record<string, string> = {
  '23505': 'Key already exists',
  default: 'Something went wrong, try again',
}

export function routeHandler<
  Params extends Record<string, string> = Record<string, string>,
  Protected extends boolean = false,
  PassSession extends boolean = false,
>(
  handler: NextRouteHandler<Params, Protected, PassSession>,
  { protected: withAuth, passSession }: RouteHandlerOptions<Protected, PassSession> = {}
): NextRouteHandler<Params, Protected, PassSession> {
  return async (req, ctx) => {
    try {
      if (withAuth ?? passSession) {
        const supabase = createRouteHandlerClient({ cookies })
        const sessionResponse = await supabase.auth.getSession()

        if (withAuth && (sessionResponse.error ?? !sessionResponse.data.session)) throw new UnauthorizedError()

        return await handler(req, { ...ctx, session: sessionResponse.data.session as any })
      }

      return await handler(req, ctx)
    } catch (error: any) {
      const message = getErrorMessage(error)
      const status = error instanceof CustomError ? error.statusCode : 400

      return NextResponse.json({ message }, { status })
    }
  }
}

export function getErrorMessage(error: any) {
  if (error instanceof CustomError) return error.message
  if (error instanceof ZodError) return error.errors[0].message
  if ('code' in error && typeof error.code === 'string') return errors[error.code] ?? errors.default
  return errors.default
}

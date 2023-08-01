import { ZodError } from 'zod'
import { NextResponse, type NextRequest } from 'next/server'

type NextRouteHandler<Params = Record<string, string>> = (
  req: NextRequest,
  ctx: { params: Params }
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

export function routeHandler<Params = Record<string, string>>(
  handler: NextRouteHandler<Params>
): NextRouteHandler<Params> {
  return async (req, ctx) => {
    try {
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

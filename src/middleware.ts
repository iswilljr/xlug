import { AppMiddleware, LinksMiddleware } from './utils/middleware'
import { APP_PAGES } from './config/constants'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (APP_PAGES.includes(req.nextUrl.pathname)) {
    return AppMiddleware(req)
  }

  const key = req.nextUrl.pathname.slice(1)

  if (!key.includes('/')) return LinksMiddleware(req)

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|icons|favicon|robots.txt).*)'],
}

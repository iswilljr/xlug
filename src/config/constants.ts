export const PROD_BASE_URL = 'https://xlug.vercel.app'

export const HOST_ICON_PLACEHOLDER = 'https://uaparser.js.org/images/browsers/default.png'

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_BASE_URL : 'http://localhost:3000'

export const ICON_FROM_HOST_URL = 'https://unavatar.io/google'

export const LINKS_DATA_KEY = 'links'

export const APP_PAGES = ['/', '/login', '/dashboard']

export const AUTH_PAGES = ['/dashboard']

export const REDIRECT_ON_AUTH_PAGES = ['/login']

export const MAX_PUBLIC_LINKS = 3

export const PUBLIC_DEFAULT_LINK_KEY = 'github'

export enum FilterQueryParams {
  query = 'query',
}

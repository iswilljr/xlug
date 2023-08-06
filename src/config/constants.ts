export const PROD_BASE_URL = 'https://xlug.vercel.app'

export const HOST_ICON_PLACEHOLDER = new URL('/assets/host-icon-placeholder.png', PROD_BASE_URL).toString()

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_BASE_URL : 'http://localhost:3000'

export const ICON_FROM_HOST_URL = 'https://unavatar.io/duckduckgo'

export const LINKS_DATA_KEY = 'links'

export const APP_PAGES = ['/', '/login', '/dashboard']

export const AUTH_PAGES = ['/dashboard']

export const REDIRECT_ON_AUTH_PAGES = ['/login']

export enum FilterQueryParams {
  query = 'query',
}

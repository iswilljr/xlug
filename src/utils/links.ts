import axios from 'redaxios'
import { BASE_URL, HOST_ICON_PLACEHOLDER, ICON_FROM_HOST_URL } from '@/config/constants'
import { userAgent, type NextRequest, type NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { LinkRow } from '@/types/tables'
import type { Database } from '@/types/supabase'

interface ExistsData {
  exists: boolean
}

export function generateShortLink(key: string) {
  return new URL(`/${key}`, BASE_URL).toString()
}

interface PrettyUrlOptions {
  domainOnly?: boolean
}

export function prettyUrl(url: string, options: PrettyUrlOptions = {}) {
  if (options.domainOnly) {
    url = new URL('/', url).toString()
  }

  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

export function generateHostIconFromUrl(url: string | URL) {
  try {
    if (!url.toString().startsWith('http')) {
      url = `https://${url.toString()}`
    }

    const host = new URL(url).host
    return `${ICON_FROM_HOST_URL}/${host}?fallback=${HOST_ICON_PLACEHOLDER}`
  } catch (error) {
    return HOST_ICON_PLACEHOLDER
  }
}

export async function validateLinkKey(key: string) {
  if (key.includes('/')) {
    return 'Key cannot include "/"'
  }

  const res = await axios.get<ExistsData>(`/api/link/${key}/exists`).catch(() => null)

  if (res == null) {
    return 'Error while validating key'
  }

  if (!res.data?.exists) {
    return null
  }

  return 'Key already exists'
}

export async function recordLinkVisit(link: Pick<LinkRow, 'id' | 'key'>, req: NextRequest, res: NextResponse) {
  const ua = userAgent(req)
  const referrer = req.headers.get('referer')
  const supabase = createMiddlewareClient<Database>({ req, res })

  await supabase.from('link_visits').insert({
    key: link.key,
    os: ua.os.name,
    linkId: link.id,
    city: req.geo?.city,
    device: ua.device.type ?? 'desktop',
    region: req.geo?.region,
    browser: ua.browser.name,
    country: req.geo?.country,
    referrer: referrer ? prettyUrl(referrer, { domainOnly: true }) : 'direct',
    referrerURL: referrer ?? 'direct',
  })
}

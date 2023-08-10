import axios from 'redaxios'
import { BASE_URL, HOST_ICON_PLACEHOLDER, ICON_FROM_HOST_URL } from '@/config/constants'

interface ExistsData {
  exists: boolean
}

export function generateShortLink(key: string) {
  return new URL(`/${key}`, BASE_URL).toString()
}

export function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

export function generateHostIconFromUrl(url: string | URL) {
  try {
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

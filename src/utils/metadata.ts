import * as cheerio from 'cheerio'
import { BASE_URL } from '@/config/constants'
import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'

export interface GenerateBaseMetadataOptions {
  description?: string
  image?: string
  title?: string
}

export interface ExtractedMetadata {
  title: string
  description: string
  banner: string | null
}

export const TITLE_TAG_SELECTORS = [
  'title',
  'meta[name="og:title"]',
  'meta[property="og:title"]',
  'meta[name="twitter:title"]',
  'meta[property="twitter:title"]',
]

export const DESCRIPTION_TAG_SELECTORS = [
  'meta[name="description"]',
  'meta[name="og:description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
  'meta[property="twitter:description"]',
]

export const BANNER_TAG_SELECTORS = [
  'meta[name="og:image"]',
  'meta[property="og:image"]',
  'meta[name="twitter:image"]',
  'meta[property="twitter:image"]',
  'meta[name="twitter:image:src"]',
  'meta[property="twitter:image:src"]',
  'link[rel="icon"]',
  'link[rel="shortcut icon"]',
]

export function generateBaseMetadata(options: GenerateBaseMetadataOptions = {}): Metadata {
  const { description = siteConfig.description, image = '/favicon.png', title = siteConfig.title } = options

  return {
    title,
    description,
    icons: {
      icon: [{ sizes: '512x512', type: 'image/png', url: '/favicon.png' }],
      shortcut: { sizes: '512x512', type: 'image/svg+xml', url: '/favicon.svg' },
      apple: [
        { url: '/icons/apple-touch-icon-60x60.png', sizes: '60x60' },
        { url: '/icons/apple-touch-icon-76x76.png', sizes: '76x76' },
        { url: '/icons/apple-touch-icon-120x120.png', sizes: '120x120' },
        { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      ],
    },
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      title,
      description,
      images: [image],
      card: 'summary_large_image',
      creator: '@iswilljr',
    },
  }
}

function findTagTextContent(head: cheerio.Cheerio<cheerio.Element>, selectors: string[]) {
  for (const selector of selectors) {
    const element = head.find(selector)
    const content = element.attr('href') ?? element.attr('content') ?? element.text()

    if (content) return content
  }

  return ''
}

export async function extractMetadata(url: string): Promise<ExtractedMetadata> {
  const res = await fetch(url)

  if (!res.ok) throw Error('Invalid response')

  const html = await res.text()

  const $ = cheerio.load(html)
  const head = $('head')
  const title = findTagTextContent(head, TITLE_TAG_SELECTORS)
  const description = findTagTextContent(head, DESCRIPTION_TAG_SELECTORS)
  const banner = findTagTextContent(head, BANNER_TAG_SELECTORS) || null

  return {
    title,
    description,
    banner,
  }
}

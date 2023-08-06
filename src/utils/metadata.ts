import { BASE_URL } from '@/config/constants'
import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'

interface GenerateBaseMetadataOptions {
  description?: string
  image?: string
  title?: string
}

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

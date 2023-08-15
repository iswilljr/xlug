import { generateShortLink } from '@/utils/links'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'Xlug - Short and Manage your Long URLs.',
  description: 'Link shortener tool that allows you to create shorter and more manageable versions of long URLs.',
  links: {
    profile: generateShortLink('me'),
    twitter: generateShortLink('twitter'),
    github: generateShortLink('github'),
    issues: generateShortLink('issues'),
  },
  examples: {
    key: 'github',
    link: 'https://github.com/iswilljr/xlug',
    description: 'Short and Manage your Long URLs',
  },
}

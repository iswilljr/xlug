'use client'

import Link from 'next/link'
import useLocalStorage from 'use-local-storage-state'
import { useMemo } from 'react'
import { siteConfig } from '@/config/site'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { LinkRowSchema } from '@/utils/schemas'
import { LinkSkeletonCard } from '../links/link-skeleton'
import { PublicLinkCard } from './public-link-card'
import type { LinkRow } from '@/types/tables'

const PublicLinksSchema = LinkRowSchema.array()

function parser(value: string): LinkRow[] {
  const links = PublicLinksSchema.safeParse(JSON.parse(value))
  return links.success ? links.data : []
}

const serializer = {
  parse: parser,
  stringify: JSON.stringify,
}

export function PublicLinksContainer() {
  const [links] = useLocalStorage<LinkRow[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    serializer,
  })

  const skeletons = useMemo(() => {
    return [...Array(MAX_PUBLIC_LINKS - links.length)]
  }, [links])

  return (
    <ul className='space-y-2'>
      <li>
        <PublicLinkCard
          withDeleteOption={false}
          link={{
            id: 'github',
            userId: null,
            key: 'github',
            description: siteConfig.description,
            createdAt: new Date().toISOString(),
            destination: siteConfig.examples.link,
          }}
        />
      </li>
      {links.map(link => {
        return (
          <li key={link.key}>
            <PublicLinkCard link={link} />
          </li>
        )
      })}
      {skeletons.map((_, i) => (
        <li key={i}>
          <LinkSkeletonCard isPublicLink />
        </li>
      ))}
      <li className='rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400'>
        Note: You can only create 3 public links, delete one of the links or{' '}
        <Link href='/login' className='font-semibold text-neutral-900 hover:underline dark:text-neutral-200'>
          login
        </Link>{' '}
        for full customization and create unlimited links.
      </li>
    </ul>
  )
}

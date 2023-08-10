'use client'

import Link from 'next/link'
import useLocalStorage from 'use-local-storage-state'
import { useMemo } from 'react'
import { siteConfig } from '@/config/site'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { LinkSchema, type Link as LinkType } from '@/utils/schemas'
import { LinkSkeletonCard } from '../links/link-skeleton'
import { PublicLinkCard } from './public-link-card'

const PublicLinksSchema = LinkSchema.array()

function parser(value: string): LinkType[] {
  const links = PublicLinksSchema.safeParse(JSON.parse(value))
  return links.success ? links.data : []
}

const serializer = {
  parse: parser,
  stringify: JSON.stringify,
}

export function PublicLinksContainer() {
  const [links] = useLocalStorage<LinkType[]>(LINKS_DATA_KEY, {
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
          shortLink={siteConfig.examples.key}
          description={siteConfig.examples.description}
          destination={siteConfig.examples.link}
        />
      </li>
      {links.map(link => {
        return (
          <li key={link.key}>
            <PublicLinkCard shortLink={link.key} description={link.description} destination={link.destination} />
          </li>
        )
      })}
      {skeletons.map((_, i) => (
        <li key={i}>
          <LinkSkeletonCard isPublicLink />
        </li>
      ))}
      <li className='rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-md'>
        Note: You can only create 3 public links, delete one of the links or{' '}
        <Link href='/login' className='font-semibold text-neutral-900 hover:underline'>
          login
        </Link>{' '}
        to create unlimited links.
      </li>
    </ul>
  )
}

'use client'

import Link from 'next/link'
import useLocalStorage from 'use-local-storage-state'
import { useMemo } from 'react'
import { siteConfig } from '@/config/site'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { LinkSchema, type Link as LinkType } from '@/utils/schemas'
import { LinkSkeletonCard } from '../cards/link-skeleton'
import { LinkCard } from '../cards/link'

const HomeLinksSchema = LinkSchema.array()

function parser(value: string): LinkType[] {
  const links = HomeLinksSchema.safeParse(JSON.parse(value))
  return links.success ? links.data : []
}

const serializer = {
  parse: parser,
  stringify: JSON.stringify,
}

export function HomeLinks() {
  const [links, setLinks] = useLocalStorage<LinkType[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    serializer,
  })

  const skeletons = useMemo(() => {
    return [...Array(MAX_PUBLIC_LINKS - links.length)]
  }, [links])

  return (
    <ul className='space-y-2'>
      <li>
        <LinkCard
          isPublicLink
          createdAt={new Date().toISOString()}
          shortLink={siteConfig.examples.key}
          description={null}
          destination={siteConfig.examples.link}
        />
      </li>
      {links.map((link, linkIndex) => {
        return (
          <li key={link.key}>
            <LinkCard
              isPublicLink
              shortLink={link.key}
              description={null}
              destination={link.destination}
              createdAt={new Date().toDateString()}
              onDelete={() => {
                setLinks(prev => prev.filter((_, index) => linkIndex !== index))
              }}
            />
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

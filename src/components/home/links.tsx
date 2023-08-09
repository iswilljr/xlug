'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import useLocalStorage from 'use-local-storage-state'
import { useMemo } from 'react'
import { siteConfig } from '@/config/site'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { LinkSchema, type Link as LinkType } from '@/utils/schemas'
import { LinkSkeletonCard } from '../cards/link-skeleton'

const DemoLinkCard = dynamic(() => import('../cards/demo-link').then(m => m.DemoLinkCard), {
  ssr: false,
  loading: () => <LinkSkeletonCard animate={false} withOptions={false} />,
})

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
        <DemoLinkCard
          shortLink={siteConfig.examples.key}
          description={siteConfig.examples.description}
          destination={siteConfig.examples.link}
        />
      </li>
      {links.map((link, linkIndex) => {
        return (
          <li key={link.key}>
            <DemoLinkCard
              withRemove
              shortLink={link.key}
              description={link.description}
              destination={link.destination}
              onDelete={() => {
                setLinks(prev => prev.filter((_, index) => linkIndex !== index))
              }}
            />
          </li>
        )
      })}
      {skeletons.map((_, i) => (
        <li key={i}>
          <LinkSkeletonCard className='shadow-lg' animate={false} withOptions={false} />
        </li>
      ))}
      <li className='rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-lg'>
        Note: You can only create 3 public links, delete one of the links or{' '}
        <Link href='/login' className='font-semibold text-neutral-900 hover:underline'>
          login
        </Link>{' '}
        to create unlimited links.
      </li>
    </ul>
  )
}

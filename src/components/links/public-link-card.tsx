'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { PublicLinkMoreOptionsButton, type PublicLinkMoreOptionsButtonProps } from './public-more-options'
import type { LinkRow } from '@/types/tables'

interface PublicLinkCardProps
  extends Pick<LinkRow, 'description' | 'destination'>,
    Pick<PublicLinkMoreOptionsButtonProps, 'withDeleteOption'> {
  shortLink: string
}

export function PublicLinkCard({ description, destination, shortLink, ...props }: PublicLinkCardProps) {
  const data = useMemo(
    () => ({
      link: generateShortLink(shortLink),
      logo: generateHostIconFromUrl(destination),
      destination: prettyUrl(destination),
    }),
    [destination, shortLink]
  )

  return (
    <div className='flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900'>
      <Image
        width={40}
        height={40}
        loading='lazy'
        src={data.logo}
        alt={shortLink}
        className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
      />
      <div className='flex w-full min-w-0 flex-col'>
        <div className='flex items-center gap-2'>
          <Link href={data.link} target='_blank' className='truncate font-medium hover:underline' rel='noreferrer'>
            {shortLink}
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={destination}
            target='_blank'
            className='truncate text-sm text-neutral-700 hover:underline dark:text-neutral-400'
            rel='noreferrer'
          >
            {data.destination}
          </Link>
        </div>
      </div>
      <PublicLinkMoreOptionsButton initialValues={{ description, destination, key: shortLink }} {...props} />
    </div>
  )
}

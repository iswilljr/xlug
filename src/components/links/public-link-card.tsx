'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { PublicLinkMoreOptionsButton, type PublicLinkMoreOptionsButtonProps } from './public-more-options'
import type { LinkRow } from '@/types/tables'

interface PublicLinkCardProps
  extends Pick<PublicLinkMoreOptionsButtonProps, 'disableDeleteOption' | 'disableStatsOption'> {
  link: LinkRow
}

export function PublicLinkCard({ link, ...props }: PublicLinkCardProps) {
  const data = useMemo(
    () => ({
      link: generateShortLink(link.key),
      logo: generateHostIconFromUrl(link.destination),
      destination: prettyUrl(link.destination),
    }),
    [link.destination, link.key]
  )

  return (
    <div className='flex w-full items-center gap-2 rounded-lg border border-neutral-300 bg-white p-4 shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900'>
      <Image
        width={40}
        height={40}
        loading='lazy'
        src={data.logo}
        alt={link.key}
        className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
      />
      <div className='flex w-full min-w-0 flex-col'>
        <div className='flex items-center gap-2'>
          <a target='_blank' rel='noreferrer' href={data.link} className='truncate font-medium hover:underline'>
            {link.key}
          </a>
        </div>
        <div className='flex items-center gap-2'>
          <a
            href={link.destination}
            target='_blank'
            className='truncate text-sm text-neutral-700 hover:underline dark:text-neutral-400'
            rel='noreferrer'
          >
            {data.destination}
          </a>
        </div>
      </div>
      <PublicLinkMoreOptionsButton link={link} {...props} />
    </div>
  )
}

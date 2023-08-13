'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { Separator } from '@/ui/separator'
import { formatDateToNow } from '@/utils/dates'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { LinkMoreOptionsButton } from './more-options'
import type { LinkRow } from '@/types/tables'

interface LinkCardProps {
  link: LinkRow
}

export function LinkCard({ link }: LinkCardProps) {
  const data = useMemo(
    () => ({
      dateTime: new Date(link.createdAt).toISOString(),
      link: generateShortLink(link.key),
      logo: generateHostIconFromUrl(link.destination),
      timeAgo: formatDateToNow(link.createdAt),
      destination: prettyUrl(link.destination),
    }),
    [link.createdAt, link.destination, link.key]
  )

  return (
    <div className='grid max-w-full items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='flex w-full min-w-0 items-center gap-2'>
        <div className='flex flex-shrink-0 items-center'>
          <Image
            width={40}
            height={40}
            loading='lazy'
            src={data.logo}
            alt={link.key}
            className='h-10 w-10 rounded-full object-cover'
          />
        </div>
        <div className='flex w-full min-w-0 flex-col'>
          <div className='flex items-center gap-2'>
            <Link
              target='_blank'
              rel='noreferrer'
              href={data.link}
              prefetch={false}
              className='truncate font-medium hover:underline'
            >
              {link.key}
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <p className='whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-400/80'>{data.timeAgo}</p>
            <Separator orientation='vertical' className='h-1 w-1 rounded-full bg-neutral-700' />
            <Link
              href={link.destination}
              target='_blank'
              className='truncate text-sm text-neutral-700 hover:underline dark:text-neutral-400/80'
              rel='noreferrer'
            >
              {data.destination}
            </Link>
          </div>
        </div>
        <div className='flex flex-shrink-0 items-center justify-center'>
          <LinkMoreOptionsButton link={link} />
        </div>
      </div>
      <div className='flex min-w-0 items-start'>
        <p className='truncate text-sm text-neutral-500 dark:text-neutral-400'>
          {link.description ?? 'No description provided.'}
        </p>
      </div>
    </div>
  )
}

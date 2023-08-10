'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { Separator } from '@/ui/separator'
import { formatDateToNow } from '@/utils/dates'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { LinkMoreOptionsButton, type LinkMoreOptionsButtonProps } from '../buttons/link-more-options'
import type { LinkRow } from '@/types/tables'

interface LinkCardProps
  extends Pick<LinkRow, 'createdAt' | 'description' | 'destination'>,
    Pick<LinkMoreOptionsButtonProps, 'isPublicLink' | 'onDelete'> {
  shortLink: string
}

export function LinkCard({ createdAt, description, destination, shortLink, ...props }: LinkCardProps) {
  const data = useMemo(
    () => ({
      dateTime: new Date(createdAt).toISOString(),
      link: generateShortLink(shortLink),
      logo: generateHostIconFromUrl(destination),
      timeAgo: formatDateToNow(createdAt),
      destination: prettyUrl(destination),
    }),
    [createdAt, destination, shortLink]
  )

  return (
    <div className='grid max-w-full items-start gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md'>
      <div className='flex w-full min-w-0 items-center gap-2'>
        <div className='flex flex-shrink-0 items-center'>
          <Image
            width={40}
            height={40}
            loading='lazy'
            src={data.logo}
            alt={shortLink}
            className='h-10 w-10 rounded-full object-cover'
          />
        </div>
        <div className='flex w-full min-w-0 flex-col'>
          <div className='flex items-center gap-2'>
            <Link href={data.link} target='_blank' className='truncate font-medium hover:underline' rel='noreferrer'>
              {shortLink}
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            {!props.isPublicLink && (
              <>
                <p className='whitespace-nowrap text-sm text-neutral-600'>{data.timeAgo}</p>
                <Separator orientation='vertical' className='h-1 w-1 rounded-full bg-neutral-700' />
              </>
            )}
            <Link
              href={destination}
              target='_blank'
              className='truncate text-sm text-neutral-700 hover:underline'
              rel='noreferrer'
            >
              {data.destination}
            </Link>
          </div>
        </div>
        <div className='flex flex-shrink-0 items-center justify-center'>
          <LinkMoreOptionsButton initialValues={{ description, destination, key: shortLink }} {...props} />
        </div>
      </div>
      {!props.isPublicLink && (
        <div className='flex min-w-0 items-start'>
          <p className='truncate text-sm text-neutral-500'>{description ?? 'No description provided.'}</p>
        </div>
      )}
    </div>
  )
}

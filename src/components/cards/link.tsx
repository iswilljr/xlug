'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useMemo } from 'react'
import { Check, Copy } from 'iconoir-react'
import { CopyButton } from '@/ui/copy-button'
import { formatDateToNow } from '@/utils/dates'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { LinkMoreOptionsButton } from '../buttons/link-more-options'
import type { LinkRow } from '@/types/tables'

interface LinkCardProps extends Omit<LinkRow, 'key' | 'userId'> {
  shortLink: string
}

const onCopy = () => toast.success('Short link copied to the clipboard.')

export function LinkCard({ createdAt, description, destination, shortLink }: LinkCardProps) {
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
    <div className='flex h-[4.75rem] max-w-full gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm'>
      <div className='flex-shrink-0'>
        <Image
          width={40}
          height={40}
          loading='lazy'
          src={data.logo}
          alt={shortLink}
          className='h-10 w-10 rounded-full object-cover'
        />
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className='flex max-w-[80%] items-center gap-1'>
          <Link href={data.link} target='_blank' className='truncate font-medium hover:underline' rel='noreferrer'>
            {shortLink}
          </Link>
          <CopyButton
            size='icon'
            variant='secondary'
            aria-label='Copy Short Link'
            className='h-6 w-6 rounded-full bg-neutral-200/50 px-0.5 text-neutral-600'
            copied={<Check className='h-4 w-4 text-green-800' />}
            idle={<Copy className='h-4 w-4' />}
            value={data.link}
            onSuccess={onCopy}
          />
        </div>
        <div className='flex items-center gap-2'>
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
        <LinkMoreOptionsButton initialValues={{ description, destination, key: shortLink }} />
      </div>
    </div>
  )
}

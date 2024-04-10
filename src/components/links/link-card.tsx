'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { BarChartIcon } from 'lucide-react'
import { Separator } from '@/ui/separator'
import { formatDateToNow } from '@/utils/dates'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { useLinksState } from '@/store/links'
import { formatHumanReadable } from '@/utils/formatter'
import { LinkStatsDialog } from '../dialogs/link-stats-dialog'
import { LinkMoreOptionsButton } from './more-options'
import type { LinkRow } from '@/types/tables'

interface LinkCardProps {
  link: LinkRow
}

export function LinkCard({ link }: LinkCardProps) {
  const totalOfClicks = useLinksState(s => s.totalOfClicks)

  const [open, onOpenChange] = useState(false)
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
      <div className='flex w-full min-w-0 items-center gap-4'>
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
            <a target='_blank' rel='noreferrer' href={data.link} className='truncate font-medium hover:underline'>
              {link.key}
            </a>
            <LinkStatsDialog
              trigger={
                <button className='inline-flex shrink-0 items-center gap-1 rounded-md bg-neutral-900/10 px-2 py-1 text-sm dark:bg-neutral-50/10'>
                  <BarChartIcon className='size-4' />
                  {`${formatHumanReadable(totalOfClicks[link.key]?.value ?? 0)} Clicks`}
                </button>
              }
              open={open}
              onOpenChange={onOpenChange}
              link={link}
            />
          </div>
          <div className='flex items-center gap-2'>
            <p className='whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-400/80'>{data.timeAgo}</p>
            <Separator orientation='vertical' className='h-1 w-1 rounded-full bg-neutral-700' />
            <a
              href={link.destination}
              target='_blank'
              className='truncate text-sm text-neutral-700 hover:underline dark:text-neutral-400/80'
              rel='noreferrer'
            >
              {data.destination}
            </a>
          </div>
        </div>
        <div className='flex flex-shrink-0 items-center justify-center'>
          <LinkMoreOptionsButton link={link} />
        </div>
      </div>
    </div>
  )
}

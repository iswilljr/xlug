'use client'

import useSWR from 'swr'
import axios from 'redaxios'
import Image from 'next/image'
import { Skeleton } from '@/ui/skeleton'
import { useMemo, useState } from 'react'
import { BarChartIcon } from 'lucide-react'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { PublicLinkMoreOptionsButton, type PublicLinkMoreOptionsButtonProps } from './public-more-options'
import { formatHumanReadable } from '@/utils/formatter'
import { PUBLIC_DEFAULT_LINK_KEY } from '@/config/constants'
import { LinkStatsDialog } from '../dialogs/link-stats-dialog'
import type { LinkRow, StatsRow } from '@/types/tables'

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

  const [isStatsDialogOpen, setStatsDialogOpen] = useState(false)
  const isPublicDefaultLink = link.key === PUBLIC_DEFAULT_LINK_KEY

  const { data: totalOfClicksData, isLoading } = useSWR(`/api/links/stats?public`, async key =>
    isPublicDefaultLink ? await axios.get<StatsRow[]>(key).then(res => res.data) : null
  )

  return (
    <div className='flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900'>
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
          {isPublicDefaultLink && (
            <>
              {isLoading ? (
                <Skeleton className='h-7 w-20' />
              ) : (
                <LinkStatsDialog
                  link={link}
                  open={isStatsDialogOpen}
                  onOpenChange={setStatsDialogOpen}
                  trigger={
                    <button className='inline-flex shrink-0 items-center gap-1 rounded-md bg-neutral-900/10 px-2 py-1 text-sm dark:bg-neutral-50/10'>
                      <BarChartIcon className='size-4' />
                      {`${formatHumanReadable(totalOfClicksData?.[0]?.value ?? 0)} Clicks`}
                    </button>
                  }
                />
              )}
            </>
          )}
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

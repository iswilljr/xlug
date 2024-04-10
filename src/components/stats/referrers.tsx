import useSWR from 'swr'
import Image from 'next/image'
import { useMemo } from 'react'
import { generateHostIconFromUrl } from '@/utils/links'
import { useStatsInterval } from '@/store/stats-interval'
import { StatsBarList } from './bar-list'
import type { LinkRow, StatsRow } from '@/types/tables'

interface ReferrerStatsProps {
  link: LinkRow
}

export function ReferrerStats({ link }: ReferrerStatsProps) {
  const { interval, timeZone } = useStatsInterval()
  const { data, isLoading } = useSWR<StatsRow[]>(
    `/api/link/${link.key}/stats?tab=referrer&interval=${interval}&timeZone=${timeZone}`
  )

  const pages = useMemo(
    () =>
      data?.map(d => ({
        name: d.name,
        value: d.value,
        icon: function Icon() {
          return (
            <span className='mr-2 flex size-5 shrink-0 items-center'>
              <Image
                alt={d.name}
                width={20}
                height={20}
                src={generateHostIconFromUrl(d.name)}
                className='rounded-full'
              />
            </span>
          )
        },
      })) ?? [],
    [data]
  )

  return (
    <div className='rounded-lg border border-neutral-300 shadow-md dark:border-neutral-800'>
      <div className='flex items-center justify-between border-b border-neutral-300 p-4 dark:border-neutral-800'>
        <p className='font-medium'>URLS</p>
        <p className='text-xs font-medium uppercase text-neutral-400 dark:text-neutral-500'>Referrers</p>
      </div>
      <StatsBarList data={pages} loading={isLoading} />
    </div>
  )
}

'use client'

import useSWR from 'swr'
import { isSameDay } from 'date-fns'
import { useMemo } from 'react'
import { AreaChart } from '@tremor/react'
import { formatDay, getRangeOfDays } from '@/utils/dates'
import { ScrollArea } from '@/ui/scroll-area'
import { valueFormatter } from '@/utils/formatter'
import { StatsLoader, StatsEmpty } from './bar-list'
import type { LinkRow, StatsRow } from '@/types/tables'

interface ClickStatsProps {
  link: LinkRow
}

export function ClickStats({ link }: ClickStatsProps) {
  const { data, isLoading } = useSWR<StatsRow[]>(`/api/link/${link.key}/stats?tab=clicks`)

  const clicksData = useMemo(() => {
    if (data == null || data.length === 0) return []

    const rangeOfDays = getRangeOfDays()

    return rangeOfDays.map(day => {
      const found = data.find(p => {
        return isSameDay(new Date(p.name), day)
      })

      return {
        name: formatDay(found?.name ?? day),
        Clicks: found?.value ?? 0,
      }
    })
  }, [data])

  return (
    <div className='rounded-lg border border-neutral-300 shadow-md dark:border-neutral-800 sm:col-span-2'>
      <div className='flex items-center justify-between border-b border-neutral-300 p-4 dark:border-neutral-800'>
        <p className='font-medium'>Visits</p>
        <p className='text-xs font-medium uppercase text-neutral-400 dark:text-neutral-500'>Clicks</p>
      </div>
      <ScrollArea>
        <div className='p-4'>
          {isLoading ? (
            <StatsLoader />
          ) : clicksData.length === 0 ? (
            <StatsEmpty />
          ) : (
            <AreaChart
              data={clicksData}
              index='name'
              categories={['Clicks']}
              valueFormatter={valueFormatter}
              className='h-72'
              showLegend={false}
              yAxisWidth={30}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

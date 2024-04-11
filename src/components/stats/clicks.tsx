'use client'

import useSWR from 'swr'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { isSameDay, isSameHour, isSameMinute } from 'date-fns'
import { formatDay, getRangeOfDays } from '@/utils/dates'
import { ScrollArea } from '@/ui/scroll-area'
import { valueFormatter } from '@/utils/formatter'
import { useStatsInterval } from '@/store/stats-interval'
import { StatsLoader, StatsEmpty } from './bar-list'
import type { LinkRow, StatsRow } from '@/types/tables'

interface ClickStatsProps {
  link: LinkRow
}

const AreaChart = dynamic(() => import('@tremor/react/dist/components/chart-elements/AreaChart/AreaChart'), {
  ssr: false,
  loading(props) {
    return <StatsLoader className='h-72' />
  },
})

export function ClickStats({ link }: ClickStatsProps) {
  const { interval, timeZone } = useStatsInterval()
  const { data, isLoading } = useSWR<StatsRow[]>(
    `/api/link/${link.key}/stats?tab=clicks&interval=${interval}&timeZone=${timeZone}`
  )

  const clicksData = useMemo(() => {
    if (data == null || data.length === 0) return []

    const rangeOfDays = getRangeOfDays({ interval, start: data[0].name })

    return rangeOfDays.map(rangeDate => {
      const found = data.find(clickData => {
        const currentDate = new Date(clickData.name)

        if (interval === '1h') {
          return isSameMinute(currentDate, rangeDate)
        }

        if (interval === '24h') {
          return isSameHour(currentDate, rangeDate)
        }

        return isSameDay(currentDate, rangeDate)
      })

      return {
        name: formatDay(found?.name ?? rangeDate, interval),
        Clicks: found?.value ?? 0,
      }
    })
  }, [data, interval])

  return (
    <div className='rounded-lg border border-neutral-300 shadow-md dark:border-neutral-800 sm:col-span-2'>
      <div className='flex items-center justify-between border-b border-neutral-300 p-4 dark:border-neutral-800'>
        <p className='font-medium'>Visits</p>
        <p className='text-xs font-medium uppercase text-neutral-400 dark:text-neutral-500'>Clicks</p>
      </div>
      <ScrollArea>
        <div className='p-4'>
          {isLoading ? (
            <StatsLoader className='h-72' />
          ) : clicksData.length === 0 ? (
            <StatsEmpty className='h-72' />
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

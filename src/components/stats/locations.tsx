import useSWR from 'swr'
import Image from 'next/image'
import countryLists from 'countries-list/minimal/countries.en.min.json'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Button } from '@/ui/button'
import { cn } from '@/utils/cn'
import { useStatsInterval } from '@/store/stats-interval'
import { StatsBarList } from './bar-list'
import type { LinkRow, StatsRow } from '@/types/tables'
import type { TabEnumSchema } from '@/utils/schemas'
import type { z } from 'zod'

type CountryCode = keyof typeof countryLists
type TabValues = z.infer<typeof TabEnumSchema>
type LocationTabs = Extract<TabValues, 'country' | 'city'>

interface LocationStatsProps {
  link: LinkRow
}

const locationTabs = [
  { label: 'Country', value: 'country' },
  { label: 'City', value: 'city' },
] as const

export function LocationStats({ link }: LocationStatsProps) {
  const { interval, timeZone } = useStatsInterval()
  const [selectedTab, setSelectedTab] = useState<LocationTabs>('country')

  const { data, isLoading } = useSWR<StatsRow[]>(
    `/api/link/${link.key}/stats?tab=${selectedTab}&interval=${interval}&timeZone=${timeZone}`
  )

  const pages = useMemo(
    () =>
      data?.map(location => ({
        name: countryLists[location.name as CountryCode] ?? location.name,
        value: location.value,
        icon: function Icon() {
          return (
            <span className='mr-2 flex size-5 shrink-0 items-center'>
              <Image
                alt={location.name}
                src={
                  (location.country ?? location.name) === 'unknown'
                    ? 'https://uaparser.js.org/images/browsers/default.png'
                    : `https://flag.vercel.app/m/${location.country ?? location.name}.svg`
                }
                width={20}
                height={20}
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
        <p className='font-medium'>Locations</p>

        <ul className='inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'>
          {locationTabs.map(tab => (
            <li key={tab.value}>
              <Button
                variant='ghost'
                size='sm'
                className={cn(
                  'relative min-h-0 px-3 py-1 text-sm',
                  tab.value === selectedTab && 'text-neutral-950 dark:text-white'
                )}
                onClick={() => setSelectedTab(tab.value)}
              >
                <span className='z-10'>{tab.label}</span>
                {tab.value === selectedTab && (
                  <motion.div
                    layoutId='location-indicator'
                    transition={{ duration: 0.25 }}
                    className='absolute h-full w-full rounded-md bg-white dark:bg-neutral-950'
                  />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <StatsBarList data={pages} loading={isLoading} />
    </div>
  )
}

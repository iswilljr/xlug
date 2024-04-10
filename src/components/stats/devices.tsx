'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Button } from '@/ui/button'
import { cn } from '@/utils/cn'
import { StatsBarList } from './bar-list'
import type { LinkRow, StatsRow } from '@/types/tables'
import type { TabEnumSchema } from '@/utils/schemas'
import type { z } from 'zod'

type TabValues = z.infer<typeof TabEnumSchema>
type DeviceTabs = Extract<TabValues, 'device' | 'browser' | 'os'>

interface DeviceStatsProps {
  link: LinkRow
}

const deviceTabs = [
  { label: 'Browser', value: 'browser' },
  { label: 'Device', value: 'device' },
  { label: 'OS', value: 'os' },
] as const

export function DeviceStats({ link }: DeviceStatsProps) {
  const [selectedTab, setSelectedTab] = useState<DeviceTabs>('browser')

  const { data, isLoading } = useSWR<StatsRow[]>(`/api/link/${link.key}/stats?tab=${selectedTab}`)

  const pages = useMemo(
    () =>
      data?.map(device => ({
        name: device.name,
        value: device.value,
        icon: function Icon() {
          return (
            <span className='mr-2 flex size-5 shrink-0 items-center'>
              <DeviceIcon display={device.name} tab={selectedTab} />
            </span>
          )
        },
      })) ?? [],
    [data, selectedTab]
  )

  return (
    <div className='rounded-lg border border-neutral-300 shadow-md dark:border-neutral-800'>
      <div className='flex items-center justify-between border-b border-neutral-300 p-4 dark:border-neutral-800'>
        <p className='font-medium'>Devices</p>
        <ul className='inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'>
          {deviceTabs.map(tab => (
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
                    layoutId='device-indicator'
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

function DeviceIcon({ display, tab }: { display: string; tab: string }) {
  const defaults: Record<string, string> = {
    unknown: 'https://uaparser.js.org/images/browsers/default.png',
    desktop: 'https://uaparser.js.org/images/types/default.png',
    Android: '/icons/android.png',
    'Mac OS': '/icons/macos.png',
    Linux: '/icons/linux.png',
    iOS: '/icons/ios.png',
  }

  const types: Record<string, string> = {
    device: 'types',
    browser: 'browsers',
    os: 'os',
  }

  const type = types[tab]

  const [src, setSrc] = useState(
    defaults[display] ?? `https://uaparser.js.org/images/${type}/${display.toLowerCase()}.png`
  )

  return (
    <Image
      src={src}
      alt={display}
      width={20}
      height={20}
      className='h-5 w-5'
      onError={() => setSrc(defaults.unknown)}
    />
  )
}

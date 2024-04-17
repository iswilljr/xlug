'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { CalendarClockIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { ClickStats } from '@/components/stats/clicks'
import { DeviceStats } from '@/components/stats/devices'
import { LocationStats } from '@/components/stats/locations'
import { ReferrerStats } from '@/components/stats/referrers'
import { generateHostIconFromUrl } from '@/utils/links'
import { useStatsInterval } from '@/store/stats-interval'
import { ModalContent } from '@/ui/modal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import type { LinkRow } from '@/types/tables'

export interface LinkStatsDialogProps {
  link: LinkRow
}

const intervalItems = [
  { label: 'Last hour', value: '1h', icon: ClockIcon },
  { label: 'Last 24 hours', value: '24h', icon: ClockIcon },
  { label: 'Last 7 days', value: '7d', icon: CalendarIcon },
  { label: 'Last 30 days', value: '30d', icon: CalendarIcon },
  { label: 'Last 90 days', value: '90d', icon: CalendarIcon },
  { label: 'All time', value: 'all', icon: CalendarClockIcon },
]

export function LinkStatsDialog({ link }: LinkStatsDialogProps) {
  const { interval, setInterval } = useStatsInterval()

  const data = useMemo(
    () => ({
      logo: generateHostIconFromUrl(link.destination),
      alt: link.key,
    }),
    [link]
  )

  return (
    <ModalContent className='sm:max-w-5xl' withCloseButton={false}>
      <div className='flex items-center justify-between gap-2 border-b border-neutral-300 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50'>
        <div className='flex items-center gap-1'>
          <Image alt={data.alt} src={data.logo} width={40} height={40} className='mx-auto size-8 rounded-full' />
          <h3 className='max-w-sm truncate text-lg font-medium'>{link.key}</h3>
        </div>
        <Select value={interval} onValueChange={setInterval}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select interval' />
          </SelectTrigger>
          <SelectContent>
            {intervalItems.map(item => (
              <SelectItem key={item.value} value={item.value}>
                <span className='flex items-center gap-2'>
                  <item.icon className='size-4' />
                  {item.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2'>
        <ClickStats link={link} />
        <DeviceStats link={link} />
        <LocationStats link={link} />
        <ReferrerStats link={link} />
      </div>
    </ModalContent>
  )
}

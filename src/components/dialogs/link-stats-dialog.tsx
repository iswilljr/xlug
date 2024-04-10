import Image from 'next/image'
import { useMemo } from 'react'
import { CalendarClockIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { ClickStats } from '@/components/stats/clicks'
import { DeviceStats } from '@/components/stats/devices'
import { LocationStats } from '@/components/stats/locations'
import { ReferrerStats } from '@/components/stats/referrers'
import { generateHostIconFromUrl } from '@/utils/links'
import { useStatsInterval } from '@/store/stats-interval'
import { Dialog } from '@/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import type { LinkRow } from '@/types/tables'

export interface LinkStatsDialogProps {
  link: LinkRow
  open?: boolean
  trigger?: React.ReactNode
  onOpenChange?: (value: boolean) => void
}

export function LinkStatsDialog({ link, open, trigger, onOpenChange }: LinkStatsDialogProps) {
  const { interval, setInterval } = useStatsInterval()

  const data = useMemo(
    () => ({
      logo: generateHostIconFromUrl(link.destination),
      alt: link.key,
    }),
    [link]
  )

  return (
    <Dialog
      open={open}
      trigger={trigger}
      withCloseButton={false}
      onOpenChange={onOpenChange}
      className='gap-0 overflow-hidden p-0 pt-2 dark:bg-neutral-950 sm:max-w-5xl sm:pt-0'
    >
      <div className='flex items-center justify-between gap-2 border-b border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50'>
        <div className='flex items-center gap-1'>
          <Image alt={data.alt} src={data.logo} width={40} height={40} className='mx-auto size-8 rounded-full' />
          <h3 className='max-w-sm truncate text-lg font-medium'>{link.key}</h3>
        </div>
        <Select value={interval} onValueChange={setInterval}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select interval' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1h'>
              <span className='flex items-center gap-2'>
                <ClockIcon className='size-4' />
                Last hour
              </span>
            </SelectItem>
            <SelectItem value='24h'>
              <span className='flex items-center gap-2'>
                <ClockIcon className='size-4' />
                Last 24 hours
              </span>
            </SelectItem>
            <SelectItem value='7d'>
              <span className='flex items-center gap-2'>
                <CalendarIcon className='size-4' />
                Last 7 days
              </span>
            </SelectItem>
            <SelectItem value='30d'>
              <span className='flex items-center gap-2'>
                <CalendarIcon className='size-4' />
                Last 30 days
              </span>
            </SelectItem>
            <SelectItem value='90d'>
              <span className='flex items-center gap-2'>
                <CalendarIcon className='size-4' />
                Last 90 days
              </span>
            </SelectItem>
            <SelectItem value='all'>
              <span className='flex items-center gap-2'>
                <CalendarClockIcon className='size-4' />
                All time
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2'>
        <ClickStats link={link} />
        <DeviceStats link={link} />
        <LocationStats link={link} />
        <ReferrerStats link={link} />
      </div>
    </Dialog>
  )
}

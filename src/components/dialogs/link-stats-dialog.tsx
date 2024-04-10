import Image from 'next/image'
import { useMemo } from 'react'
import { ClickStats } from '@/components/stats/clicks'
import { DeviceStats } from '@/components/stats/devices'
import { LocationStats } from '@/components/stats/locations'
import { ReferrerStats } from '@/components/stats/referrers'
import { generateHostIconFromUrl } from '@/utils/links'
import { Dialog } from '@/ui/dialog'
import type { LinkRow } from '@/types/tables'

export interface LinkStatsDialogProps {
  link: LinkRow
  open?: boolean
  trigger?: React.ReactNode
  onOpenChange?: (value: boolean) => void
}

export function LinkStatsDialog({ link, open, trigger, onOpenChange }: LinkStatsDialogProps) {
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
      <div className='flex flex-col items-center justify-center gap-1 border-b border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50 sm:px-16'>
        <Image alt={data.alt} src={data.logo} width={40} height={40} className='mx-auto h-10 w-10 rounded-full' />
        <h3 className='max-w-sm truncate text-lg font-medium'>{`${link.key} link stats`}</h3>
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

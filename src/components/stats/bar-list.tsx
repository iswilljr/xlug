import dynamic from 'next/dynamic'
import { ScrollArea } from '@/ui/scroll-area'
import { cn } from '@/utils/cn'
import { valueFormatter } from '@/utils/formatter'
import { LoaderIcon } from 'lucide-react'
import type { BarListProps } from '@tremor/react'

interface StatsBarListProps extends BarListProps {
  loading?: boolean
}

const BarList = dynamic(() => import('@tremor/react/dist/components/vis-elements/BarList/BarList'), {
  ssr: false,
  loading(props) {
    return <StatsLoader />
  },
})

export function StatsLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-64 w-full flex-col items-center justify-center gap-1 text-neutral-400 dark:text-neutral-500',
        className
      )}
    >
      <LoaderIcon className='size-8 animate-spin ' />
      <p className='text-sm'>Loading...</p>
    </div>
  )
}

export function StatsEmpty({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-64 w-full flex-col items-center justify-center gap-1 text-neutral-400 dark:text-neutral-500',
        className
      )}
    >
      <p className='text-sm'>No data</p>
    </div>
  )
}

export function StatsBarList({ loading, data, ...props }: StatsBarListProps) {
  return (
    <ScrollArea>
      <div className='max-h-72 min-h-72'>
        <div className='p-4'>
          {loading ? (
            <StatsLoader />
          ) : data.length === 0 ? (
            <StatsEmpty />
          ) : (
            <BarList data={data} valueFormatter={valueFormatter} {...props} />
          )}
        </div>
      </div>
    </ScrollArea>
  )
}

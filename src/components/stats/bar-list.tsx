import { ScrollArea } from '@/ui/scroll-area'
import { valueFormatter } from '@/utils/formatter'
import { BarList, type BarListProps } from '@tremor/react'
import { SystemRestart } from 'iconoir-react'

interface StatsBarListProps extends BarListProps {
  loading?: boolean
}

export function StatsLoader() {
  return (
    <div className='flex h-64 w-full flex-col items-center justify-center gap-1 text-neutral-400 dark:text-neutral-500'>
      <SystemRestart className='size-8 animate-spin ' />
      <p className='text-sm'>Loading...</p>
    </div>
  )
}

export function StatsEmpty() {
  return (
    <div className='flex h-64 w-full flex-col items-center justify-center gap-1 text-neutral-400 dark:text-neutral-500'>
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

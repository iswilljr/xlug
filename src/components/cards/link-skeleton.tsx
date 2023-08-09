import { Skeleton } from '@/ui/skeleton'
import { cn } from '@/utils/cn'

export interface LinkSkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
  withOptions?: boolean
}

export function LinkSkeletonCard({ animate = true, className, withOptions = true, ...props }: LinkSkeletonCardProps) {
  return (
    <div
      className={cn(
        'flex h-[4.75rem] w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm',
        className
      )}
      {...props}
    >
      <Skeleton animate={animate} className='h-10 w-10 flex-shrink-0 rounded-full' />
      <div className='flex-1 space-y-2'>
        <div className='flex items-center gap-1'>
          <Skeleton animate={animate} className='h-4 w-2/6 rounded-xl' />
          <Skeleton animate={animate} className='h-4 w-4 rounded-full' />
        </div>
        <Skeleton animate={animate} className='h-4 w-3/5 rounded-full' />
      </div>
      {withOptions && (
        <div className='flex w-7 items-center justify-center'>
          <Skeleton animate={animate} className='h-5 w-1.5 rounded-xl' />
        </div>
      )}
    </div>
  )
}

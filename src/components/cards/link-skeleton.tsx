import { Skeleton } from '@/ui/skeleton'

export interface LinkSkeletonCardProps {
  isPublicLink?: boolean
}

export function LinkSkeletonCard({ isPublicLink = false }: LinkSkeletonCardProps) {
  const animate = !isPublicLink

  return (
    <div className='grid w-full gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md'>
      <div className='flex h-11 items-center gap-2'>
        <Skeleton animate={animate} className='h-10 w-10 flex-shrink-0 rounded-full' />
        <div className='flex flex-1 flex-col justify-center space-y-1'>
          <Skeleton animate={animate} className='h-4 w-2/6 rounded-xl' />
          <Skeleton animate={animate} className='h-4 w-3/5 rounded-full' />
        </div>
        <div className='flex w-7 items-center justify-center'>
          <Skeleton animate={animate} className='h-5 w-1.5 rounded-xl' />
        </div>
      </div>
      {!isPublicLink && (
        <div className='h-5'>
          <Skeleton className='h-4 w-full' />
        </div>
      )}
    </div>
  )
}

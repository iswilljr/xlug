import { cn } from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
}

function Skeleton({ animate = true, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-lg bg-neutral-900/10 dark:bg-neutral-50/10', animate && 'animate-pulse', className)}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }

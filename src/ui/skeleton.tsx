import { cn } from '@/utils/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-neutral-900/10 dark:bg-neutral-50/10', className)} {...props} />
  )
}

export { Skeleton }

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold shadow transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-neutral-500 bg-neutral-100 text-neutral-700 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-400',
        success:
          'border-green-500 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-400',
        destructive: 'border-red-500 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-400',
      },
      transform: {
        none: '',
        uppercase: 'uppercase',
        capitalize: 'capitalize',
      },
    },
    defaultVariants: {
      variant: 'default',
      transform: 'capitalize',
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, transform, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, transform }), className)} {...props} />
}

export { Badge, badgeVariants }

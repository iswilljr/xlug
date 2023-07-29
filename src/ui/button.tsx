/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { forwardRef } from 'react'
import { SystemRestart } from 'iconoir-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonVariants, React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  loading?: boolean
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:select-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-800',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 focus-visible:ring-neutral-900 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-50',
        destructive:
          'bg-red-500 text-neutral-50 shadow-sm hover:bg-red-600/90 focus-visible:ring-red-500 dark:bg-red-600 dark:text-red-50  dark:hover:bg-red-600/90 dark:focus-visible:ring-red-600',
        outline:
          'border border-neutral-300 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        secondary:
          'bg-neutral-300 text-neutral-900 shadow-sm hover:bg-neutral-300/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'min-h-[2.25rem] px-4 py-2',
        sm: 'min-h-[2rem] rounded-md px-3 text-xs',
        lg: 'min-h-[2.5rem] rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, loading, icon, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {(loading || icon) && (
          <span className='mr-2'>{loading ? <SystemRestart className='animate-spin' /> : icon}</span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

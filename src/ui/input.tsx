import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string
  icon?: React.FC<any>
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon: Icon, rootClassName, ...props }, ref) => {
  return (
    <div className={cn('relative flex items-center', rootClassName)}>
      {Icon && (
        <span className='pointer-events-none absolute left-3 h-4 w-4'>
          <Icon className='h-4 w-4 text-neutral-400' />
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-sm outline-none duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-800',
          Icon && 'pl-9',
          className
        )}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'

export { Input }

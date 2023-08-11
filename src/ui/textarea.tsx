import TextareaAutosize from 'react-textarea-autosize'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps extends React.ComponentProps<typeof TextareaAutosize> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, minRows = 2, ...props }, ref) => {
  return (
    <TextareaAutosize
      ref={ref}
      minRows={minRows}
      className={cn(
        'flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition-[color,_background-color,_border-color,box-shadow] duration-200 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-800',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }

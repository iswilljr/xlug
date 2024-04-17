'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { Button } from './button'
import { ScrollArea } from './scroll-area'

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  withCloseButton?: boolean
}

const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, withCloseButton = true, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'dialog fixed bottom-0 z-50 grid w-full gap-0 overflow-hidden rounded-2xl border border-neutral-300 bg-white p-0 pt-2 shadow-2xl outline-none ![animation-duration:500ms] [animation-timing-function:cubic-bezier(.32,.72,0,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full dark:border-neutral-800 dark:bg-neutral-950 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:pt-0 sm:![animation-duration:150ms] sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:fade-in-0 sm:data-[state=closed]:zoom-out-50 sm:data-[state=open]:zoom-in-50 sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-1/2 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-1/2',
          className
        )}
        {...props}
      >
        <ScrollArea className='content'>{children}</ScrollArea>
        {withCloseButton && (
          <DialogPrimitive.Close asChild>
            <Button
              variant='ghost'
              className='absolute right-2 top-2 z-20 min-h-fit rounded-full p-1 hover:bg-neutral-200 focus:ring-2 focus:ring-offset-2'
              size='icon'
            >
              <XIcon className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
    {...props}
  />
))

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-white/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80',
      className
    )}
    {...props}
  />
))

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))

DialogContent.displayName = DialogPrimitive.Content.displayName
DialogDescription.displayName = DialogPrimitive.Description.displayName
DialogFooter.displayName = 'DialogFooter'
DialogHeader.displayName = 'DialogHeader'
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
DialogTitle.displayName = DialogPrimitive.Title.displayName

export { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter }

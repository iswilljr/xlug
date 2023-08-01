'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cancel } from 'iconoir-react'
import { forwardRef, useMemo } from 'react'
import { useClasses } from '@/hooks/use-classes'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { cn } from '@/utils/cn'
import { Button } from './button'
import { Drawer } from './drawer'
import { ScrollArea } from './scroll-area'
import type { ClassNamesProps } from '@/types/classnames'

type DialogClasses = 'root' | 'trigger' | 'header' | 'title' | 'description' | 'content' | 'footer'

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  withCloseButton?: boolean
}

interface DialogProps
  extends DialogPrimitive.DialogProps,
    Omit<DialogContentProps, 'title'>,
    ClassNamesProps<DialogClasses> {
  description?: React.ReactNode
  footer?: React.ReactNode
  title?: React.ReactNode
  trigger?: React.ReactNode
}

const DialogRoot = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, withCloseButton = true, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed bottom-0 z-50 grid w-full gap-4 rounded-md border border-neutral-200 bg-white p-6 shadow-lg outline-none ![animation-duration:500ms] [animation-timing-function:cubic-bezier(.32,.72,0,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full dark:border-neutral-800 dark:bg-neutral-950 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:![animation-duration:150ms] sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:fade-in-0 sm:data-[state=closed]:zoom-out-50 sm:data-[state=open]:zoom-in-50 sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-1/2 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-1/2',
          className
        )}
        {...props}
      >
        {children}
        {withCloseButton && (
          <DialogPrimitive.Close asChild>
            <Button
              variant='ghost'
              className='absolute right-2 top-2 z-20 min-h-fit rounded-full p-1 hover:bg-neutral-200 focus:ring-2 focus:ring-offset-2'
              size='icon'
            >
              <Cancel className='h-5 w-5' />
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
      'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80',
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

function Dialog({
  children,
  className,
  classNames,
  defaultOpen,
  description,
  footer,
  modal,
  onOpenChange,
  open,
  title,
  trigger,
  ...props
}: DialogProps) {
  const classes = useClasses({ root: ['dialog', className], content: 'content' }, classNames)
  const hasHeader = useMemo(() => Boolean(description ?? title), [description, title])
  const { isMobile, modalOpen, onModalOpenChange } = useWithinDrawer({ defaultOpen, onOpenChange, open })

  if (isMobile) {
    return (
      <Drawer
        className={className}
        classNames={classNames}
        description={description}
        footer={footer}
        onOpenChange={onModalOpenChange}
        open={modalOpen}
        title={title}
        trigger={trigger}
        {...props}
      >
        {children}
      </Drawer>
    )
  }

  return (
    <DialogRoot modal={modal} open={modalOpen} onOpenChange={onModalOpenChange}>
      {trigger && (
        <DialogTrigger className={classes.trigger} asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className={classes.root} {...props}>
        {hasHeader && (
          <DialogHeader className={classes.header}>
            {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
            {description && <DialogDescription className={classes.description}>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <ScrollArea scrollHideDelay={10000} className={classes.content}>
          {children}
        </ScrollArea>
        {footer && <DialogFooter className={classes.footer}>{footer}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  )
}

DialogContent.displayName = DialogPrimitive.Content.displayName
DialogDescription.displayName = DialogPrimitive.Description.displayName
DialogFooter.displayName = 'DialogFooter'
DialogHeader.displayName = 'DialogHeader'
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
DialogTitle.displayName = DialogPrimitive.Title.displayName

export { Dialog }

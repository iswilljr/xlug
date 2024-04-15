'use client'

import { forwardRef } from 'react'
import { XIcon } from 'lucide-react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/utils/cn'
import { Button } from './button'
import { ScrollArea } from './scroll-area'

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  withCloseButton?: boolean
}

const Drawer = DrawerPrimitive.Root
const DrawerPortal = DrawerPrimitive.Portal
const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerContent = forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, DrawerContentProps>(
  ({ className, children, withCloseButton = true, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'drawer fixed bottom-0 z-50 grid w-full gap-0 overflow-hidden rounded-2xl rounded-b-none border border-neutral-300 bg-white p-0 pt-2 shadow-lg outline-none [animation-duration:300ms] dark:border-neutral-800 dark:bg-neutral-950 sm:max-w-sm sm:pt-0',
          className
        )}
        {...props}
      >
        <DrawerIndicator />
        <ScrollArea className='content'>{children}</ScrollArea>
        {withCloseButton && (
          <DrawerPrimitive.Close asChild>
            <Button
              variant='ghost'
              className='absolute right-2 top-2 z-20 min-h-fit rounded-full p-1 hover:bg-neutral-200 focus:ring-2 focus:ring-offset-2'
              size='icon'
            >
              <XIcon className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </Button>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
)

const DrawerDescription = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
    {...props}
  />
))

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

const DrawerIndicator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mx-auto mb-2 h-1 w-12 flex-shrink-0 rounded-full bg-neutral-300', className)} {...props} />
)

const DrawerOverlay = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80', className)}
    {...props}
  />
))

const DrawerTitle = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))

DrawerContent.displayName = DrawerPrimitive.Content.displayName
DrawerDescription.displayName = DrawerPrimitive.Description.displayName
DrawerFooter.displayName = 'DrawerFooter'
DrawerHeader.displayName = 'DrawerHeader'
DrawerIndicator.displayName = 'DrawerIndicator'
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

export { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter }

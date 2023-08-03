'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { useClasses } from '@/hooks/use-classes'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { Drawer } from './drawer'
import type { ClassNamesProps } from '@/types/classnames'

type PopoverClasses = 'root' | 'trigger'

interface PopoverProps
  extends PopoverPrimitive.PopoverProps,
    PopoverPrimitive.PopoverContentProps,
    ClassNamesProps<PopoverClasses> {
  trigger?: React.ReactNode
}

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-xl border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

function Popover({
  children,
  className,
  classNames,
  defaultOpen,
  modal,
  onOpenChange,
  open,
  trigger,
  ...props
}: PopoverProps) {
  const classes = useClasses({ root: className }, classNames)
  const { isMobile, modalOpen, onModalOpenChange } = useWithinDrawer({ defaultOpen, onOpenChange, open })

  if (isMobile) {
    return (
      <Drawer
        className={className}
        classNames={classNames}
        defaultOpen={defaultOpen}
        onOpenChange={onModalOpenChange}
        open={modalOpen}
        trigger={trigger}
        withCloseButton={false}
      >
        {children}
      </Drawer>
    )
  }

  return (
    <PopoverRoot {...{ defaultOpen, modal, onOpenChange: onModalOpenChange, open: modalOpen }}>
      {trigger && (
        <PopoverTrigger className={classes.trigger} asChild>
          {trigger}
        </PopoverTrigger>
      )}
      <PopoverContent className={classes.root} {...props}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  )
}

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover }

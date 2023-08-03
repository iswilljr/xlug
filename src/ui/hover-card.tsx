'use client'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { forwardRef } from 'react'
import { useClasses } from '@/hooks/use-classes'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { cn } from '@/utils/cn'
import { Drawer } from './drawer'
import type { ClassNamesProps } from '@/types/classnames'

type HoverCardClasses = 'root' | 'trigger'

interface HoverCardProps
  extends HoverCardPrimitive.HoverCardProps,
    Omit<HoverCardPrimitive.HoverCardContentProps, 'content'>,
    ClassNamesProps<HoverCardClasses> {
  content: React.ReactNode
}

const HoverCardRoot = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-xl border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
      className
    )}
    {...props}
  />
))

function HoverCard({
  children,
  className,
  classNames,
  closeDelay,
  content,
  defaultOpen,
  onOpenChange,
  open,
  openDelay,
  ...props
}: HoverCardProps) {
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
        trigger={children}
        withCloseButton={false}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <HoverCardRoot closeDelay={closeDelay} onOpenChange={onModalOpenChange} open={modalOpen} openDelay={openDelay}>
      <HoverCardTrigger className={classes.trigger} asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className={classes.root} {...props}>
        {content}
      </HoverCardContent>
    </HoverCardRoot>
  )
}

HoverCard.displayName = 'HoverCard'
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard }

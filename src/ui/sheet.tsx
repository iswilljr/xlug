'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { forwardRef, useMemo } from 'react'
import { Cancel } from 'iconoir-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useClasses } from '@/hooks/use-classes'
import { cn } from '@/utils/cn'
import type { ClassNamesProps } from '@/types/classnames'
import { Button } from './button'

type SheetVariant = VariantProps<typeof sheetVariants>
type SheetClasses = 'root' | 'trigger' | 'header' | 'title' | 'description'

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, SheetVariant {}

interface SheetProps
  extends SheetPrimitive.DialogProps,
    Omit<SheetContentProps, 'title'>,
    ClassNamesProps<SheetClasses> {
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: string
}

const sheetVariants = cva(
  'fixed z-50 gap-4 border-neutral-300 bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out dark:border-neutral-800 dark:bg-neutral-950',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

const SheetRoot = SheetPrimitive.Root
const SheetPortal = SheetPrimitive.Portal
const SheetTrigger = SheetPrimitive.Trigger

const SheetContent = forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'left', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 z-20 min-h-fit rounded-full p-1 hover:bg-neutral-200 focus:ring-2 focus:ring-offset-2'
            size='icon'
          >
            <Cancel className='h-5 w-5' />
            <span className='sr-only'>Close</span>
          </Button>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
)

const SheetDescription = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
    {...props}
  />
))

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)

const SheetOverlay = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-neutral-950/80',
      className
    )}
    {...props}
    ref={ref}
  />
))

const SheetTitle = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-neutral-950 dark:text-neutral-50', className)}
    {...props}
  />
))

const Sheet = ({
  classNames,
  children,
  className,
  defaultOpen,
  description,
  modal,
  onOpenChange,
  open,
  title,
  trigger,
  ...props
}: SheetProps) => {
  const classes = useClasses({ root: className }, classNames)
  const hasHeader = useMemo(() => Boolean(description ?? title), [description, title])

  return (
    <SheetRoot {...{ defaultOpen, modal, onOpenChange, open }}>
      {trigger && (
        <SheetTrigger className={classes.trigger} asChild>
          {trigger}
        </SheetTrigger>
      )}
      <SheetContent className={classes.root} {...props}>
        {hasHeader && (
          <SheetHeader className={classes.header}>
            {title && <SheetTitle className={classes.title}>{title}</SheetTitle>}
            {description && <SheetDescription className={classes.description}>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </SheetRoot>
  )
}

SheetContent.displayName = SheetPrimitive.Content.displayName
SheetDescription.displayName = SheetPrimitive.Description.displayName
SheetFooter.displayName = 'SheetFooter'
SheetHeader.displayName = 'SheetHeader'
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName
SheetPortal.displayName = SheetPrimitive.Portal.displayName
SheetTitle.displayName = SheetPrimitive.Title.displayName

export { Sheet }

'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { forwardRef, useMemo } from 'react'
import { useClasses } from '@/hooks/use-classes'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { cn } from '@/utils/cn'
import { Drawer } from './drawer'
import type { ClassNamesProps } from '@/types/classnames'

type DropdownMenuClasses = 'root' | 'trigger' | 'label' | 'separator' | 'group' | 'item' | 'shortcut'

interface DropdownMenuProps
  extends DropdownMenuPrimitive.DropdownMenuProps,
    DropdownMenuPrimitive.DropdownMenuContentProps,
    ClassNamesProps<DropdownMenuClasses> {
  trigger?: React.ReactNode
  menu?: Array<DropdownMenuContentLabel | DropdownMeneContentSeparator | DropdownMenuContentGroup>
  items?: DropdownMenuContentItem[]
}

interface DropdownMenuContentLabel {
  type: 'label'
  label: React.ReactNode
}
interface DropdownMenuContentGroup {
  type: 'group'
  items: DropdownMenuContentItem[]
}

interface DropdownMenuContentItem extends DropdownMenuPrimitive.DropdownMenuItemProps {
  label: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
}

interface DropdownMeneContentSeparator {
  type: 'separator'
}

const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuRoot = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'pointer-events-none z-50 min-w-[8rem] overflow-hidden rounded-lg border border-neutral-200 bg-white p-1 text-neutral-950 opacity-0 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 sm:pointer-events-auto sm:opacity-100',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-4 rounded-lg px-2 py-1.5 text-sm text-neutral-500 outline-none transition-colors focus:bg-neutral-200/50 focus:text-neutral-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))

const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
))

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800', className)}
    {...props}
  />
))

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn('ml-auto hidden text-xs tracking-widest opacity-60 sm:inline-flex', className)} {...props} />
  )
}

const DropdownMenu = ({
  children,
  className,
  classNames,
  defaultOpen,
  items,
  menu,
  modal,
  onOpenChange,
  open,
  trigger,
  ...props
}: DropdownMenuProps) => {
  const classes = useClasses({ root: className }, classNames)
  const { isMobile, modalOpen, onModalOpenChange } = useWithinDrawer({ defaultOpen, onOpenChange, open })
  const Wrapper: typeof Drawer = isMobile ? Drawer : ({ children }) => children as any

  const dropdownMenu = useMemo(() => {
    if (!menu && !items) throw Error("Missing prop 'menu' or 'item'")

    return menu ?? ([{ type: 'group', items: items ?? [] }] as Exclude<DropdownMenuProps['menu'], undefined>)
  }, [items, menu])

  return (
    <DropdownMenuRoot modal={!isMobile} onOpenChange={onModalOpenChange} open={modalOpen}>
      {trigger && (
        <DropdownMenuTrigger className={classes.trigger} asChild>
          {trigger}
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className={classes.root} {...props}>
        <Wrapper
          classNames={{ root: 'gap-2 px-2 pb-2', indicator: 'mb-0' }}
          withCloseButton={false}
          onOpenChange={onModalOpenChange}
          open={modalOpen}
        >
          {dropdownMenu.map((item, index) =>
            item.type === 'label' ? (
              <DropdownMenuLabel className={classes.label} key={index}>
                {item.label}
              </DropdownMenuLabel>
            ) : item.type === 'separator' ? (
              <DropdownMenuSeparator className={classes.separator} key={index} />
            ) : (
              <DropdownMenuGroup className={classes.group} key={index}>
                {item.items.map(({ className, label, shortcut, icon, ...props }, index) => (
                  <DropdownMenuItem className={cn(classes.item, className)} key={index} {...props}>
                    <div className='flex items-center gap-2'>
                      {icon}
                      {label}
                    </div>
                    {shortcut && <DropdownMenuShortcut className={classes.shortcut}>{shortcut}</DropdownMenuShortcut>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            )
          )}
        </Wrapper>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export { DropdownMenu }

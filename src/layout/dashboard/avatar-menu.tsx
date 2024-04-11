'use client'

import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { CommandIcon, LogOutIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Avatar } from '@/components/avatar'
import { useCommandMenu } from '@/store/command-menu'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { avatarMenu } from './links'

export function AvatarMenu() {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  const onOpenChange = useCommandMenu(s => s.onOpenChange)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setMenuOpen] = useState(false)

  const signOut = useCallback(async () => {
    setMenuOpen(false)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.replace('/login?redirectTo=/dashboard')
    } catch (error) {
      toast.error('Error while logging out, try again later.')
    }
  }, [router, supabase.auth])

  return (
    <DropdownMenu
      align='end'
      trigger={
        <Button className='rounded-full' size='icon' variant='ghost'>
          <Avatar />
        </Button>
      }
      menu={[
        {
          type: 'label',
          label: (
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{session?.user.user_metadata?.full_name ?? 'Default'}</p>
              <p className='text-muted-foreground text-xs leading-none'>{session?.user.email}</p>
            </div>
          ),
        },
        { type: 'separator' },
        {
          type: 'group',
          items: avatarMenu.map(item => ({
            label: item.label,
            shortcut: <item.icon className='size-4' />,
            onClick: () => router.push(item.href),
          })),
        },
        { type: 'separator' },
        {
          type: 'group',
          items: [
            {
              label: 'Command Menu',
              onClick: () => onOpenChange(true),
              shortcut: (
                <span className='flex items-center gap-1'>
                  <span className='flex size-6 items-center justify-center rounded-md border border-neutral-300 bg-neutral-200 p-1 dark:border-neutral-800 dark:bg-neutral-900'>
                    <CommandIcon className='size-4' />
                  </span>
                  <span className='flex size-6 items-center justify-center rounded-md border border-neutral-300 bg-neutral-200 p-1 text-sm dark:border-neutral-800 dark:bg-neutral-900'>
                    K
                  </span>
                </span>
              ),
            },
            {
              className: 'justify-between focus:!bg-transparent',
              label: (
                <>
                  Appearance
                  <Select defaultValue={theme} onValueChange={setTheme}>
                    <SelectTrigger aria-placeholder='Apariencia' className='h-auto w-28 py-1'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='system'>
                        <span className='flex items-center justify-start gap-2 text-xs'>
                          <MonitorIcon className='size-3' />
                          System
                        </span>
                      </SelectItem>
                      <SelectItem value='dark'>
                        <span className='flex items-center justify-start gap-2 text-xs'>
                          <MoonIcon className='size-3' />
                          Dark
                        </span>
                      </SelectItem>
                      <SelectItem value='light'>
                        <span className='flex items-center justify-start gap-2 text-xs'>
                          <SunIcon className='size-3' />
                          Light
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ),
            },
          ],
        },
        { type: 'separator' },
        {
          type: 'group',
          items: [
            {
              label: 'Logout',
              onClick: signOut,
              shortcut: <LogOutIcon className='size-4' />,
            },
          ],
        },
      ]}
      open={isMenuOpen}
      onOpenChange={setMenuOpen}
    />
  )
}

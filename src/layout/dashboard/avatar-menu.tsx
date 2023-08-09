'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { LogOut } from 'iconoir-react'
import { Avatar } from '@/components/avatar'
import { Button } from '@/ui/button'
import { Popover } from '@/ui/popover'
import { avatarMenu } from './links'

export function AvatarMenu() {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
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
    <Popover
      align='end'
      open={isMenuOpen}
      onOpenChange={setMenuOpen}
      className='px-0 sm:w-60 sm:max-w-[12rem]'
      trigger={
        <Button className='rounded-full' size='icon' variant='ghost'>
          <Avatar />
        </Button>
      }
    >
      {session && (
        <div className='px-5 pb-2 text-sm'>
          <h2 className='truncate font-medium'>{session.user.user_metadata?.full_name ?? 'Default'}</h2>
          <p className='truncate text-neutral-500'>{session.user.email}</p>
        </div>
      )}
      <div className='text-sm text-neutral-500'>
        {avatarMenu.map(link => (
          <Link
            key={link.href}
            className='flex items-center gap-2 px-5 py-2 hover:bg-neutral-200/50'
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            <link.icon className='h-5 w-5' />
            <span>{link.label}</span>
          </Link>
        ))}
        <button
          onClick={signOut}
          className='flex w-full items-center gap-2 px-5 py-2 text-left hover:bg-neutral-200/50'
        >
          <LogOut className='h-5 w-5' />
          <span>Log out</span>
        </button>
      </div>
    </Popover>
  )
}

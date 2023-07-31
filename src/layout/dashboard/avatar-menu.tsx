'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { AppWindow, HomeSimple, LogOut } from 'iconoir-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/ui/button'
import { Popover } from '@/ui/popover'
import { Skeleton } from '@/ui/skeleton'

const supabase = createClientComponentClient()

const links = [
  { label: 'Home', href: '/', icon: HomeSimple },
  { label: 'Dashboard', href: '/dashboard', icon: AppWindow },
]

export function AvatarMenu() {
  const router = useRouter()
  const session = useSession()
  const [isMenuOpen, setMenuOpen] = useState(false)

  const signOut = useCallback(async () => {
    setMenuOpen(false)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.replace('/sign-in?redirectTo=/dashboard')
    } catch (error) {
      console.error(error)
    }
  }, [router])

  return (
    <Popover
      align='end'
      open={isMenuOpen}
      onOpenChange={setMenuOpen}
      className='rounded-xl px-0 sm:w-60 sm:max-w-xs'
      trigger={
        <Button className='rounded-full' size='icon' variant='ghost'>
          {!session ? (
            <Skeleton className='h-8 w-8 rounded-full' />
          ) : (
            <Image
              width={32}
              height={32}
              className='h-8 w-8 rounded-full'
              src={session.user.user_metadata.avatar_url}
              alt='Profile'
            />
          )}
        </Button>
      }
    >
      {session && (
        <div className='px-5 pb-2 text-sm'>
          <h2 className='font-medium'>{session.user.user_metadata?.full_name ?? 'Default'}</h2>
          <p className='text-neutral-500'>{session.user.email}</p>
        </div>
      )}
      <div className='text-sm text-neutral-500'>
        {links.map(link => (
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

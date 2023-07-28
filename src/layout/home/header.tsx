'use client'

/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { Logo } from '../../components/Logo'
import { buttonVariants } from '@/ui/button'
import { usePathname } from 'next/navigation'

export function HomeHeader() {
  const router = usePathname()
  const session = useSession()

  return (
    <header className='sticky inset-x-0 top-0 z-30 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg'>
      <div className='mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-20'>
        <Logo />
        <div className='flex gap-2'>
          {session ? (
            <Link href='/dashboard' className={buttonVariants({ size: 'sm' })}>
              Dashboard
            </Link>
          ) : (
            <Link
              className={buttonVariants({ size: 'sm' })}
              href={{ pathname: '/signin', query: { redirectTo: router } }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

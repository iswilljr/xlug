'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IconGithub } from '@/components/icons'
import { IconLogo } from '@/components/Logo'
import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'

const supabase = createClientComponentClient()

export default function SignIn() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') ?? '/'

  const signInWithGithub = useCallback(async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: new URL(redirectTo, window.location.href).toString(),
        },
      })
    } catch (error) {
      console.error(error)
    }
  }, [redirectTo])

  return (
    <section className='w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg'>
      <div className='flex flex-col items-center justify-center space-y-1 bg-white px-6 py-8 text-center sm:px-16'>
        <Link href='/' aria-label='Go to the home page'>
          <IconLogo className='h-10 w-10' />
        </Link>
        <h3 className='text-xl font-bold'>Sign in to Xlug</h3>
        <p className='text-sm text-neutral-500'>Start shorting and managing long URLs.</p>
      </div>
      <Separator />
      <div className='flex flex-col items-center justify-center space-y-2 bg-neutral-50 px-6 py-8 sm:px-16'>
        <Button className='w-full' onClick={signInWithGithub}>
          <IconGithub className='mr-2 h-5 w-5 flex-shrink-0 fill-white' />
          <span>Continue with Github</span>
        </Button>
      </div>
    </section>
  )
}

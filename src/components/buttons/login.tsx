'use client'

import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Button } from '@/ui/button'
import { IconGithub } from '../icons'

export function LoginButtons() {
  const supabase = useSupabaseClient()
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') ?? '/dashboard'

  const loginWithGithub = useCallback(async () => {
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
  }, [redirectTo, supabase.auth])

  return (
    <div className='flex flex-col items-center justify-center space-y-2 border-t border-neutral-300 bg-neutral-50 px-6 py-8 sm:px-16'>
      <Button className='w-full' onClick={loginWithGithub}>
        <IconGithub className='mr-2 h-5 w-5 flex-shrink-0 fill-white' />
        <span>Continue with Github</span>
      </Button>
    </div>
  )
}

'use client'

import { toast } from 'sonner'
import { useCallback } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Button } from '@/ui/button'
import { IconGithub } from '../icons'

interface LoginButtonsProps {
  redirectTo: string
}

export function LoginButtons({ redirectTo }: LoginButtonsProps) {
  const supabase = useSupabaseClient()

  const loginWithGithub = useCallback(async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: new URL(redirectTo, window.location.href).toString(),
        },
      })
    } catch (error) {
      toast.error('Error while loading, try again later.')
    }
  }, [redirectTo, supabase.auth])

  return (
    <div className='flex flex-col items-center justify-center space-y-2 border-t border-neutral-200 bg-neutral-50 px-6 py-8 dark:border-neutral-800 dark:bg-neutral-950 sm:px-16'>
      <Button className='w-full' onClick={loginWithGithub} icon={<IconGithub className='h-5 w-5 flex-shrink-0' />}>
        Continue with Github
      </Button>
    </div>
  )
}

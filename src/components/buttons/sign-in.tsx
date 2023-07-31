import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/ui/button'
import { IconGithub } from '../icons'

const supabase = createClientComponentClient()

export function SignInButtons() {
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
    <div className='flex flex-col items-center justify-center space-y-2 bg-neutral-50 px-6 py-8 sm:px-16'>
      <Button className='w-full' onClick={signInWithGithub}>
        <IconGithub className='mr-2 h-5 w-5 flex-shrink-0 fill-white' />
        <span>Continue with Github</span>
      </Button>
    </div>
  )
}

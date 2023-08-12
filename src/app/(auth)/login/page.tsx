import Link from 'next/link'
import { IconLogo } from '@/components/logo'
import { LoginButtons } from '@/components/auth/login-buttons'
import { generateBaseMetadata } from '@/utils/metadata'
import type { DefaultPageProps } from '@/types/params'

export const metadata = generateBaseMetadata({
  title: 'Sign in to Xlug',
  description: 'Start shorting and managing long URLs.',
})

export default function Login({ searchParams }: DefaultPageProps) {
  const redirectTo: string | null = Array.isArray(searchParams.redirectTo)
    ? searchParams.redirectTo[0]
    : searchParams.redirectTo

  return (
    <section className='w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 shadow-lg dark:border-neutral-800'>
      <div className='flex flex-col items-center justify-center space-y-1 bg-white px-6 py-8 text-center dark:bg-neutral-950 sm:px-16'>
        <Link href='/' aria-label='Go to the home page'>
          <IconLogo className='h-10 w-10' />
        </Link>
        <h3 className='text-xl font-bold'>Sign in to Xlug</h3>
        <p className='text-sm text-neutral-500'>Start shorting and managing long URLs.</p>
      </div>
      <LoginButtons redirectTo={redirectTo ?? '/dashboard'} />
    </section>
  )
}

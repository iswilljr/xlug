import Link from 'next/link'
import { IconLogo } from '@/components/logo'
import { SignInButtons } from '@/components/buttons/sign-in'

export default function SignIn() {
  return (
    <section className='w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg'>
      <div className='flex flex-col items-center justify-center space-y-1 bg-white px-6 py-8 text-center sm:px-16'>
        <Link href='/' aria-label='Go to the home page'>
          <IconLogo className='h-10 w-10' />
        </Link>
        <h3 className='text-xl font-bold'>Sign in to Xlug</h3>
        <p className='text-sm text-neutral-500'>Start shorting and managing long URLs.</p>
      </div>
      <SignInButtons />
    </section>
  )
}

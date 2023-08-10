import { Logo } from '@/components/logo'
import { AuthButton } from '@/components/auth/auth-button'

export function HomeHeader() {
  return (
    <header className='sticky inset-x-0 top-0 z-30 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg'>
      <nav className='mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-20'>
        <Logo />
        <div className='flex gap-2'>
          <AuthButton className='rounded-full' size='sm' href='/dashboard' withLoading />
        </div>
      </nav>
    </header>
  )
}

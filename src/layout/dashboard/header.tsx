import { IconLogo } from '@/components/logo'
import { AvatarMenu } from './avatar-menu'

export function DashboardHeader() {
  return (
    <header className='sticky inset-x-0 top-0 z-30 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg'>
      <div className='mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-20'>
        <IconLogo />
        <div className='flex gap-2'>
          <AvatarMenu />
        </div>
      </div>
    </header>
  )
}

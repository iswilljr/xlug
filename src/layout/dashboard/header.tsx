import { ThemeSwitcher } from '@/components/theme-switcher'
import { AvatarMenu } from './avatar-menu'
import { DashboardHomeLink } from './home'

export function DashboardHeader() {
  return (
    <header className='flex h-14 w-full items-center justify-between px-6'>
      <DashboardHomeLink />
      <div className='flex gap-2'>
        <ThemeSwitcher />
        <AvatarMenu />
      </div>
    </header>
  )
}

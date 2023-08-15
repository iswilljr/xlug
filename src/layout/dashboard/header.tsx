import { cn } from '@/utils/cn'
import { CommandMenu } from '@/components/command-menu'
import { IconGithub } from '@/components/icons'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/ui/button'
import { AvatarMenu } from './avatar-menu'
import { DashboardHomeLink } from './home'

export function DashboardHeader() {
  return (
    <header className='flex h-14 w-full items-center justify-between px-6'>
      <DashboardHomeLink />
      <div className='flex items-center gap-2'>
        <div className='flex items-center'>
          <a
            target='_blank'
            rel='noreferrer'
            href={siteConfig.links.github}
            aria-label='Source code of the project'
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'h-8 w-8')}
          >
            <IconGithub size={24} />
          </a>
          <ThemeSwitcher />
          <CommandMenu />
        </div>
        <AvatarMenu />
      </div>
    </header>
  )
}

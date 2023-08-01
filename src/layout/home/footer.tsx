import { IconGithub } from '@/components/icons'
import { siteConfig } from '@/config/site'

export function HomeFooter() {
  return (
    <footer className='z-30 w-full border-t border-gray-200 bg-white/75'>
      <div className='mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-20'>
        <p className='text-sm text-gray-500'>
          Made by{' '}
          <a
            className='font-bold text-black'
            href={siteConfig.links.profile}
            target='_blank'
            rel='noreferrer'
            aria-label='My github profile'
          >
            iswilljr
          </a>
        </p>
        <a
          className='flex items-end text-neutral-900'
          href={siteConfig.links.github}
          target='_blank'
          rel='noreferrer'
          aria-label='Source code of the project'
        >
          <IconGithub size={24} />
        </a>
      </div>
    </footer>
  )
}

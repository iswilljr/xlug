/* eslint-disable react-hooks/rules-of-hooks */
import { IconGithub } from '@/components/icons'

export function HomeFooter() {
  return (
    <footer className='z-30 w-full border-t border-gray-200 bg-white/75'>
      <div className='mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-20'>
        <p className='text-sm text-gray-500'>
          Made by{' '}
          <a
            className='font-bold text-black'
            href='https://github.com/iswilljr'
            target='_blank'
            rel='noreferrer'
            aria-label='My github profile'
          >
            iswilljr
          </a>
        </p>
        <a
          className='flex items-end text-neutral-900'
          href='https://github.com/iswilljr/xlug'
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
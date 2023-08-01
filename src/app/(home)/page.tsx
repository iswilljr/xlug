import { AuthButton } from '@/components/buttons/auth'
import { IconGithub } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/ui/button'
import { cn } from '@/utils/cn'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <section className='max-w-md text-center md:max-w-lg'>
        <h1 className='text-4xl font-extrabold text-black md:text-6xl'>
          <span className='block'>Fast And Simple</span>
          <span className='block bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>
            URL Shortener
          </span>
        </h1>
        <p className='mt-4 text-neutral-600 md:text-xl'>
          A link shortener tool that allows you to create shorter and more manageable versions of long URLs.
        </p>
        <div className='mt-10 flex items-center justify-center space-x-4'>
          <AuthButton
            href='/dashboard'
            className='rounded-full px-5 shadow-lg'
            authLabel='Get Started'
            loginLabel='Get Started'
          />
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full px-5 shadow-lg')}
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
          >
            <IconGithub className='mr-1' size={20} />
            Star on Github
          </Link>
        </div>
      </section>
    </>
  )
}
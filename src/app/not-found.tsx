import Link from 'next/link'
import { buttonVariants } from '@/ui/button'
import { Error } from '@/components/error'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

export default function NotFound() {
  return (
    <Error
      background='404'
      title='Looks like you are lost!'
      description={
        <span>
          This page does not exists, if you've landed on this page from a link on the website, please{' '}
          <Link href={siteConfig.links.issues} target='_blank' rel='noreferrer' className='font-semibold underline'>
            create an issue
          </Link>
          .
        </span>
      }
    >
      <Link
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'text-black dark:bg-neutral-700 dark:text-white'
        )}
        href='/'
      >
        Go Home
      </Link>
    </Error>
  )
}

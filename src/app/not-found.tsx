import Link from 'next/link'
import { buttonVariants } from '@/ui/button'
import { Error } from '@/components/error'
import { siteConfig } from '@/config/site'

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
      <Link className={buttonVariants({ variant: 'outline', size: 'sm', className: 'text-black' })} href='/'>
        Go Home
      </Link>
    </Error>
  )
}

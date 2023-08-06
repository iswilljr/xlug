import Link from 'next/link'
import { cn } from '@/utils/cn'

export function IconLogo({ className, ...props }: React.DetailsHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('z-10 flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900', className)}
      {...props}
    >
      <svg width='55%' fill='#fff' viewBox='0 0 80 80.005'>
        <path
          xmlns='http://www.w3.org/2000/svg'
          d='M40.807 6.719 30.189 17.338a23.01 23.01 0 0 0 .002 32.476 23.24 23.24 0 0 0 1.636 1.486 4.001 4.001 0 0 0 5.107-6.16c-.395-.329-.75-.65-1.084-.984a14.995 14.995 0 0 1-.002-21.16l10.615-10.617A14.96 14.96 0 0 1 67.62 33.537l-4.552 4.553a4 4 0 0 0 5.658 5.66l4.552-4.554A22.963 22.963 0 0 0 40.807 6.72Z'
        />
        <path
          xmlns='http://www.w3.org/2000/svg'
          d='M48.162 28.741a4.001 4.001 0 0 0-5.017 6.235 12.442 12.442 0 0 1 .986.895 14.979 14.979 0 0 1 0 21.16L33.517 67.647A14.961 14.961 0 1 1 12.36 46.488l4.596-4.597a4 4 0 0 0-5.657-5.66l-4.598 4.6a22.963 22.963 0 0 0 32.474 32.475L49.789 62.69a22.98 22.98 0 0 0 .001-32.477 20.422 20.422 0 0 0-1.628-1.472Z'
        />
      </svg>
    </div>
  )
}

export function Logo() {
  return (
    <Link className='flex items-center justify-center' href='/'>
      <IconLogo />
      <p className='ml-2 text-2xl font-bold'>xlug</p>
    </Link>
  )
}

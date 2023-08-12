'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import { submenu } from './links'

export function DashboardSubmenu() {
  const pathname = usePathname()

  return (
    <nav className='h-12 px-6'>
      <ul className='flex h-full w-full items-center text-sm'>
        {submenu.map(link => (
          <li key={link.href} className='h-full'>
            <Link
              href={link.href}
              className={cn(
                "group relative flex h-full items-center text-neutral-500 before:absolute before:inset-x-2 before:bottom-0 before:h-0 before:border-b-2 before:border-transparent before:transition-colors before:content-[''] hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                pathname === link.href &&
                  'text-neutral-900 before:border-neutral-800 dark:text-neutral-100 dark:before:border-neutral-100'
              )}
            >
              <span className='rounded-lg px-3 py-[6px] transition-colors duration-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800'>
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

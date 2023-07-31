'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLogo } from '@/components/logo'
import { submenu } from './links'
import { useMemo } from 'react'

export function DashboardHomeLink() {
  const pathname = usePathname()

  const label = useMemo(() => {
    if (pathname === '/dashboard') return 'Dashboard'

    return submenu.find(link => link.href === pathname)?.label ?? 'Dashboard'
  }, [pathname])

  return (
    <Link className='flex items-center justify-center gap-2' href='/'>
      <IconLogo />
      <p className='py-[6px] text-sm font-semibold'>{label}</p>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { buttonVariants } from '@/ui/button'
import { cn } from '@/utils/cn'
import type { VariantProps } from 'class-variance-authority'

interface AuthButtonProps extends React.ComponentProps<typeof Link>, VariantProps<typeof buttonVariants> {
  loginLabel?: string
  authLabel?: string
  withLoading?: boolean
}

export function AuthButton({
  authLabel = 'Dashboard',
  children,
  className,
  href,
  loginLabel = 'Sign In',
  size,
  variant,
  withLoading,
  ...props
}: AuthButtonProps) {
  const pathname = usePathname()
  const { session, isLoading } = useSessionContext()

  const link = useMemo(() => {
    if (session) return href

    return {
      pathname: '/login',
      query: pathname !== '/' ? { redirectTo: pathname } : null,
    }
  }, [href, pathname, session])

  return (
    <Link
      aria-busy={withLoading && isLoading}
      href={link}
      className={cn(
        buttonVariants({ size, variant }),
        withLoading && 'duration-300',
        withLoading && isLoading && 'pointer-events-none opacity-0',
        withLoading && !isLoading && 'pointer-events-auto opacity-100 animate-in zoom-in-75',
        className
      )}
      {...props}
    >
      {session ? authLabel : loginLabel}
    </Link>
  )
}

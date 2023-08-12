'use client'

import Image from 'next/image'
import { Skeleton } from '@/ui/skeleton'
import { useSession } from '@supabase/auth-helpers-react'
import { cn } from '@/utils/cn'

interface AvatarProps {
  className?: string
}

export function Avatar({ className }: AvatarProps) {
  const session = useSession()

  return (
    <>
      {!session ? (
        <Skeleton className={cn('h-8 w-8 rounded-full', className)} />
      ) : (
        <Image
          width={32}
          height={32}
          className={cn('h-8 w-8 rounded-full', className)}
          src={session.user.user_metadata.avatar_url}
          alt='Profile'
        />
      )}
    </>
  )
}

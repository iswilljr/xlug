'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { generateHostIconFromUrl } from '@/utils/links'
import { formatDateToNow } from '@/utils/dates'
import { ModalContent } from '@/ui/modal'
import { Separator } from '@/ui/separator'
import type { LinkRow } from '@/types/tables'

export interface QRCodeDialogProps {
  link: Omit<LinkRow, 'id' | 'userId'>
}

export function ExpandedLinkDialog({ link }: QRCodeDialogProps) {
  const data = useMemo(
    () => ({
      timeAgo: formatDateToNow(link.createdAt),
      logo: generateHostIconFromUrl(link.destination),
      dateTime: new Date(link.createdAt).toISOString(),
    }),
    [link]
  )

  return (
    <ModalContent withCloseButton={false}>
      <div className='w-full min-w-0 items-center p-4 text-center dark:bg-neutral-900/50'>
        <Image alt={link.key} src={data.logo} width={40} height={40} className='mx-auto h-10 w-10 rounded-full' />
        <h2 className='line-clamp-1 break-all text-lg font-semibold'>{link.key}</h2>
        <p className='line-clamp-1 break-all text-sm text-neutral-600 dark:text-neutral-400'>{link.destination}</p>
        <p className='text-xs tracking-tight text-neutral-500 dark:text-neutral-400/75'>
          <time dateTime={data.dateTime}>{data.timeAgo}</time>
        </p>
      </div>
      <Separator />
      <div className='bg-neutral-50 p-4 dark:bg-neutral-950'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {link.description ?? 'No description provided.'}
        </p>
      </div>
    </ModalContent>
  )
}

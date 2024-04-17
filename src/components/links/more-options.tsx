'use client'

import { toast } from 'sonner'
import { useCallback } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { CopyIcon, PenLineIcon, ExpandIcon, MoreVerticalIcon, QrCodeIcon, BarChartIcon, TrashIcon } from 'lucide-react'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { pushModal } from '../dialogs'
import type { LinkRow } from '@/types/tables'

export interface LinkMoreOptionsButtonProps {
  link: LinkRow
}

export function LinkMoreOptionsButton({ link }: LinkMoreOptionsButtonProps) {
  const clipboard = useClipboard()

  const copyAction = useCallback(() => {
    try {
      if (!clipboard.isSupported()) throw Error('Clipboard not supported')

      clipboard.copy(generateShortLink(link.key))
      toast.success('Short Link Copied')
    } catch (error) {
      toast.error('Your browser does not support copying values')
    }
  }, [clipboard, link.key])

  return (
    <DropdownMenu
      align='end'
      items={[
        {
          label: 'Edit',
          icon: <PenLineIcon className='h-4 w-4' />,
          onClick: () => pushModal('UpdateLink', { link }),
        },
        {
          label: 'Expand',
          icon: <ExpandIcon className='h-4 w-4' />,
          onClick: () => pushModal('ExpandedLink', { link }),
        },
        {
          label: 'Stats',
          icon: <BarChartIcon className='h-4 w-4' />,
          shortcut: <p className='rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white'>New</p>,
          onClick: () => pushModal('LinkStats', { link }),
        },
        {
          label: 'Copy',
          icon: <CopyIcon className='h-4 w-4' />,
          onClick: copyAction,
        },
        {
          label: 'Qr Code',
          icon: <QrCodeIcon className='h-4 w-4' />,
          onClick: () => pushModal('QRCode', { link }),
        },
        {
          label: 'Delete',
          icon: <TrashIcon className='h-4 w-4' />,
          className: 'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
          onClick: () => pushModal('DeleteLink', { link }),
        },
      ]}
      trigger={
        <Button size='icon' variant='ghost' aria-label='Open more options menu' className='size-auto p-1'>
          <MoreVerticalIcon className='h-5 w-5' />
        </Button>
      }
    />
  )
}

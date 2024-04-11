'use client'

import useLocalStorage from 'use-local-storage-state'
import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { CopyIcon, ExpandIcon, MoreVerticalIcon, QrCodeIcon, BarChartIcon, TrashIcon } from 'lucide-react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import { ExpandedLinkDialog } from '../dialogs/expanded-link-dialog'
import { LinkStatsDialog } from '../dialogs/link-stats-dialog'
import type { LinkRow } from '@/types/tables'

export interface PublicLinkMoreOptionsButtonProps {
  link: LinkRow
  disableStatsOption?: boolean
  disableDeleteOption?: boolean
}

export function PublicLinkMoreOptionsButton({
  link,
  disableDeleteOption = true,
  disableStatsOption = true,
}: PublicLinkMoreOptionsButtonProps) {
  const [, setLinks] = useLocalStorage<LinkRow[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    storageSync: false,
  })
  const [isExpandDialogOpen, setExpandDialogOpen] = useState(false)
  const [isStatsDialogOpen, setStatsDialogOpen] = useState(false)
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
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

  const deleteAction = useCallback(() => {
    setLinks(prev => prev.filter(storeLink => storeLink.key !== link.key))
  }, [link.key, setLinks])

  return (
    <>
      <DropdownMenu
        align='end'
        items={[
          {
            label: 'Expand',
            icon: <ExpandIcon className='h-4 w-4' />,
            onClick: () => setExpandDialogOpen(true),
          },
          {
            label: 'Stats',
            disabled: disableStatsOption,
            icon: <BarChartIcon className='h-4 w-4' />,
            shortcut: <p className='rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white'>New</p>,
            onClick: () => setStatsDialogOpen(true),
          },
          {
            label: 'Copy',
            icon: <CopyIcon className='h-4 w-4' />,
            onClick: copyAction,
          },
          {
            label: 'Qr Code',
            icon: <QrCodeIcon className='h-4 w-4' />,
            onClick: () => setQRCodeDialogOpen(true),
          },
          {
            label: 'Delete',
            disabled: disableDeleteOption,
            icon: <TrashIcon className='h-4 w-4' />,
            className:
              'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
            onClick: deleteAction,
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVerticalIcon className='h-5 w-5' />
          </Button>
        }
      />
      <QRCodeDialog open={isQRCodeDialogOpen} onOpenChange={setQRCodeDialogOpen} link={link} />
      <ExpandedLinkDialog open={isExpandDialogOpen} onOpenChange={setExpandDialogOpen} link={link} />
      <LinkStatsDialog open={isStatsDialogOpen} onOpenChange={setStatsDialogOpen} link={link} />
    </>
  )
}

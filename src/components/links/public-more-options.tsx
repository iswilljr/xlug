'use client'

import useLocalStorage from 'use-local-storage-state'
import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { Copy, Expand, MoreVert, QrCode, Trash } from 'iconoir-react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import { ExpandedLinkDialog } from '../dialogs/expanded-link-dialog'
import type { LinkRow } from '@/types/tables'

export interface PublicLinkMoreOptionsButtonProps {
  link: LinkRow
  withDeleteOption?: boolean
}

export function PublicLinkMoreOptionsButton({ link, withDeleteOption = true }: PublicLinkMoreOptionsButtonProps) {
  const [, setLinks] = useLocalStorage<LinkRow[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    storageSync: false,
  })
  const [isExpandDialogOpen, setExpandDialogOpen] = useState(false)
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
            icon: <Expand className='h-4 w-4' />,
            onClick: () => setExpandDialogOpen(true),
          },
          {
            label: 'Copy',
            icon: <Copy className='h-4 w-4' />,
            onClick: copyAction,
          },
          {
            label: 'Qr Code',
            icon: <QrCode className='h-4 w-4' />,
            onClick: () => setQRCodeDialogOpen(true),
          },
          {
            label: 'Delete',
            disabled: !withDeleteOption,
            icon: <Trash className='h-4 w-4' />,
            className:
              'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
            onClick: deleteAction,
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVert className='h-5 w-5' />
          </Button>
        }
      />
      <QRCodeDialog open={isQRCodeDialogOpen} onOpenChange={setQRCodeDialogOpen} link={link} />
      <ExpandedLinkDialog open={isExpandDialogOpen} onOpenChange={setExpandDialogOpen} link={link} />
    </>
  )
}

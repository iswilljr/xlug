'use client'

import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { Copy, Edit, Expand, MoreVert, QrCode, Reports, Trash } from 'iconoir-react'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { UpdateLinkDialog } from '../dialogs/update-link-dialog'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import { DeleteLinkDialog } from '../dialogs/delete-link-dialog'
import { ExpandedLinkDialog } from '../dialogs/expanded-link-dialog'
import { LinkStatsDialog } from '../dialogs/link-stats-dialog'
import type { LinkRow } from '@/types/tables'

export interface LinkMoreOptionsButtonProps {
  link: LinkRow
}

export function LinkMoreOptionsButton({ link }: LinkMoreOptionsButtonProps) {
  const [updateOpen, setUpdateOpen] = useState(false)
  const [expandOpen, setExpandOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [qrCodeOpen, setQRCodeOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
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
    <>
      <DropdownMenu
        align='end'
        items={[
          {
            label: 'Edit',
            icon: <Edit className='h-4 w-4' />,
            onClick: () => setUpdateOpen(true),
          },
          {
            label: 'Expand',
            icon: <Expand className='h-4 w-4' />,
            onClick: () => setExpandOpen(true),
          },
          {
            label: 'Stats',
            icon: <Reports className='h-4 w-4' />,
            shortcut: <p className='rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white'>New</p>,
            onClick: () => setStatsOpen(true),
          },
          {
            label: 'Copy',
            icon: <Copy className='h-4 w-4' />,
            onClick: copyAction,
          },
          {
            label: 'Qr Code',
            icon: <QrCode className='h-4 w-4' />,
            onClick: () => setQRCodeOpen(true),
          },
          {
            label: 'Delete',
            icon: <Trash className='h-4 w-4' />,
            className:
              'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
            onClick: () => setDeleteOpen(true),
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVert className='h-5 w-5' />
          </Button>
        }
      />
      {updateOpen && <UpdateLinkDialog open={updateOpen} onOpenChange={setUpdateOpen} link={link} />}
      {expandOpen && <ExpandedLinkDialog open={expandOpen} onOpenChange={setExpandOpen} link={link} />}
      {statsOpen && <LinkStatsDialog open={statsOpen} onOpenChange={setStatsOpen} link={link} />}
      {qrCodeOpen && <QRCodeDialog open={qrCodeOpen} onOpenChange={setQRCodeOpen} link={link} />}
      {deleteOpen && <DeleteLinkDialog open={deleteOpen} onOpenChange={setDeleteOpen} link={link} />}
    </>
  )
}

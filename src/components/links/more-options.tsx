'use client'

import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { Copy, Edit, Expand, MoreVert, QrCode, Trash } from 'iconoir-react'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { UpdateLinkDialog } from '../dialogs/update-link-dialog'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import { DeleteLinkDialog } from '../dialogs/delete-link-dialog'
import { ExpandedLinkDialog } from '../dialogs/expanded-link-dialog'
import type { LinkRow } from '@/types/tables'

export interface LinkMoreOptionsButtonProps {
  initialValues: Omit<LinkRow, 'id' | 'userId'>
}

export function LinkMoreOptionsButton({ initialValues }: LinkMoreOptionsButtonProps) {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [isExpandDialogOpen, setExpandDialogOpen] = useState(false)
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const clipboard = useClipboard()

  const copyAction = useCallback(() => {
    try {
      if (!clipboard.isSupported()) throw Error('Clipboard not supported')

      clipboard.copy(generateShortLink(initialValues.key))
      toast.success('Short Link Copied')
    } catch (error) {
      toast.error('Your browser does not support copying values')
    }
  }, [clipboard, initialValues.key])

  return (
    <>
      <DropdownMenu
        align='end'
        items={[
          {
            label: 'Edit',
            icon: <Edit className='h-4 w-4' />,
            onClick: () => setUpdateDialogOpen(true),
          },
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
            icon: <Trash className='h-4 w-4' />,
            className:
              'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
            onClick: () => setDeleteDialogOpen(true),
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVert className='h-5 w-5' />
          </Button>
        }
      />
      {isUpdateDialogOpen && (
        <UpdateLinkDialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen} initialValues={initialValues} />
      )}
      {isExpandDialogOpen && (
        <ExpandedLinkDialog open={isExpandDialogOpen} onOpenChange={setExpandDialogOpen} link={initialValues} />
      )}
      {isQRCodeDialogOpen && (
        <QRCodeDialog open={isQRCodeDialogOpen} onOpenChange={setQRCodeDialogOpen} link={initialValues} />
      )}
      {isDeleteDialogOpen && (
        <DeleteLinkDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen} link={initialValues} />
      )}
    </>
  )
}

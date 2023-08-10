'use client'

import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { Copy, Edit, MoreVert, QrCode, Trash } from 'iconoir-react'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { UpdateLinkDialog } from '../dialogs/update-link-dialog'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import { DeleteLinkDialog } from '../dialogs/delete-link-dialog'
import type { Link } from '@/utils/schemas'

export interface LinkMoreOptionsButtonProps {
  initialValues: Link
  isPublicLink?: boolean
  onDelete?: () => void
}

export function LinkMoreOptionsButton({ initialValues, isPublicLink, onDelete }: LinkMoreOptionsButtonProps) {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false)
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

  const deleteAction = useCallback(() => {
    if (isPublicLink) {
      return onDelete?.()
    }

    setDeleteDialogOpen(true)
  }, [isPublicLink, onDelete])

  return (
    <>
      <DropdownMenu
        align='end'
        classNames={{ item: 'text-neutral-500 focus:text-neutral-700' }}
        items={[
          {
            label: 'Edit',
            disabled: isPublicLink,
            icon: <Edit className='h-4 w-4' />,
            onClick: () => setUpdateDialogOpen(true),
          },
          {
            label: 'Copy Link',
            icon: <Copy className='h-4 w-4' />,
            onClick: copyAction,
          },
          {
            label: 'Qr Code',
            icon: <QrCode className='h-4 w-4' />,
            onClick: () => setQRCodeDialogOpen(true),
          },
          ...(isPublicLink && !onDelete
            ? []
            : [
                {
                  label: 'Delete',
                  icon: <Trash className='h-4 w-4' />,
                  className: 'text-red-500 focus:text-red-500',
                  onClick: deleteAction,
                },
              ]),
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
      {isQRCodeDialogOpen && (
        <QRCodeDialog open={isQRCodeDialogOpen} onOpenChange={setQRCodeDialogOpen} link={initialValues} />
      )}
      {isDeleteDialogOpen && (
        <DeleteLinkDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen} link={initialValues} />
      )}
    </>
  )
}

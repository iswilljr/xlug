'use client'

import { useCallback, useMemo, useState } from 'react'
import { Edit, MoreVert, MultiMacOsWindow, QrCode, Trash } from 'iconoir-react'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { CreateLinkDialog } from '../dialogs/create-link-dialog'
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
  const [isNewDialogOpen, setNewDialogOpen] = useState(false)
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const newLinkValues = useMemo(() => ({ ...initialValues, key: `new-${initialValues.key}` }), [initialValues])

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
            label: 'Duplicate',
            disabled: isPublicLink,
            icon: <MultiMacOsWindow className='h-4 w-4' />,
            onClick: () => setNewDialogOpen(true),
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
      {isNewDialogOpen && (
        <CreateLinkDialog open={isNewDialogOpen} onOpenChange={setNewDialogOpen} initialValues={newLinkValues} />
      )}
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

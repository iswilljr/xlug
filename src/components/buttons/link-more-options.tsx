'use client'

import { useMemo, useState } from 'react'
import { Edit, MoreVert, MultiMacOsWindow, QrCode, Trash } from 'iconoir-react'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { CreateLinkForm } from '../forms/create-link'
import { DeleteLinkDialog } from '../dialogs/delete-link'
import { QRCodeDialog } from '../dialogs/qr-code'
import { UpdateLinkForm } from '../forms/update-link'
import type { Link } from '@/utils/schemas'

interface LinkMoreOptionsButtonProps {
  initialValues: Link
}

export function LinkMoreOptionsButton({ initialValues }: LinkMoreOptionsButtonProps) {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [isNewDialogOpen, setNewDialogOpen] = useState(false)
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const newLinkValues = useMemo(() => ({ ...initialValues, key: `new-${initialValues.key}` }), [initialValues])

  return (
    <>
      <DropdownMenu
        align='end'
        classNames={{ item: 'text-neutral-500 focus:text-neutral-700' }}
        items={[
          {
            label: 'Edit',
            icon: <Edit className='h-4 w-4' />,
            onClick: () => setUpdateDialogOpen(true),
          },
          {
            label: 'Duplicate',
            icon: <MultiMacOsWindow className='h-4 w-4' />,
            onClick: () => setNewDialogOpen(true),
          },
          {
            label: 'Qr Code',
            icon: <QrCode className='h-4 w-4' />,
            onClick: () => setQRCodeDialogOpen(true),
          },
          {
            label: 'Delete',
            icon: <Trash className='h-4 w-4' />,
            className: 'text-red-500 focus:text-red-500',
            onClick: () => setDeleteDialogOpen(true),
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVert className='h-5 w-5' />
          </Button>
        }
      />
      {isNewDialogOpen && (
        <CreateLinkForm open={isNewDialogOpen} onOpenChange={setNewDialogOpen} initialValues={newLinkValues} />
      )}
      {isUpdateDialogOpen && (
        <UpdateLinkForm open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen} initialValues={initialValues} />
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

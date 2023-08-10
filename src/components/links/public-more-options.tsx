'use client'

import useLocalStorage from 'use-local-storage-state'
import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { Copy, MoreVert, QrCode, Trash } from 'iconoir-react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { QRCodeDialog } from '../dialogs/qr-code-dialog'
import type { Link } from '@/utils/schemas'

export interface PublicLinkMoreOptionsButtonProps {
  initialValues: Link
  withDeleteOption?: boolean
}

export function PublicLinkMoreOptionsButton({
  initialValues,
  withDeleteOption = true,
}: PublicLinkMoreOptionsButtonProps) {
  const [, setLinks] = useLocalStorage<Link[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    storageSync: false,
  })
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
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
    setLinks(prev => prev.filter(link => link.key !== initialValues.key))
  }, [initialValues.key, setLinks])

  return (
    <>
      <DropdownMenu
        align='end'
        classNames={{ item: 'text-neutral-500 focus:text-neutral-700' }}
        items={[
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
          ...(withDeleteOption
            ? [
                {
                  label: 'Delete',
                  icon: <Trash className='h-4 w-4' />,
                  className: 'text-red-500 focus:text-red-500',
                  onClick: deleteAction,
                },
              ]
            : []),
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
            <MoreVert className='h-5 w-5' />
          </Button>
        }
      />
      <QRCodeDialog open={isQRCodeDialogOpen} onOpenChange={setQRCodeDialogOpen} link={initialValues} />
    </>
  )
}

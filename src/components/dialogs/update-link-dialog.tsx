'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { CreateLinkDialogBase } from './_base/create-link-dialog-base'
import type { Link } from '@/utils/schemas'

export interface UpdateLinkDialogProps {
  link: Link
  open?: boolean
  trigger?: React.ReactNode
  onOpenChange?: (value: boolean) => void
}

export function UpdateLinkDialog({ link, open, trigger, onOpenChange }: UpdateLinkDialogProps) {
  const { modalOpen, onModalOpenChange } = useWithinDrawer({ open, onOpenChange })
  const { trigger: update } = useSWRMutate('update-link', (_key, { arg }: { arg: Link }) =>
    axios.patch(`/api/link/${link.key}`, arg)
  )

  const updateLink = useCallback(
    async (data: Link) => {
      await update(data)
      await mutate(LINKS_DATA_KEY)
      toast.success('Link updated successfully.')
    },
    [update]
  )

  return (
    <CreateLinkDialogBase
      trigger={trigger}
      open={modalOpen}
      onSubmit={updateLink}
      actionLabel='Save Changes'
      initialValues={link}
      title='Update your short link'
      onOpenChange={onModalOpenChange}
    />
  )
}

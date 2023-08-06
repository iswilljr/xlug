'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { useWithinDrawer } from '@/hooks/use-within-drawer'
import { CreateLinkDialog } from '../dialogs/create-link'
import type { Link } from '@/utils/schemas'

interface CreateLinkFormProps {
  initialValues: Link
  open?: boolean
  trigger?: React.ReactNode
  onOpenChange?: (value: boolean) => void
}

export function UpdateLinkForm({ initialValues, open, trigger, onOpenChange }: CreateLinkFormProps) {
  const { modalOpen, onModalOpenChange } = useWithinDrawer({ open, onOpenChange })
  const { trigger: update } = useSWRMutate('update-link', (_key, { arg }: { arg: Link }) =>
    axios.patch(`/api/link/${initialValues.key}`, arg)
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
    <CreateLinkDialog
      trigger={trigger}
      open={modalOpen}
      onSubmit={updateLink}
      actionLabel='Save Changes'
      initialValues={initialValues}
      title='Update your short link'
      onOpenChange={onModalOpenChange}
    />
  )
}

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

interface CreateLinkDialogProps {
  initialValues?: Link
  open?: boolean
  trigger?: React.ReactNode
  onOpenChange?: (value: boolean) => void
}

export function CreateLinkDialog({ initialValues, open, trigger, onOpenChange }: CreateLinkDialogProps) {
  const { modalOpen, onModalOpenChange } = useWithinDrawer({ open, onOpenChange })
  const { trigger: create } = useSWRMutate('create-link', (_key, { arg }: { arg: Link }) =>
    axios.post(`/api/link/${arg.key}`, arg)
  )

  const createLink = useCallback(
    async (data: Link) => {
      await create(data)
      await mutate(LINKS_DATA_KEY)
      toast.success('Link created successfully.')
    },
    [create]
  )

  return (
    <CreateLinkDialogBase
      trigger={trigger}
      open={modalOpen}
      onSubmit={createLink}
      onOpenChange={onModalOpenChange}
      initialValues={initialValues}
    />
  )
}

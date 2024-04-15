'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { CreateLinkDialogBase } from './_base/create-link-dialog-base'
import type { Link } from '@/utils/schemas'

export interface UpdateLinkDialogProps {
  link: Link
}

export function UpdateLinkDialog({ link }: UpdateLinkDialogProps) {
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
      onSubmit={updateLink}
      actionLabel='Save Changes'
      initialValues={link}
      title='Update your short link'
    />
  )
}

'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { CreateLinkDialogBase } from './_base/create-link-dialog-base'
import type { Link } from '@/utils/schemas'

export function CreateLinkDialog() {
  const { trigger: create } = useSWRMutate('create-link', (_key, { arg }: { arg: Link }) =>
    axios.post(`/api/link/${arg.key}`, arg)
  )

  const createLink = useCallback(
    async (data: Link) => {
      await create(data)
      await mutate('/api/links')
      toast.success('Link created successfully.')
    },
    [create]
  )

  return <CreateLinkDialogBase onSubmit={createLink} />
}

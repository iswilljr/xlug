'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { Button } from '@/ui/button'
import { LinkFormDialog } from '../dialogs/link-form'
import type { Link } from '@/utils/schemas'

export function CreateLinkForm() {
  const { trigger: createLink } = useSWRMutate('create-link', (_key, { arg }: { arg: Link }) =>
    axios.post(`/api/link/${arg.key}`, arg)
  )

  return <LinkFormDialog onSubmit={createLink} trigger={<Button>Create Link</Button>} />
}

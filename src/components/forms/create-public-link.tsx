'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import useLocalStorage from 'use-local-storage-state'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { Link as IconLink, Send } from 'iconoir-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { type Link, LinkSchema, RandomKey } from '@/utils/schemas'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'

export function CreatePublicLinkForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [links, setLinks] = useLocalStorage<Link[]>(LINKS_DATA_KEY, { defaultValue: [] })
  const hasReachedMaxPublicLinks = useMemo(() => links.length >= MAX_PUBLIC_LINKS, [links])
  const { trigger: create } = useSWRMutate('create-public-link', (_key, { arg }: { arg: Link }) =>
    axios.post(`/api/link/${arg.key}?public=true`, arg)
  )

  const createLink = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!inputRef.current || hasReachedMaxPublicLinks || isSubmitting) return

      setSubmitting(true)

      try {
        const values = LinkSchema.parse({
          description: '',
          key: RandomKey(),
          destination: inputRef.current.value,
        })

        await create(values)

        setLinks(prev => [...(prev ?? []), values])

        inputRef.current.value = ''

        toast.success('Link created successfully.')
      } catch (error) {
        const message = error instanceof ZodError ? error.errors[0].message : "Couldn't create link."
        toast.error(message)
      } finally {
        setSubmitting(false)
      }
    },
    [create, hasReachedMaxPublicLinks, isSubmitting, setLinks]
  )

  return (
    <form onSubmit={createLink}>
      <Input
        required
        type='url'
        ref={inputRef}
        icon={IconLink}
        name='destination'
        className='shadow-md dark:bg-neutral-900'
        placeholder='Shorten your link'
        disabled={hasReachedMaxPublicLinks}
        rightSection={
          <Button
            loading={isSubmitting}
            disabled={hasReachedMaxPublicLinks}
            size='icon'
            variant='outline'
            className='h-7 w-7 dark:bg-neutral-800 dark:hover:bg-neutral-700/90'
            icon={<Send className='h-4 w-4' />}
          />
        }
      />
    </form>
  )
}

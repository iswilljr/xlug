'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import useLocalStorage from 'use-local-storage-state'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { SendHorizonalIcon } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { DestinationSchema } from '@/utils/schemas'
import { LINKS_DATA_KEY, MAX_PUBLIC_LINKS } from '@/config/constants'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import type { LinkRow } from '@/types/tables'
import { useTimeAgo } from '@/hooks/use-time-ago'

const LinkIcon = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='none'
    strokeWidth={2}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14 11.998C14 9.506 11.683 7 8.857 7H7.143C4.303 7 2 9.238 2 11.998c0 2.378 1.71 4.368 4 4.873a5.3 5.3 0 0 0 1.143.124'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10 11.998c0 2.491 2.317 4.997 5.143 4.997h1.714c2.84 0 5.143-2.237 5.143-4.997 0-2.379-1.71-4.37-4-4.874A5.304 5.304 0 0 0 16.857 7'
    />
  </svg>
)

export function CreatePublicLinkForm() {
  const timeAgo = useTimeAgo(new Date('2024-04-21T19:44:11.798Z'))
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [links, setLinks] = useLocalStorage<LinkRow[]>(LINKS_DATA_KEY, { defaultValue: [] })
  const hasReachedMaxPublicLinks = useMemo(() => links.length >= MAX_PUBLIC_LINKS, [links])
  const { trigger: create } = useSWRMutate(
    'create-public-link',
    (_key, { arg }: { arg: Pick<LinkRow, 'destination'> }) => axios.post<LinkRow>(`/api/link`, arg)
  )

  const createLink = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!inputRef.current || hasReachedMaxPublicLinks || isSubmitting) return

      setSubmitting(true)

      try {
        const destination = DestinationSchema.parse(inputRef.current.value)

        const link = await create({ destination })

        setLinks(prev => [...(prev ?? []), link.data])

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
        icon={LinkIcon}
        name='destination'
        className='h-auto py-2 pr-20 shadow-md dark:bg-neutral-900'
        placeholder={`Shorten your link ${timeAgo}`}
        disabled={hasReachedMaxPublicLinks}
        rightSection={
          <Button
            loading={isSubmitting}
            disabled={hasReachedMaxPublicLinks}
            size='icon'
            variant='outline'
            aria-label='Create public link'
            className='h-7 w-7 bg-transparent text-neutral-400 hover:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:border-neutral-50'
            icon={<SendHorizonalIcon className='h-4 w-4' />}
          />
        }
      />
    </form>
  )
}

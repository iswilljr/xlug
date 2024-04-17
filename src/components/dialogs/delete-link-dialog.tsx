'use client'

import axios from 'redaxios'
import Image from 'next/image'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/button'
import { Form } from '@/ui/form'
import { Separator } from '@/ui/separator'
import { ModalContent } from '@/ui/modal'
import { popAllModals } from '@/components/dialogs'
import { LINKS_DATA_KEY } from '@/config/constants'
import { generateHostIconFromUrl } from '@/utils/links'
import type { Link } from '@/utils/schemas'

export interface DeleteLinkDialogProps {
  link: Link
}

export function DeleteLinkDialog({ link }: DeleteLinkDialogProps) {
  const { trigger: triggerDelete } = useSWRMutate('delete-link', key => axios.delete(`/api/link/${link.key}`))
  const [isSubmitting, setSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const form = useForm({
    defaultValues: {
      verification: '',
    },
  })

  const deleteLink = useCallback(async () => {
    if (isSubmittingRef.current) return

    setSubmitting(true)
    isSubmittingRef.current = true

    try {
      await triggerDelete()
      await mutate(LINKS_DATA_KEY)
      toast.success('Link deleted successfully.')
      popAllModals()
    } catch (error) {
      toast.error("Couldn't delete link.")
    } finally {
      setSubmitting(false)
      isSubmittingRef.current = false
    }
  }, [triggerDelete])

  const data = useMemo(
    () => ({ pattern: new RegExp(`^${link.key}$`), logo: generateHostIconFromUrl(link.destination) }),
    [link.key, link.destination]
  )

  return (
    <ModalContent withCloseButton={false}>
      <div className='dark:bg-neutral-900/50'>
        <div className='mx-auto max-w-xs p-8 text-center sm:max-w-sm'>
          <Image src={data.logo} alt={link.key} width={40} height={40} className='mx-auto h-10 w-10 rounded-full' />
          <h3 className='mx-auto max-w-[80%] truncate text-lg font-medium'>{`Delete ${link.key}`}</h3>
          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
            The link will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
      <Separator />
      <Form
        form={form}
        onSubmit={form.handleSubmit(deleteLink)}
        className='space-y-4 bg-neutral-50 p-8 dark:bg-neutral-950'
      >
        <Form.Input
          required
          pattern={link.key}
          name='verification'
          control={form.control}
          label={
            <span className='text-neutral-700 dark:text-neutral-400'>
              To confirm, type{' '}
              <strong className='break-all font-bold text-neutral-900 dark:text-neutral-200'>{link.key}</strong> below
            </span>
          }
        />
        <Button className='w-full' loading={isSubmitting} type='submit' variant='destructive'>
          Confirm delete
        </Button>
      </Form>
    </ModalContent>
  )
}

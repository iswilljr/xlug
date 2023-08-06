import axios from 'redaxios'
import Image from 'next/image'
import useSWRMutate from 'swr/mutation'
import { mutate } from 'swr'
import { toast } from 'sonner'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { Form } from '@/ui/form'
import { Separator } from '@/ui/separator'
import { LINKS_DATA_KEY } from '@/config/constants'
import { generateHostIconFromUrl } from '@/utils/links'
import type { Link } from '@/utils/schemas'

export interface DeleteLinkDialogProps {
  open: boolean
  link: Link
  trigger?: React.ReactNode
  onOpenChange: (value: boolean) => void
}

export function DeleteLinkDialog({ open, link, trigger, onOpenChange }: DeleteLinkDialogProps) {
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
      onOpenChange(false)
    } catch (error) {
      toast.error("Couldn't delete link.")
    } finally {
      setSubmitting(false)
      isSubmittingRef.current = false
    }
  }, [onOpenChange, triggerDelete])

  const data = useMemo(
    () => ({ pattern: new RegExp(`^${link.key}$`), logo: generateHostIconFromUrl(link.destination) }),
    [link.key, link.destination]
  )

  return (
    <Dialog
      open={open}
      trigger={trigger}
      withCloseButton={false}
      onOpenChange={onOpenChange}
      className='overflow-hidden p-0 pt-2 sm:max-w-sm sm:pt-0'
    >
      <div className='mx-auto max-w-xs p-8 text-center sm:max-w-sm'>
        <Image src={data.logo} alt={link.key} width={40} height={40} className='mx-auto h-10 w-10 rounded-full' />
        <h3 className='mx-auto max-w-[80%] truncate text-lg font-medium'>{`Delete ${link.key}`}</h3>
        <p className='text-sm text-neutral-500'>The link will be permanently removed. This action cannot be undone.</p>
      </div>
      <Separator />
      <Form form={form} onSubmit={form.handleSubmit(deleteLink)} className='space-y-4 bg-neutral-50 p-8'>
        <Form.Input
          required
          pattern={link.key}
          name='verification'
          control={form.control}
          classNames={{ label: 'text-neutral-700' }}
          label={
            <>
              To confirm, type <span className='break-all font-semibold text-neutral-900'>{link.key}</span> below
            </>
          }
        />
        <Button className='w-full' loading={isSubmitting} type='submit' variant='destructive'>
          Confirm delete
        </Button>
      </Form>
    </Dialog>
  )
}

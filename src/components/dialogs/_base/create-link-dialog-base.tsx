'use client'

import axios from 'redaxios'
import { toast } from 'sonner'
import { Shuffle } from 'iconoir-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { Form } from '@/ui/form'
import { Separator } from '@/ui/separator'
import { Textarea } from '@/ui/textarea'
import { siteConfig } from '@/config/site'
import { validateLinkKey } from '@/utils/links'
import { type Link, LinkSchema, RandomKey } from '@/utils/schemas'
import { useDebounce } from '@/hooks/use-debounce'
import { IconLogo } from '../../logo'

export interface CreateLinkDialogBaseProps {
  actionLabel?: string
  initialValues?: Link
  open: boolean
  title?: string
  trigger?: React.ReactNode
  onOpenChange: (value: boolean) => void
  onSubmit: (data: Link) => Promise<any>
}

const resolver = zodResolver(LinkSchema)

export function CreateLinkDialogBase({
  actionLabel = 'Create link',
  initialValues,
  open,
  title = 'Create a new link',
  trigger,
  onOpenChange,
  onSubmit,
}: CreateLinkDialogBaseProps) {
  const isSubmittingRef = useRef(false)
  const [key, setKey] = useDebounce('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [destination, setDestination] = useDebounce(initialValues?.destination ?? '')

  const form = useForm({
    defaultValues: {
      key: initialValues?.key ?? '',
      description: initialValues?.description ?? '',
      destination: initialValues?.destination ?? '',
    },
    resolver,
  })

  const validateKey = useCallback(
    async (key: string) => {
      if (!key || key === initialValues?.key) return true
      const validation = await validateLinkKey(key)
      if (validation) form.setError('key', { message: validation, type: 'key' })
      return !validation
    },
    [form, initialValues?.key]
  )

  const handleSubmit = useCallback(
    async (data: Link) => {
      if (isSubmittingRef.current) return

      setSubmitting(true)
      isSubmittingRef.current = true

      try {
        const valid = await validateKey(data.key)
        if (!valid) return

        await onSubmit(data)
        onOpenChange(false)

        form.reset()
      } catch (error) {
        toast.error("Couldn't create or update link.")
      } finally {
        setSubmitting(false)
        isSubmittingRef.current = false
      }
    },
    [form, onOpenChange, onSubmit, validateKey]
  )

  useEffect(() => {
    const error = form.formState.errors.key
    const isKeyError = error?.type === 'key'
    if (isKeyError || !error) {
      form.clearErrors('key')
      void validateKey(key)
    }
  }, [form, key, validateKey])

  useEffect(() => {
    async function getMetadata() {
      const url = new URL(destination)
      const res = await axios.get(`/api/metadata?url=${url.toString()}`)
      const metadata = res.data
      if (metadata.description) form.setValue('description', metadata.description)
    }

    if (
      (destination && destination !== initialValues?.destination) ||
      form.getValues('description') !== initialValues?.description
    ) {
      getMetadata().catch(() => {})
    }
  }, [destination, form, initialValues])

  return (
    <Dialog
      open={open}
      trigger={trigger}
      onOpenChange={onOpenChange}
      className="gap-0 overflow-hidden bg-white p-0 pt-2 sm:pt-0 sm:[&_[data-orientation='vertical']]:!hidden"
    >
      <div className='z-10 flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 bg-white p-6 transition-all sm:sticky sm:top-0 sm:px-16'>
        <IconLogo className='h-10 w-10' />
        <h3 className='max-w-sm truncate text-lg font-medium'>{title}</h3>
      </div>
      <Form form={form} onSubmit={form.handleSubmit(handleSubmit)} className='bg-neutral-50'>
        <div className='space-y-6 p-6 sm:px-16'>
          <Form.Input
            type='url'
            name='destination'
            control={form.control}
            label='Destination URL'
            placeholder={siteConfig.examples.link}
            onChange={e => setDestination(e.target.value)}
          />
          <Form.Input
            name='key'
            type='text'
            label='Short Link'
            className='relative'
            autoComplete='off'
            control={form.control}
            placeholder={siteConfig.examples.key}
            onChange={e => setKey(e.target.value)}
            classNames={{ label: 'flex items-center gap-1' }}
          >
            <Button
              type='button'
              variant='ghost'
              disabled={isSubmitting}
              className='absolute -top-2 right-0 flex min-h-fit items-center gap-1 p-0 text-sm text-neutral-500 transition-colors hover:bg-transparent hover:text-neutral-800 disabled:bg-transparent disabled:ring-0'
              onClick={() => {
                form.clearErrors('key')
                form.setValue('key', RandomKey())
              }}
            >
              <Shuffle className='h-4 w-4 stroke-2' />
              <span>Randomize</span>
            </Button>
          </Form.Input>
        </div>
        <div className='relative flex items-center px-6 py-2 sm:px-16'>
          <Separator className='relative'>
            <span className='absolute inset-0 flex items-center justify-center'>
              <p className='bg-neutral-50 px-2 text-sm text-neutral-500'>Optional</p>
            </span>
          </Separator>
        </div>
        <div className='space-y-6 p-6 sm:px-16'>
          <Form.Input
            type='url'
            name='description'
            label='Description'
            control={form.control}
            placeholder={siteConfig.examples.description}
            render={({ field }) => <Textarea {...field} />}
          />
        </div>
        <div className='z-10 border-t border-neutral-300 bg-neutral-50 p-6 transition-all  sm:sticky sm:bottom-0 sm:px-16'>
          <Button loading={isSubmitting} className='w-full'>
            {actionLabel}
          </Button>
        </div>
      </Form>
    </Dialog>
  )
}

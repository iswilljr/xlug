'use client'

import axios from 'redaxios'
import { toast } from 'sonner'
import { ShuffleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/button'
import { Form } from '@/ui/form'
import { Separator } from '@/ui/separator'
import { Textarea } from '@/ui/textarea'
import { ModalContent } from '@/ui/modal'
import { popAllModals } from '@/components/dialogs'
import { siteConfig } from '@/config/site'
import { validateLinkKey } from '@/utils/links'
import { type Link, LinkSchema, RandomKey } from '@/utils/schemas'
import { useDebounce } from '@/hooks/use-debounce'
import { IconLogo } from '../../logo'

export interface CreateLinkDialogBaseProps {
  actionLabel?: string
  initialValues?: Link
  title?: string
  onSubmit: (data: Link) => Promise<any>
}

const resolver = zodResolver(LinkSchema)

export function CreateLinkDialogBase({
  actionLabel = 'Create link',
  initialValues,
  title = 'Create a new link',
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

        popAllModals()

        form.reset()
      } catch (error) {
        toast.error("Couldn't create or update link.")
      } finally {
        setSubmitting(false)
        isSubmittingRef.current = false
      }
    },
    [form, onSubmit, validateKey]
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
      const { description } = res.data ?? {}
      if (typeof description === 'string') form.setValue('description', description)
    }

    if (
      (destination && destination !== initialValues?.destination) ||
      form.getValues('description') !== initialValues?.description
    ) {
      getMetadata().catch(() => {})
    }
  }, [destination, form, initialValues])

  return (
    <ModalContent className='sm:max-w-lg sm:[&_[data-orientation="vertical"]]:!hidden'>
      <div className='z-10 flex flex-col items-center justify-center space-y-3 border-b border-neutral-300 bg-white p-6 transition-all dark:border-neutral-800 dark:bg-neutral-900/50 sm:sticky sm:top-0 sm:px-16'>
        <IconLogo className='h-10 w-10' />
        <h3 className='max-w-sm truncate text-lg font-medium'>{title}</h3>
      </div>
      <Form form={form} onSubmit={form.handleSubmit(handleSubmit)} className='bg-neutral-50 dark:bg-neutral-950'>
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
          >
            <Button
              type='button'
              variant='ghost'
              disabled={isSubmitting}
              className='absolute -top-0 right-0 flex min-h-fit items-center gap-1 p-0 text-sm text-neutral-500 transition-colors hover:bg-transparent hover:text-neutral-800 disabled:bg-transparent disabled:ring-0 dark:text-neutral-400 dark:hover:bg-transparent'
              onClick={() => {
                form.clearErrors('key')
                form.setValue('key', RandomKey())
              }}
            >
              <ShuffleIcon className='h-4 w-4 stroke-2' />
              <span>Randomize</span>
            </Button>
          </Form.Input>
        </div>
        <div className='relative flex items-center px-6 py-2 sm:px-16'>
          <Separator className='relative'>
            <span className='absolute inset-0 flex items-center justify-center'>
              <p className='bg-neutral-50 px-2 text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400'>
                Optional
              </p>
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
        <div className='z-10 border-t border-neutral-300 bg-neutral-50 p-6 transition-all dark:border-neutral-800 dark:bg-neutral-950 sm:sticky sm:bottom-0 sm:px-16'>
          <Button loading={isSubmitting} className='w-full'>
            {actionLabel}
          </Button>
        </div>
      </Form>
    </ModalContent>
  )
}

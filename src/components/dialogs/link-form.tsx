'use client'

import axios from 'redaxios'
import useSWRMutate from 'swr/mutation'
import { HelpCircle, Shuffle } from 'iconoir-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { Form } from '@/ui/form'
import { HoverCard } from '@/ui/hover-card'
import { Separator } from '@/ui/separator'
import { Textarea } from '@/ui/textarea'
import { siteConfig } from '@/config/site'
import { type Link, LinkSchema, RandomKey } from '@/utils/schemas'
import { useDebounce } from '@/hooks/use-debounce'
import { IconLogo } from '../logo'

export interface LinkFormDialogProps {
  actionLabel?: string
  initialValues?: Link
  resetOnSubmitted?: boolean
  title?: string
  trigger: React.ReactNode
  onSubmit: (data: Link) => Promise<any>
}

interface ExistsData {
  exists: boolean
}

const resolver = zodResolver(LinkSchema)

export function LinkFormDialog({
  actionLabel = 'Create link',
  initialValues,
  resetOnSubmitted = true,
  title = 'Create a new link',
  trigger,
  onSubmit,
}: LinkFormDialogProps) {
  const [key, setKey] = useDebounce('')
  const isSubmittingRef = useRef(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const { trigger: existsKey } = useSWRMutate('key-exists', (_key, { arg }: { arg: string }) =>
    axios.get<ExistsData>(`/api/link/${arg}/exists`)
  )

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
      if (key.includes('/')) {
        form.setError('key', { message: 'Key cannot include "/"', type: 'slash' })
        return false
      }

      if (!key || key === initialValues?.key) {
        return true
      }

      const res = await existsKey(key).catch(() => null)

      if (res == null) {
        // TODO: Show root error
        return false
      }

      if (!res.data?.exists) {
        return true
      }

      form.setError('key', { message: 'Key already exists', type: 'key' })
      return false
    },
    [existsKey, form, initialValues?.key]
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
        setDialogOpen(false)

        if (resetOnSubmitted) {
          setKey('')
          form.reset({})
        }
      } catch (error) {
        console.error(error)
      } finally {
        setSubmitting(false)
        isSubmittingRef.current = false
      }
    },
    [form, onSubmit, resetOnSubmitted, setKey, validateKey]
  )

  useEffect(() => {
    const error = form.formState.errors.key
    const isKeyError = error?.type === 'key'

    if (isKeyError) form.clearErrors('key')

    if (isKeyError || !error) void validateKey(key)
  }, [form, key, validateKey])

  return (
    <Dialog
      trigger={trigger}
      open={isDialogOpen}
      onOpenChange={setDialogOpen}
      className="gap-0 rounded-2xl bg-white p-0 pt-2 sm:rounded-2xl sm:pt-0 sm:[&_[data-orientation='vertical']]:!hidden"
    >
      <div className='z-10 flex flex-col items-center justify-center space-y-3 rounded-t-2xl border-b border-neutral-200 bg-white p-6 transition-all sm:sticky sm:top-0 sm:px-16'>
        <IconLogo className='h-10 w-10' />
        <h3 className='max-w-sm truncate text-lg font-medium'>{title}</h3>
      </div>
      <Form form={form} onSubmit={form.handleSubmit(handleSubmit)} className='rounded-b-2xl bg-neutral-50'>
        <div className='space-y-6 p-6 sm:px-16'>
          <Form.Input
            control={form.control}
            type='url'
            name='destination'
            placeholder={siteConfig.examples.link}
            label='Destination URL'
          />
          <Form.Input
            control={form.control}
            className='relative'
            classNames={{
              label: 'flex items-center gap-1',
            }}
            type='text'
            name='key'
            placeholder={siteConfig.examples.key}
            label={
              <>
                <span>Short Links</span>
                <HoverCard
                  className='text-center text-neutral-600'
                  content='Only letters, numbers, dots, dashes and underscores are allowed. Cannot repeat, start or end with dots, dashes or underscores.'
                >
                  <HelpCircle className='h-4 w-4 stroke-2 text-neutral-500' />
                </HoverCard>
              </>
            }
            onChange={e => setKey(e.target.value)}
          >
            <Button
              variant='ghost'
              className='absolute -top-2 right-0 flex min-h-fit items-center gap-1 p-0 text-sm text-neutral-500 transition-colors hover:bg-transparent hover:text-neutral-800'
              type='button'
              disabled={isSubmitting}
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
            control={form.control}
            type='url'
            name='description'
            placeholder={siteConfig.examples.description}
            render={({ field }) => <Textarea {...field} />}
            label='Description'
          />
        </div>
        <div className='z-10 border-t border-neutral-300 bg-neutral-50 p-6 transition-all  sm:sticky sm:bottom-0 sm:px-16'>
          <Button
            loading={isSubmitting}
            className='w-full disabled:bg-neutral-200 disabled:text-neutral-500 disabled:opacity-50 disabled:ring-1 disabled:ring-neutral-300'
          >
            {actionLabel}
          </Button>
        </div>
      </Form>
    </Dialog>
  )
}

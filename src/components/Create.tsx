import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { type FormErrors, useForm, zodResolver } from '@mantine/form'
import axios, { type Response } from 'redaxios'
import { toast } from 'sonner'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'
import type { ZodSchema } from 'zod'
import type { CreateXlug } from '@/types'

interface CreateProps {
  actionLabel: string
  action: string
  schema: ZodSchema<CreateXlug>
  successMessage: string
  initialValues: CreateXlug
  buttonPosition?: 'left' | 'right'
  onFinish?: (res: Response<any>) => void
  onUpdate?: (res: Response<any>) => void
}

const onError = (errors: FormErrors) => {
  const key = Object.keys(errors)[0]
  toast.error(errors[key])
}

export function Create({
  actionLabel,
  action,
  successMessage,
  schema,
  initialValues,
  buttonPosition = 'left',
  onFinish,
  onUpdate,
}: CreateProps) {
  const router = useRouter()
  const session = useSession()
  const [submitting, setSubmitting] = useState(false)
  const { onSubmit, getInputProps } = useForm({
    initialValues,
    validate: zodResolver(schema),
  })

  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (submitting) return
      setSubmitting(true)

      try {
        const res = await axios.post(action, values)
        if (!session) onUpdate?.(res)

        toast.success(successMessage)
        void router.push('/dashboard', undefined, { scroll: false })
        onFinish?.(res)
      } catch (error: any) {
        const message = typeof error?.data?.message === 'string' ? error.data.message : null
        toast.error(message ?? 'Something went wrong, try again')
      } finally {
        setSubmitting(false)
      }
    },
    [action, successMessage, onUpdate, onFinish, router, session, submitting]
  )

  return (
    <form onSubmit={onSubmit(onValid, onError)} className='grid gap-3'>
      <Input id='id' placeholder='xlug' {...getInputProps('xlug')} />
      <Input id='destination' placeholder='https://xlug.vercel.app' inputMode='url' {...getInputProps('destination')} />
      <Textarea id='description' {...getInputProps('description')} />
      <Button loading={submitting} disabled={submitting} type='submit'>
        {actionLabel}
      </Button>
    </form>
  )
}

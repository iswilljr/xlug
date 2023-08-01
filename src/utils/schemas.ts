import { z } from 'zod'
import { customAlphabet } from 'nanoid'

export type Link = z.infer<typeof LinkSchema>
export type EditLink = z.infer<typeof EditLinkSchema>

export const KeyRegExp = /^[a-z0-9](?!.*?[-_.]{2,})[a-z0-9-_.]*[a-z0-9]$/i

export const LinkSchema = z.object({
  key: z
    .string({
      required_error: 'Key is required',
      invalid_type_error: 'Key must be a string',
    })
    .min(2, 'Must have at least 2 characters')
    .regex(KeyRegExp, 'Only letters, numbers, ".", "-" and "_" are allowed.'),
  destination: z
    .string({
      required_error: 'Destination URL is required',
      invalid_type_error: 'Destination URL must be a string',
    })
    .url('Invalid Url'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .nullish()
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    .transform(v => v || null),
})

export const EditLinkSchema = LinkSchema.partial()

export const RandomKey = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7)

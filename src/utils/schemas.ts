import { z } from 'zod'
import { customAlphabet } from 'nanoid'
import { PROD_BASE_URL } from '@/config/constants'

export type Link = z.infer<typeof LinkSchema>
export type EditLink = z.infer<typeof EditLinkSchema>

export const KeyRegExp = /^[a-z0-9](?!.*?[-_.]{2,})[a-z0-9-_.]*[a-z0-9]$/i

export const KeySchema = z
  .string({
    required_error: 'Key is required',
    invalid_type_error: 'Key must be a string',
  })
  .trim()
  .min(2, 'Must have at least 2 characters')
  .regex(KeyRegExp, 'Only letters, numbers, ".", "-" and "_" are allowed.')

export const DestinationSchema = z
  .string({
    required_error: 'Destination URL is required',
    invalid_type_error: 'Destination URL must be a string',
  })
  .trim()
  .url('Invalid Url')
  .refine(v => {
    try {
      return new URL(v).host !== new URL(PROD_BASE_URL).host
    } catch (error) {
      return false
    }
  }, 'Invalid url')

export const DescriptionSchema = z
  .string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  })
  .trim()
  .nullish()
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  .transform(v => v || null)

export const LinkSchema = z.object({
  key: KeySchema,
  destination: DestinationSchema,
  description: DescriptionSchema,
})

export const PublicLinkSchema = z.object({
  key: KeySchema.optional(),
  destination: DestinationSchema,
  description: DescriptionSchema.optional(),
})

export const EditLinkSchema = LinkSchema.partial()

export const LinkRowSchema = LinkSchema.extend({
  id: z.string(),
  userId: z.union([z.string(), z.null()]),
  createdAt: z.string().refine(v => {
    try {
      new Date(v).toISOString()
      return true
    } catch (error) {
      return false
    }
  }),
})

export const TabEnumSchema = z.enum(['clicks', 'browser', 'city', 'country', 'device', 'os', 'referrer'])
export const IntervalEnumSchema = z.enum(['1h', '24h', '7d', '30d', '90d', 'all'])

export const RandomKey = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7)

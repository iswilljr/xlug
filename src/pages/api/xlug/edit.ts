import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { editXlugSchema } from '@/utils/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/types/supabase'
import { apiHandler } from '@/utils/handler'

async function editXlug(req: NextApiRequest, res: NextApiResponse) {
  const { id, xlug, destination, description } = editXlugSchema.parse(req.body)

  if (!id) return res.status(400).json({ message: 'The id is required' })

  const supabase = createPagesServerClient<Database>({ req, res })

  const { data, error } = await supabase
    .from('xlugs')
    .update({
      xlug,
      description,
      destination,
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw new Error(error.message, { cause: error.code })

  return res.json(data)
}

export default apiHandler(editXlug)

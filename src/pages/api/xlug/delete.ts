import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { deleteXlugSchema } from '@/utils/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/types/supabase'
import { apiHandler } from '@/utils/handler'

async function deleteXlug(req: NextApiRequest, res: NextApiResponse) {
  const { id } = deleteXlugSchema.parse(req.body)

  const supabase = createPagesServerClient<Database>({ req, res })

  const { data, error } = await supabase.from('xlugs').delete().eq('id', id).select('*').single()

  if (error) throw new Error(error.message, { cause: error.code })

  return res.json(data)
}

export default apiHandler(deleteXlug)

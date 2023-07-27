import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { newXlugSchema } from '@/utils/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Database } from '@/types/supabase'
import { apiHandler } from '@/utils/handler'

async function createNewXlug(req: NextApiRequest, res: NextApiResponse) {
  const { xlug, destination, description } = newXlugSchema.parse(req.body)

  const supabase = createPagesServerClient<Database>({ req, res })
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  const { session } = sessionData

  if (sessionError) throw new Error(sessionError.message, { cause: sessionError.cause })

  const { data, error } = await supabase
    .from('xlugs')
    .insert({
      xlug,
      description,
      destination,
      user_id: session ? session.user.id : null,
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message, { cause: error.code })

  return res.json(data)
}

export default apiHandler(createNewXlug)

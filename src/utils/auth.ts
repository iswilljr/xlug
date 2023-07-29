import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getServerSession() {
  const supabase = createServerComponentClient({ cookies })
  const response = await supabase.auth.getSession()

  return response.data.session
}

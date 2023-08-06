import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Filters } from '@/components/dashboard/filters'
import { Links } from '@/components/dashboard/links'
import { FilterQueryParams } from '@/config/constants'
import { LinksProvider } from '@/providers/links'
import type { Database } from '@/types/supabase'
import type { DefaultPageProps } from '@/types/params'

export default async function Page({ searchParams }: DefaultPageProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const res = await supabase.auth.getSession()
  const links = res.data.session
    ? await supabase
        .from('links')
        .select('*')
        .eq('userId', res.data.session.user.id)
        .order('createdAt', { ascending: false })
    : null

  const queryParam = searchParams[FilterQueryParams.query]
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam

  return (
    <LinksProvider initialLinks={links?.data ?? []} query={query ?? ''}>
      <main className='mx-auto w-full max-w-screen-xl space-y-6 p-6'>
        <section>
          <Filters />
        </section>
        <section>
          <Links />
        </section>
      </main>
    </LinksProvider>
  )
}

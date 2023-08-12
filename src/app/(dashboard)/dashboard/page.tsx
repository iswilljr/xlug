import { LinkFilters } from '@/components/links/link-filters'
import { LinksContainer } from '@/components/links/links-container'
import { FilterQueryParams } from '@/config/constants'
import { LinksProvider } from '@/providers/links'
import type { DefaultPageProps } from '@/types/params'

export default async function Page({ searchParams }: DefaultPageProps) {
  const queryParam = searchParams[FilterQueryParams.query]
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam

  return (
    <LinksProvider query={query ?? ''}>
      <main className='mx-auto w-full max-w-screen-xl space-y-6 p-6'>
        <section>
          <LinkFilters />
        </section>
        <section>
          <LinksContainer />
        </section>
      </main>
    </LinksProvider>
  )
}

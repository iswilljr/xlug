import { FilterQueryParams } from '@/config/constants'
import type { LinksState } from '@/store/links'
import type { LinkRow } from '@/types/tables'

export type FilterOptions = Pick<LinksState, 'query'>
export type FilterLinksOptions = Pick<LinksState, 'links' | 'query'>

export function filterLinksByQuery(links: LinkRow[], query: string) {
  if (!query) return links

  const q = query.toLowerCase()

  return links.filter(link => {
    return (
      link.key.toLowerCase().includes(q) ||
      link.destination.toLowerCase().includes(q) ||
      link.description?.toLowerCase().includes(q)
    )
  })
}

export function filterLinks({ links, query }: FilterLinksOptions): LinkRow[] {
  return filterLinksByQuery(links, query)
}

export interface HandleOnChangeFiltersOptions {
  query: string
}

export function handleOnChangeFilters({ query }: HandleOnChangeFiltersOptions) {
  const searchParams = new URLSearchParams()

  query ? searchParams.set(FilterQueryParams.query, query) : searchParams.delete(FilterQueryParams.query)

  return searchParams.toString()
}

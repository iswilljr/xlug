'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { filterLinks, type FilterOptions } from '@/utils/filters'
import { createStoreWithInitProps } from './create-store'
import type { LinkRow } from '@/types/tables'

export interface LinksInitProps {
  initialLinks: LinkRow[]
  query: string
}

export interface LinksState extends LinksInitProps {
  links: LinkRow[]
  data: LinkRow[]
  setLinks: (links: LinkRow[]) => void
  setFilters: (options: FilterOptions) => void
}

export const { LinksProvider, useLinksState, useLinksStore } = createStoreWithInitProps({
  create(initProps: LinksInitProps) {
    const initialFilteredLinks = filterLinks({ links: initProps.initialLinks, query: initProps.query })

    return createWithEqualityFn<LinksState>(
      set => ({
        initialLinks: initProps.initialLinks,
        data: initProps.initialLinks,
        links: initialFilteredLinks,
        query: initProps.query,
        setLinks(links) {
          set(state => {
            return {
              data: links,
              links: filterLinks({ query: state.query, links }),
            }
          })
        },
        setFilters({ query }) {
          set(state => {
            if (state.query === query) return state

            return {
              query,
              links: filterLinks({ links: state.data, query }),
            }
          })
        },
      }),
      shallow
    )
  },
  id: 'Links',
})

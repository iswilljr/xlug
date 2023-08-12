'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { filterLinks, type FilterOptions } from '@/utils/filters'
import { createStoreWithInitProps } from './create-store'
import type { LinkRow } from '@/types/tables'

export interface LinksInitProps {
  query: string
}

export interface LinksState extends LinksInitProps {
  links: LinkRow[]
  data: LinkRow[]
  isLoading: boolean
  setLoading: (loading: boolean) => void
  setLinks: (links: LinkRow[]) => void
  setFilters: (options: FilterOptions) => void
}

export const { LinksProvider, useLinksState, useLinksStore } = createStoreWithInitProps({
  create(initProps: LinksInitProps) {
    return createWithEqualityFn<LinksState>(
      set => ({
        data: [],
        links: [],
        isLoading: true,
        query: initProps.query,
        setLoading(isLoading) {
          set({ isLoading })
        },
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

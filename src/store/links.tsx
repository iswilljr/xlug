'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { filterLinks, type FilterOptions } from '@/utils/filters'
import { createStoreWithInitProps } from './create-store'
import type { LinkRow, StatsRow } from '@/types/tables'

export interface LinksInitProps {
  query: string
}

export interface LinksState extends LinksInitProps {
  links: LinkRow[]
  data: LinkRow[]
  totalOfClicks: Record<string, StatsRow>
  isLoading: boolean
  setLoading: (loading: boolean) => void
  setTotalOfClicks: (totalOfClicks: StatsRow[]) => void
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
        totalOfClicks: {},
        query: initProps.query,
        setLoading(isLoading) {
          set({ isLoading })
        },
        setTotalOfClicks(totalOfClicks) {
          set({
            totalOfClicks: Object.fromEntries(totalOfClicks.map(clicks => [clicks.key, clicks])),
          })
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

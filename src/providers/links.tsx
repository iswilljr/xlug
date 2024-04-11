'use client'

import useSWR from 'swr'
import { useEffect } from 'react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { LinksProvider as LinkStateProvider, useLinksState } from '@/store/links'
import type { LinkRow, StatsRow } from '@/types/tables'

interface LinksData {
  links: LinkRow[]
}

type LinksStateProviderProps = React.ComponentProps<typeof LinkStateProvider>

export function LinksProvider({ children, ...props }: LinksStateProviderProps) {
  return (
    <LinkStateProvider {...props}>
      <LinksDataProvider {...props}>{children}</LinksDataProvider>
    </LinkStateProvider>
  )
}

function LinksDataProvider({ children }: LinksStateProviderProps) {
  const [setLinks, setTotalOfClicks, setLoading] = useLinksState(
    state => [state.setLinks, state.setTotalOfClicks, state.setLoading] as const
  )

  const { data, isLoading } = useSWR<LinksData>(`/api/${LINKS_DATA_KEY}`)
  const { data: totalOfClicksData } = useSWR<StatsRow[]>('/api/links/stats')

  useEffect(() => {
    setLoading(isLoading)

    if (!data) return

    setLinks(data.links)
  }, [data, isLoading, setLinks, setLoading])

  useEffect(() => {
    if (!totalOfClicksData) return

    setTotalOfClicks(totalOfClicksData)
  }, [setTotalOfClicks, totalOfClicksData])

  return children
}

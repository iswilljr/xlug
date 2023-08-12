'use client'

import useSWR from 'swr'
import axios from 'redaxios'
import { useEffect } from 'react'
import { LINKS_DATA_KEY } from '@/config/constants'
import { LinksProvider as LinkStateProvider, useLinksState } from '@/store/links'
import type { LinkRow } from '@/types/tables'

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
  const [setLinks, setLoading] = useLinksState(state => [state.setLinks, state.setLoading] as const)

  const { data, isLoading } = useSWR(LINKS_DATA_KEY, key => axios.get<LinksData>(`/api/${key}`).then(res => res.data))

  useEffect(() => {
    setLoading(isLoading)

    if (!data) return

    setLinks(data.links)
  }, [data, isLoading, setLinks, setLoading])

  return children
}

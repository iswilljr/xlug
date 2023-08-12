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

function LinksDataProvider({ children, initialLinks }: LinksStateProviderProps) {
  const setLinks = useLinksState(state => state.setLinks)

  const { data } = useSWR(LINKS_DATA_KEY, key => axios.get<LinksData>(`/api/${key}`).then(res => res.data), {
    fallbackData: { links: initialLinks },
    revalidateOnMount: false,
  })

  useEffect(() => {
    if (data.links === initialLinks) return

    setLinks(data.links)
  }, [data.links, initialLinks, setLinks])

  return children
}

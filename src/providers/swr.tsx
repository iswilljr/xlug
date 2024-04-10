'use client'

import axios from 'redaxios'
import { SWRConfig } from 'swr'

export function SWRProvider({ children }: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (key: string) => axios.get(key).then(res => res.data),
      }}
    >
      {children}
    </SWRConfig>
  )
}

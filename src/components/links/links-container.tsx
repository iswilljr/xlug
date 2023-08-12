'use client'

import { useMemo } from 'react'
import { useLinksState } from '@/store/links'
import { LinkCard } from './link-card'
import { LinksEmpty } from './links-empty'

export function LinksContainer() {
  const links = useLinksState(state => state.links)
  const isEmpty = useMemo(() => links.length <= 0, [links])

  return (
    <>
      {isEmpty && <LinksEmpty />}
      {!isEmpty && (
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {links.map(link => (
            <li key={link.id}>
              <LinkCard
                shortLink={link.key}
                createdAt={link.createdAt}
                description={link.description}
                destination={link.destination}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

'use client'

import { useMemo } from 'react'
import { useLinksState } from '@/store/links'
import { LinkCard } from '../cards/link'
import { LinksEmpty } from './links-empty'

export function Links() {
  const links = useLinksState(state => state.links)
  const isEmpty = useMemo(() => links.length <= 0, [links])

  return (
    <>
      {isEmpty && <LinksEmpty />}
      {!isEmpty && (
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2'>
          {links.map(link => (
            <li key={link.id}>
              <LinkCard
                shortLink={link.key}
                createdAt={link.createdAt}
                description={link.description ?? 'No description provided.'}
                destination={link.destination}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

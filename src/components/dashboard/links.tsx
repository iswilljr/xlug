'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useLinksState } from '@/store/links'
import { LinkSkeletonCard } from '../cards/link-skeleton'
import { LinksEmpty } from './links-empty'

const LinkCard = dynamic(() => import('../cards/link').then(m => m.LinkCard), {
  ssr: false,
  loading: LinkSkeletonCard,
})

export function Links() {
  const links = useLinksState(state => state.links)
  const isEmpty = useMemo(() => links.length <= 0, [links])

  return (
    <>
      {isEmpty && <LinksEmpty />}
      {!isEmpty && (
        <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          {links.map(link => (
            <li key={link.id}>
              <LinkCard
                id={link.id}
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

'use client'

import { useMemo } from 'react'
import { useLinksState } from '@/store/links'
import { LinkCard } from './link-card'
import { LinksEmpty } from './links-empty'
import { LinkSkeletonCard } from './link-skeleton'

const skeletons = Array.from(Array(12).keys())

export function LinksContainer() {
  const [links, isLoading] = useLinksState(state => [state.links, state.isLoading] as const)
  const isEmpty = useMemo(() => links.length <= 0, [links])

  return (
    <>
      {isLoading && (
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
          {skeletons.map(skeleton => (
            <li key={skeleton}>
              <LinkSkeletonCard />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && isEmpty && <LinksEmpty />}
      {!isLoading && !isEmpty && (
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
          {links.map(link => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

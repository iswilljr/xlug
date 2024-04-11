'use client'

import { useEffect, useRef } from 'react'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterQueryParams } from '@/config/constants'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { handleOnChangeFilters } from '@/utils/filters'
import { useDebounce } from '@/hooks/use-debounce'
import { useLinksState } from '@/store/links'
import { CreateLinkDialog } from '../dialogs/create-link-dialog'

export function LinkFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQueryValue = useRef(searchParams.get(FilterQueryParams.query))

  const setFilters = useLinksState(state => state.setFilters)
  const [query, setDebouncedQuery] = useDebounce(initialQueryValue.current ?? '')

  useEffect(() => {
    const search = handleOnChangeFilters({ query })
    router.push(search ? `/dashboard?${search}` : '/dashboard', { scroll: false })
    setFilters({ query })
  }, [query, router, setFilters])

  return (
    <div className='relative flex w-full items-center gap-2'>
      <Input
        name='query'
        rootClassName='w-full'
        placeholder='Search...'
        icon={SearchIcon}
        defaultValue={initialQueryValue.current ?? ''}
        onChange={e => setDebouncedQuery(e.target.value)}
      />
      <CreateLinkDialog
        trigger={
          <Button aria-label='Create Link' className='h-9 w-9 px-2 sm:min-w-[7rem]'>
            <PlusIcon className='sm:hidden' />
            <span className='hidden sm:inline-block'>Create Link</span>
          </Button>
        }
      />
    </div>
  )
}

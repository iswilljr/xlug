'use client'

import { useEffect } from 'react'
import { Plus, Search } from 'iconoir-react'
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

  const setFilters = useLinksState(state => state.setFilters)
  const [query, setDebouncedQuery] = useDebounce(searchParams.get(FilterQueryParams.query) ?? '')

  useEffect(() => {
    const search = handleOnChangeFilters({ query })
    router.push(`/dashboard${search ? '?' : ''}${search}`, { scroll: false })
    setFilters({ query })
  }, [query, router, setFilters])

  return (
    <div className='relative flex w-full items-center gap-2'>
      <Input
        name='query'
        rootClassName='w-full'
        placeholder='Search...'
        icon={Search}
        onChange={e => setDebouncedQuery(e.target.value)}
      />
      <CreateLinkDialog
        trigger={
          <Button className='h-9 w-9 px-2 sm:min-w-[7rem]'>
            <Plus className='sm:hidden' />
            <span className='hidden sm:inline-block'>Create Link</span>
          </Button>
        }
      />
    </div>
  )
}

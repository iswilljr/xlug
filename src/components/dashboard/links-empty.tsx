import { Button } from '@/ui/button'
import { useLinksState } from '@/store/links'
import { CreateLinkForm } from '../forms/create-link'

export function LinksEmpty() {
  const query = useLinksState(state => state.query)

  return (
    <div className='grid place-items-center space-y-4 rounded-lg border border-neutral-200 bg-white px-6 py-16 shadow-md sm:px-16'>
      <h2 className='z-10 text-center text-xl font-semibold text-neutral-700'>
        {query ? 'No links found' : "You don't have links yet"}
      </h2>
      {!query && <CreateLinkForm trigger={<Button>Create your first link</Button>} />}
      <p className='break-all text-center text-sm text-neutral-500'>
        {query
          ? `Your search for "${query}" did not return any results.`
          : 'Get started and create your first short link.'}
      </p>
    </div>
  )
}

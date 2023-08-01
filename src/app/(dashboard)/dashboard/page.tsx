import { DashboardStackHeader } from '@/layout/dashboard/stack-header'
import { CreateLinkForm } from '@/components/forms/create-link'

export default function Page() {
  return (
    <>
      <DashboardStackHeader title='My Links'>
        <CreateLinkForm />
      </DashboardStackHeader>
    </>
  )
}

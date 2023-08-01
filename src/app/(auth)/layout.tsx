import { redirect } from 'next/navigation'
import { getServerSession } from '@/utils/auth'

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getServerSession()

  if (session) redirect('/dashboard')

  return (
    <div className='background min-h-small-screen flex items-center justify-center bg-neutral-100 p-6'>{children}</div>
  )
}
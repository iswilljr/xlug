import { DashboardLayout } from '@/layout/dashboard/layout'

export const dynamic = 'force-dynamic'

export default function Layout({ children }: React.PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>
}

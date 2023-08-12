import { HomeLayout } from '@/layout/home/layout'

export default function Layout({ children }: React.PropsWithChildren) {
  return <HomeLayout>{children}</HomeLayout>
}

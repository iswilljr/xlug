import { DashboardHeader } from './header'

export interface DashboardLayoutProps extends React.PropsWithChildren {}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div className='background min-h-small-screen flex flex-col justify-between'>
      <DashboardHeader />
      <main className='mx-auto max-w-screen-xl flex-1 px-6 pb-10 pt-12 md:px-20'>{props.children}</main>
    </div>
  )
}

import { DashboardHeader } from './header'
import { DashboardSubmenu } from './submenu'

export interface DashboardLayoutProps extends React.PropsWithChildren {}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div className='background min-h-small-screen bg-neutral-50 dark:bg-neutral-950'>
      <div className='sticky inset-x-0 top-0 z-30 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/95'>
        <DashboardHeader />
        <DashboardSubmenu />
      </div>
      {props.children}
    </div>
  )
}

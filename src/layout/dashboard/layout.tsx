import { DashboardHeader } from './header'
import { DashboardSubmenu } from './submenu'

export interface DashboardLayoutProps extends React.PropsWithChildren {}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div className='background'>
      <div className='sticky inset-x-0 top-0 z-30 w-full border-b border-neutral-200 bg-white/75 backdrop-blur-lg'>
        <DashboardHeader />
        <DashboardSubmenu />
      </div>
      {props.children}
    </div>
  )
}

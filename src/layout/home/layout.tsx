import { HomeFooter } from './footer'
import { HomeHeader } from './header'

export interface HomeLayoutProps extends React.PropsWithChildren {}

export function HomeLayout(props: HomeLayoutProps) {
  return (
    <div className='background flex min-h-screen flex-col justify-between'>
      <HomeHeader />
      <main className='mx-auto max-w-screen-xl flex-1 px-6 pb-10 pt-12 md:px-20'>{props.children}</main>
      <HomeFooter />
    </div>
  )
}
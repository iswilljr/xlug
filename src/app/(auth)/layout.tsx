import { Background } from '@/layout/background'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='background min-h-small-screen flex items-center justify-center p-6'>
      {children}
      <Background />
    </div>
  )
}

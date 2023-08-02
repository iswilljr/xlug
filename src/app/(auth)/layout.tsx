export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='background min-h-small-screen flex items-center justify-center bg-neutral-100 p-6'>{children}</div>
  )
}

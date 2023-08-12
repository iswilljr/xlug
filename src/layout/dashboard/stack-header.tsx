interface PageHeaderProps extends React.PropsWithChildren {
  title: string
}

export function DashboardStackHeader({ children, title }: PageHeaderProps) {
  return (
    <div className='w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'>
      <div className='mx-auto flex min-h-[8rem] w-full max-w-screen-xl flex-col justify-center gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-0'>
        <h1 className='text-[2rem] font-medium tracking-tight text-neutral-900'>{title}</h1>
        <div className='flex items-center gap-2'>{children}</div>
      </div>
    </div>
  )
}

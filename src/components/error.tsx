export interface ErrorProps extends React.PropsWithChildren {
  background: React.ReactNode
  description: React.ReactNode
  title: React.ReactNode
}

export function Error({ background, description, title, children }: ErrorProps) {
  return (
    <div className='relative mx-auto grid min-h-[100svh] w-full place-items-center overflow-hidden'>
      <div className='pointer-events-none absolute -z-10 select-none'>
        <h1 className='m-0 text-[14rem] font-extrabold leading-none tracking-tighter text-neutral-950 opacity-50 blur-sm dark:text-neutral-100 md:text-[18rem] lg:text-[28rem]'>
          {background}
        </h1>
      </div>
      <div className='absolute inset-0 z-10 bg-black/70 backdrop-blur-sm' />
      <div className='z-50 flex flex-col items-center justify-center gap-4 p-4 text-neutral-100'>
        <div className='w-full max-w-[16rem] space-y-1'>
          <h2 className='text-center text-xl font-bold'>{title}</h2>
          <p className='text-center text-sm'>{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Background() {
  return (
    <div className='fixed left-0 top-0 -z-50 h-screen w-screen overflow-hidden'>
      <div className='absolute inset-0 z-[-1] bg-neutral-950/10 dark:bg-neutral-950' />
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <defs>
          <pattern id='a' width='16' height='16' patternUnits='userSpaceOnUse'>
            <circle className='dark:fill-white' cx='2' cy='2' r='1' />
          </pattern>
          <mask id='b'>
            <rect className='fill-white dark:fill-neutral-950' width='100%' height='100%' />
            <rect width='100%' height='100%' fill='url(#a)' />
          </mask>
        </defs>
        <rect className='fill-white dark:fill-white/5' width='100%' height='100%' mask='url(#b)' />
      </svg>
    </div>
  )
}

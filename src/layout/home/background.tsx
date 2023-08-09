export function HomeBackground() {
  return (
    <div className='fixed left-0 top-0 -z-50 h-screen w-screen overflow-hidden'>
      <div className='absolute inset-0 z-[-1] bg-neutral-950/10' />
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <defs>
          <pattern id='a' width='16' height='16' patternUnits='userSpaceOnUse'>
            <circle cx='2' cy='2' r='1' />
          </pattern>
          <mask id='b'>
            <rect width='100%' height='100%' fill='#fff' />
            <rect width='100%' height='100%' fill='url(#a)' />
          </mask>
        </defs>
        <rect width='100%' height='100%' fill='#fff' mask='url(#b)' />
      </svg>
    </div>
  )
}

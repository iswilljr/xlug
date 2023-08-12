'use client'

import { useTheme } from 'next-themes'
import { Computer, HalfMoon, Sparks, SunLight } from 'iconoir-react'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu
      align='end'
      trigger={
        <Button size='icon' variant='ghost' className='h-8 w-8'>
          <Sparks className='h-5 w-5 stroke-2' />
        </Button>
      }
      items={[
        {
          label: 'System',
          icon: <Computer />,
          onClick: () => setTheme('system'),
        },
        {
          label: 'Dark',
          icon: <HalfMoon />,
          onClick: () => setTheme('dark'),
        },
        {
          label: 'Light',
          icon: <SunLight />,
          onClick: () => setTheme('light'),
        },
      ]}
    />
  )
}

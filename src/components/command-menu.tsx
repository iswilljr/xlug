'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppWindow, Github, HomeSimple, InfoCircle, KeyCommand, Twitter } from 'iconoir-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { Button } from '@/ui/button'
import { siteConfig } from '@/config/site'

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button aria-label='Switch between dark and light theme' size='icon' variant='ghost' className='h-8 w-8'>
          <KeyCommand className='h-5 w-5 stroke-2' />
        </Button>
      }
    >
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => router.push('/')}>
            <HomeSimple className='h-4 w-4' />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <AppWindow className='h-4 w-4' />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.github, '_blank')}>
            <Github className='h-4 w-4' />
            <span>Github</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.twitter, '_blank')}>
            <Twitter className='h-4 w-4' />
            <span>Twitter</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.issues, '_blank')}>
            <InfoCircle className='h-4 w-4' />
            <span>Report an issue</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { AppWindowIcon, GithubIcon, HomeIcon, InfoIcon, TwitterIcon } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { siteConfig } from '@/config/site'
import { useCommandMenu } from '@/store/command-menu'

export function CommandMenu() {
  const router = useRouter()
  const { open, onOpenChange } = useCommandMenu()

  useHotkeys('ctrl+k', () => onOpenChange(true), { preventDefault: true })

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => router.push('/')}>
            <HomeIcon className='h-4 w-4' />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => onOpenChange(false)}>
            <AppWindowIcon className='h-4 w-4' />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.github, '_blank')}>
            <GithubIcon className='h-4 w-4' />
            <span>Github</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.twitter, '_blank')}>
            <TwitterIcon className='h-4 w-4' />
            <span>Twitter</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(siteConfig.links.issues, '_blank')}>
            <InfoIcon className='h-4 w-4' />
            <span>Report an issue</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

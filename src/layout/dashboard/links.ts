import { AppWindow, HomeSimple } from 'iconoir-react'
import type { Route } from 'next'

interface MenuItem {
  label: string
  href: Route
}

interface AvatarMenuItem extends MenuItem {
  icon: typeof HomeSimple
}

export const avatarMenu: AvatarMenuItem[] = [
  { label: 'Home', href: '/', icon: HomeSimple },
  { label: 'Dashboard', href: '/dashboard', icon: AppWindow },
  // { label: 'Settings', href: '/Settings', icon: Settings },
]

export const submenu: MenuItem[] = [
  { label: 'Links', href: '/dashboard' },
  // { label: 'Stats', href: '/dashboard/stats' },
]

import { AppWindowIcon, HomeIcon } from 'lucide-react'
import type { Route } from 'next'

interface MenuItem {
  label: string
  href: Route
}

interface AvatarMenuItem extends MenuItem {
  icon: typeof HomeIcon
}

export const avatarMenu: AvatarMenuItem[] = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Dashboard', href: '/dashboard', icon: AppWindowIcon },
  // { label: 'Settings', href: '/Settings', icon: Settings },
]

export const submenu: MenuItem[] = [
  { label: 'Links', href: '/dashboard' },
  // { label: 'Stats', href: '/dashboard/stats' },
]

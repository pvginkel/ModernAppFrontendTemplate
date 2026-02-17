/**
 * Application-specific sidebar navigation items.
 * App-owned — the sidebar shell imports this array to render navigation links.
 */

import { Home, Info } from 'lucide-react'
import type { SidebarItem } from './sidebar'

export const navigationItems: SidebarItem[] = [
  { to: '/', label: 'Home', icon: Home, testId: 'home' },
  { to: '/about', label: 'About', icon: Info, testId: 'about' },
]

/**
 * Navigation items for the test application.
 */

import { Package, Info } from 'lucide-react'
import type { SidebarItem } from './sidebar'

export const navigationItems: SidebarItem[] = [
  { to: '/items', label: 'Items', icon: Package, testId: 'items' },
  { to: '/about', label: 'About', icon: Info, testId: 'about' },
]

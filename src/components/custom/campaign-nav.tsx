'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {ScrollText, Users, BookOpen, Dices, Package, Skull, type LucideIcon} from 'lucide-react'
import {cn} from '@/lib/utils'
import {signOutServerFunction} from '@/serverFunctions/users'
import type {Profile} from '@/models/users'
import {rolePermissions} from '@/lib/permissions'
import type {Route} from 'next'


type CampaignNavProps = {
  profile: Profile | null
}

type PermissionKey = 'canAccessItems' | 'canAccessMonsters' | 'canAccessStories'

type NavItem = {
  href: Route
  label: string
  icon: LucideIcon
  permission?: PermissionKey
}

const navItems: NavItem[] = [
  {href: '/dashboard', label: 'Campaigns', icon: ScrollText},
  {href: '/characters', label: 'Characters', icon: Users},
  {
    href: '/stories',
    label: 'Stories',
    icon: BookOpen,
    permission: 'canAccessStories',
  },
  {
    href: '/items',
    label: 'Items',
    icon: Package,
    permission: 'canAccessItems',
  },
  {
    href: '/monsters',
    label: 'Monsters',
    icon: Skull,
    permission: 'canAccessMonsters',
  },
  {href: '/tools', label: 'Tools', icon: Dices},
]


export function CampaignNav({profile}: CampaignNavProps) {
  const pathname = usePathname()

  if (!profile) return null

  const permissions = rolePermissions[profile.role]

  const visibleNavItems = navItems.filter(item => {
    if (!item.permission) return true
    return permissions[item.permission]
  })

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">C</span>
              </div>
              <span className="font-serif font-bold text-xl text-foreground">Call of Cthulhu</span>
            </Link>

            <div className="flex gap-1">
              {visibleNavItems.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn('gap-2', isActive && 'bg-secondary')}>
                    <Link href={item.href}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* USER INFO + LOGOUT */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Logged in as <strong>{profile.username}</strong>
            </span>
            <Button
              variant="outline"
              onClick={async () => {
                await signOutServerFunction()
              }}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}



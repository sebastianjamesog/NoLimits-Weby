"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Server, Trophy, ShoppingCart, Headphones, Menu, X, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { userData } from "@/lib/data"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rules", label: "Rules", icon: FileText },
  { href: "/servers", label: "Servers", icon: Server },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/store", label: "Store", icon: ShoppingCart },
  { href: "/support", label: "Support Ticket", icon: Headphones },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="block">
          <h1 className="text-[#3b9eff] font-bold text-sm leading-tight">NO LIMITS</h1>
          <h2 className="text-foreground font-bold text-base leading-tight">ROLEPLAY</h2>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-foreground"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-[200px] flex flex-col bg-background border-r border-border transition-transform duration-300",
          "lg:translate-x-0 lg:w-[150px]",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 hidden lg:block">
          <Link href="/dashboard" className="block">
            <h1 className="text-[#3b9eff] font-bold text-sm leading-tight">NO LIMITS</h1>
            <h2 className="text-foreground font-bold text-lg leading-tight">ROLEPLAY</h2>
            <p className="text-muted-foreground text-xs mt-1">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </p>
          </Link>
        </div>

        <div className="p-4 lg:hidden pt-16">
          <p className="text-muted-foreground text-xs">
            {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
          </p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-[#3b9eff]/20 text-[#3b9eff] border-l-2 border-[#3b9eff]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8 ring-2 ring-[#3b9eff]">
              <AvatarImage src="/gamer-avatar.png" />
              <AvatarFallback className="bg-secondary text-foreground">A</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userData.name}</p>
              <p className="text-xs text-muted-foreground">
                {pathname === "/leaderboard" ? `Level ${userData.level}` : `Player ID: ${userData.playerId}`}
              </p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="w-full text-xs sm:text-sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

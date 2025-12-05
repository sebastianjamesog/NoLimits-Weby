"use client"

import { Button } from "@/components/ui/button"
import { Users, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { serverInfo } from "@/lib/data"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 bg-secondary px-2 sm:px-3 py-2 rounded-lg">
          <Users className="h-4 w-4 text-[#3b9eff]" />
          <span className="text-xs sm:text-sm text-foreground">{serverInfo.players} Online</span>
        </div>
        <Link href="/servers">
          <Button className="bg-[#3b9eff] hover:bg-[#2d8be8] text-white text-xs sm:text-sm">
            <Gamepad2 className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Join</span> Server
          </Button>
        </Link>
      </div>
    </header>
  )
}

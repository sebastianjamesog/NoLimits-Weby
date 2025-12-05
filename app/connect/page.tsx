"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ImageIcon, Gamepad2, Globe, Clock, Settings, FileText, MessageCircle } from "lucide-react"
import { serverInfo } from "@/lib/data"

export default function ConnectPage() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{
      backgroundImage: 'url(/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="bg-[#111820] border border-[#1e2836] rounded-xl p-6 sm:p-8 w-full max-w-md">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-dashed border-[#2a3a4a] rounded-lg flex items-center justify-center">
            <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#3a4a5a]" />
          </div>
        </div>

        {/* Server name */}
        <h1 className="text-[#3b9eff] font-bold text-lg sm:text-xl text-center mb-1">NO LIMITS ROLEPLAY</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">Connect to Server</p>

        {/* Server status */}
        <div className="bg-[#0d1318] border border-[#1e2836] rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Server Status</span>
            <span className="flex items-center gap-2 text-[#4ade80] text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              {serverInfo.status}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Players</span>
            <span className="text-[#3b9eff] text-xs sm:text-sm">
              {serverInfo.players}/{serverInfo.maxPlayers}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-xs sm:text-sm">Queue</span>
            <span className="text-[#f97316] text-xs sm:text-sm">{serverInfo.queue} waiting</span>
          </div>
        </div>

        {/* Server capacity */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Server Capacity</span>
            <span className="text-muted-foreground text-xs sm:text-sm">{serverInfo.capacity}%</span>
          </div>
          <Progress value={serverInfo.capacity} className="h-2 bg-[#1e2836]" />
        </div>

        {/* Connect button */}
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-[#3b9eff] hover:bg-[#2d8be8] text-white py-5 sm:py-6 text-sm sm:text-base font-medium mb-6"
        >
          <Gamepad2 className="h-5 w-5 mr-2" />
          {isConnecting ? "Connecting..." : "Connect to Server"}
        </Button>

        {/* Server info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs sm:text-sm">IP Address</span>
            <span className="ml-auto text-foreground text-xs sm:text-sm font-mono truncate max-w-[140px] sm:max-w-none">
              {serverInfo.ipAddress}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs sm:text-sm">Uptime</span>
            <span className="ml-auto text-foreground text-xs sm:text-sm">{serverInfo.uptime}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Settings className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs sm:text-sm">Version</span>
            <span className="ml-auto text-[#3b9eff] text-xs sm:text-sm">{serverInfo.version}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="bg-[#1e2836] hover:bg-[#2a3a4a] text-foreground text-xs sm:text-sm">
            <FileText className="h-4 w-4 mr-1 sm:mr-2" />
            Rules
          </Button>
          <Button variant="secondary" className="bg-[#1e2836] hover:bg-[#2a3a4a] text-foreground text-xs sm:text-sm">
            <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
            Discord
          </Button>
        </div>
      </div>
    </div>
  )
}

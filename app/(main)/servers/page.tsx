"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Gamepad2, Globe, Clock, Users, Zap } from "lucide-react"

const servers = [
  {
    name: "NO LIMITS RP - Main",
    status: "Online",
    players: 127,
    maxPlayers: 200,
    queue: 5,
    ip: "45.142.220.135:30120",
    uptime: "7d 14h 32m",
    ping: "24ms",
  },
  {
    name: "NO LIMITS RP - Whitelist",
    status: "Online",
    players: 45,
    maxPlayers: 64,
    queue: 0,
    ip: "45.142.220.136:30120",
    uptime: "7d 14h 32m",
    ping: "22ms",
  },
  {
    name: "NO LIMITS RP - Test",
    status: "Offline",
    players: 0,
    maxPlayers: 32,
    queue: 0,
    ip: "45.142.220.137:30120",
    uptime: "0d 0h 0m",
    ping: "-",
  },
]

export default function ServersPage() {
  return (
    <div>
      <Header title="Servers" subtitle="View and connect to available game servers" />

      <div className="grid gap-4">
        {servers.map((server, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">{server.name}</h3>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      server.status === "Online" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        server.status === "Online" ? "bg-[#4ade80]" : "bg-muted-foreground"
                      }`}
                    />
                    {server.status}
                  </span>
                </div>
                <Button
                  disabled={server.status === "Offline"}
                  className="bg-[#3b9eff] hover:bg-[#2d8be8] text-white w-full sm:w-auto"
                >
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Players</p>
                    <p className="text-sm text-[#3b9eff]">
                      {server.players}/{server.maxPlayers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Queue</p>
                    <p className="text-sm text-[#f97316]">{server.queue} waiting</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">IP Address</p>
                    <p className="text-sm font-mono text-foreground truncate">{server.ip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="text-sm text-foreground">{server.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Ping</p>
                    <p className="text-sm text-[#4ade80]">{server.ping}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Server Capacity</span>
                  <span className="text-muted-foreground">
                    {Math.round((server.players / server.maxPlayers) * 100)}%
                  </span>
                </div>
                <Progress value={(server.players / server.maxPlayers) * 100} className="h-2 bg-secondary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

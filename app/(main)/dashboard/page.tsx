"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Clock, DollarSign, Briefcase, Users, Trophy, Crown } from "lucide-react"
import { userData, recentOnlinePlayers, mostActivePlayers, richestPlayers } from "@/lib/data"

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" subtitle={`Welcome back, ${userData.name}`} />

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Play Time */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Play Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{userData.playTime}</p>
            <p className="text-xs text-[#4ade80]">{userData.playTimeChange}</p>
          </CardContent>
        </Card>

        {/* Bank Balance */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Bank Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">${userData.bankBalance.toLocaleString()}</p>
            <p className="text-xs text-[#4ade80]">{userData.balanceChange}</p>
          </CardContent>
        </Card>

        {/* Current Job */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-normal">Current Job</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#3b9eff]">{userData.currentJob}</p>
            <p className="text-xs text-muted-foreground">Rank: {userData.rank}</p>
          </CardContent>
        </Card>
      </div>

      {/* Player lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recent Online Players */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Users className="h-4 w-4 text-[#f97316]" />
              Recent Online Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOnlinePlayers.map((player) => (
              <div key={player.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-secondary text-foreground text-xs">{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{player.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{player.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Most Active Players */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Trophy className="h-4 w-4 text-[#facc15]" />
              Most Active Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mostActivePlayers.map((player) => (
              <div key={player.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[#3b9eff] text-sm font-medium w-5">#{player.rank}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-secondary text-foreground text-xs">{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{player.name}</span>
                </div>
                <span className="text-sm text-[#3b9eff]">{player.hours}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Richest Players */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Crown className="h-4 w-4 text-[#facc15]" />
              Richest Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {richestPlayers.map((player) => (
              <div key={player.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[#3b9eff] text-sm font-medium w-5">#{player.rank}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-secondary text-foreground text-xs">{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{player.name}</span>
                </div>
                <span className="text-sm text-[#4ade80]">{player.money}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

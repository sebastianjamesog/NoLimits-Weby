"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Search, Clock, Calendar, CalendarDays, Crown, ChevronLeft, ChevronRight } from "lucide-react"
import { leaderboardPlayers } from "@/lib/data"
import { cn } from "@/lib/utils"

type TimeFilter = "all" | "week" | "today"

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const top3 = leaderboardPlayers.slice(0, 3)
  const restPlayers = leaderboardPlayers.slice(3)

  const totalPlayers = 247

  return (
    <div>
      <Header title="Leaderboard" subtitle="Top players ranked by kills and performance" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={timeFilter === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => setTimeFilter("all")}
            className={cn(
              "text-xs sm:text-sm",
              timeFilter === "all" ? "bg-[#3b9eff] hover:bg-[#2d8be8] text-white" : "bg-secondary text-foreground",
            )}
          >
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            All Time
          </Button>
          <Button
            variant={timeFilter === "week" ? "default" : "secondary"}
            size="sm"
            onClick={() => setTimeFilter("week")}
            className={cn(
              "text-xs sm:text-sm",
              timeFilter === "week" ? "bg-[#3b9eff] hover:bg-[#2d8be8] text-white" : "bg-secondary text-foreground",
            )}
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            This Week
          </Button>
          <Button
            variant={timeFilter === "today" ? "default" : "secondary"}
            size="sm"
            onClick={() => setTimeFilter("today")}
            className={cn(
              "text-xs sm:text-sm",
              timeFilter === "today" ? "bg-[#3b9eff] hover:bg-[#2d8be8] text-white" : "bg-secondary text-foreground",
            )}
          >
            <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Today
          </Button>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 2nd place - reorder on mobile */}
        <Card className="bg-card border-border order-2 md:order-1">
          <CardContent className="pt-6 text-center relative">
            <div className="absolute top-2 right-4 bg-[#c0c0c0] text-background text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              2
            </div>
            <Avatar className="h-16 sm:h-20 w-16 sm:w-20 mx-auto mb-3">
              <AvatarImage src={top3[1].avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-secondary text-foreground">{top3[1].name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground mb-1">{top3[1].name}</h3>
            <p className="text-xs text-[#4ade80] flex items-center justify-center gap-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              {top3[1].status}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-left">
                <p className="text-muted-foreground text-xs">Kills</p>
                <p className="text-foreground">{top3[1].kills.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-xs">Deaths</p>
                <p className="text-foreground">{top3[1].deaths.toLocaleString()}</p>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs">K/D Ratio</p>
                <p className="text-[#3b9eff]">{top3[1].kdRatio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1st place - first on mobile */}
        <Card className="bg-[#1a2a40] border-[#3b9eff]/30 order-1 md:order-2">
          <CardContent className="pt-6 text-center relative">
            <div className="absolute top-2 right-4">
              <Crown className="h-6 w-6 text-[#facc15]" />
            </div>
            <Avatar className="h-20 sm:h-24 w-20 sm:w-24 mx-auto mb-3 ring-2 ring-[#facc15]">
              <AvatarImage src={top3[0].avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-secondary text-foreground">{top3[0].name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-[#3b9eff] text-lg mb-1">{top3[0].name}</h3>
            <p className="text-xs text-[#4ade80] flex items-center justify-center gap-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              {top3[0].status}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-left">
                <p className="text-muted-foreground text-xs">Kills</p>
                <p className="text-foreground font-medium">{top3[0].kills.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-xs">Deaths</p>
                <p className="text-foreground">{top3[0].deaths.toLocaleString()}</p>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs">K/D Ratio</p>
                <p className="text-[#3b9eff] font-medium">{top3[0].kdRatio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3rd place */}
        <Card className="bg-card border-border order-3">
          <CardContent className="pt-6 text-center relative">
            <div className="absolute top-2 right-4 bg-[#cd7f32] text-background text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              3
            </div>
            <Avatar className="h-16 sm:h-20 w-16 sm:w-20 mx-auto mb-3">
              <AvatarImage src={top3[2].avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-secondary text-foreground">{top3[2].name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground mb-1">{top3[2].name}</h3>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              {top3[2].status}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-left">
                <p className="text-muted-foreground text-xs">Kills</p>
                <p className="text-foreground">{top3[2].kills.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-xs">Deaths</p>
                <p className="text-foreground">{top3[2].deaths.toLocaleString()}</p>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs">K/D Ratio</p>
                <p className="text-[#3b9eff]">{top3[2].kdRatio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-muted-foreground text-sm font-normal p-4">Rank</th>
                <th className="text-left text-muted-foreground text-sm font-normal p-4">Player</th>
                <th className="text-center text-muted-foreground text-sm font-normal p-4">Status</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Kills</th>
                <th className="text-center text-muted-foreground text-sm font-normal p-4">Deaths</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">K/D Ratio</th>
                <th className="text-center text-muted-foreground text-sm font-normal p-4">Headshots</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {restPlayers.map((player) => (
                <tr key={player.rank} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-muted-foreground">{player.rank}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-secondary text-foreground text-xs">
                          {player.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                        player.status === "Online"
                          ? "bg-[#4ade80]/20 text-[#4ade80]"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          player.status === "Online" ? "bg-[#4ade80]" : "bg-muted-foreground",
                        )}
                      />
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-foreground">{player.kills.toLocaleString()}</td>
                  <td className="p-4 text-center text-muted-foreground">{player.deaths.toLocaleString()}</td>
                  <td className="p-4 text-center text-[#3b9eff]">{player.kdRatio}</td>
                  <td className="p-4 text-center text-muted-foreground">{player.headshots.toLocaleString()}</td>
                  <td className="p-4 text-center text-foreground">{player.winRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing <span className="text-foreground">1-10</span> of{" "}
              <span className="text-foreground">{totalPlayers}</span> players
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3, 4].map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "ghost"}
                  size="icon"
                  className={cn("h-8 w-8", page === currentPage && "bg-[#3b9eff] hover:bg-[#2d8be8] text-white")}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <span className="text-muted-foreground px-1 sm:px-2">...</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentPage(25)}>
                25
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

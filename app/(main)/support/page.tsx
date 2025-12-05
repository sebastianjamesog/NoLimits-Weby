"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { AlertTriangle, Bug, HelpCircle, Upload, ArrowRight, Send, RotateCcw, Eye } from "lucide-react"
import { ticketCategories, recentTickets } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [subject, setSubject] = useState("")
  const [playerId, setPlayerId] = useState("")
  const [description, setDescription] = useState("")
  const [agreed, setAgreed] = useState(false)

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "alert":
        return <AlertTriangle className="h-5 w-5" />
      case "bug":
        return <Bug className="h-5 w-5" />
      default:
        return <HelpCircle className="h-5 w-5" />
    }
  }

  const getCategoryColor = (icon: string) => {
    switch (icon) {
      case "alert":
        return "text-[#ef4444] bg-[#ef4444]/20"
      case "bug":
        return "text-[#facc15] bg-[#facc15]/20"
      default:
        return "text-[#3b9eff] bg-[#3b9eff]/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-[#ef4444]/20 text-[#ef4444]"
      case "Medium":
        return "bg-[#facc15]/20 text-[#facc15]"
      case "Low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-[#3b9eff]/20 text-[#3b9eff]"
      case "Resolved":
        return "bg-[#4ade80]/20 text-[#4ade80]"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "FRP":
        return "bg-[#ef4444]/20 text-[#ef4444]"
      case "Bug":
        return "bg-[#facc15]/20 text-[#facc15]"
      default:
        return "bg-[#3b9eff]/20 text-[#3b9eff]"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Ticket submitted!")
  }

  const handleReset = () => {
    setSelectedCategory("")
    setPriority("")
    setSubject("")
    setPlayerId("")
    setDescription("")
    setAgreed(false)
  }

  return (
    <div>
      <Header title="Support Ticket" subtitle="Get help with FRP issues, bug reports, and other concerns" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {ticketCategories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "bg-card border-border cursor-pointer transition-all hover:border-[#3b9eff]/50",
              selectedCategory === category.id && "border-[#3b9eff]",
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className={cn("p-2 rounded-lg flex-shrink-0", getCategoryColor(category.icon))}>
                  {getCategoryIcon(category.icon)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {category.id === "frp"
                      ? "Fail Roleplay Reports"
                      : category.id === "bug"
                        ? "Technical Issues"
                        : "General Support"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Response time: {category.responseTime}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support ticket form */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-[#3b9eff]">Create Support Ticket</CardTitle>
          <CardDescription>Please fill out the form below to submit your support request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">
                  Category *
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {ticketCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-foreground">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-foreground">
                  Priority *
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="low" className="text-foreground">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="text-foreground">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-foreground">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">
                Subject *
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerId" className="text-foreground">
                Player ID / Steam ID
              </Label>
              <Input
                id="playerId"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Your in-game ID or Steam ID"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed information about your issue. Include steps to reproduce if it's a bug, or detailed explanation if it's an FRP issue."
                rows={5}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Attachments</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center hover:border-[#3b9eff]/50 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-foreground">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground">Screenshots, videos, or logs (Max 10MB)</p>
              </div>
            </div>

            <div className="flex items-start sm:items-center gap-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5 sm:mt-0"
              />
              <Label htmlFor="agree" className="text-xs sm:text-sm text-muted-foreground font-normal">
                I confirm that the information provided is accurate and I have read the server rules
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                type="submit"
                disabled={!agreed || !selectedCategory || !priority || !subject || !description}
                className="bg-[#3b9eff] hover:bg-[#2d8be8] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
              <Button type="button" variant="secondary" onClick={handleReset} className="bg-secondary text-foreground">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent tickets */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-[#3b9eff]">Your Recent Tickets</CardTitle>
          <CardDescription>Track the status of your submitted tickets</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[#3b9eff] text-sm font-normal p-4">Ticket ID</th>
                <th className="text-left text-[#3b9eff] text-sm font-normal p-4">Subject</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Category</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Priority</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Status</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Created</th>
                <th className="text-center text-[#3b9eff] text-sm font-normal p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="p-4 text-[#3b9eff] text-sm">{ticket.id}</td>
                  <td className="p-4 text-foreground text-sm">{ticket.subject}</td>
                  <td className="p-4 text-center">
                    <span className={cn("px-2 py-1 rounded-full text-xs", getCategoryBadgeColor(ticket.category))}>
                      {ticket.category}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={cn("px-2 py-1 rounded-full text-xs", getPriorityColor(ticket.priority))}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(ticket.status))}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-muted-foreground text-sm">{ticket.created}</td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#3b9eff]">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

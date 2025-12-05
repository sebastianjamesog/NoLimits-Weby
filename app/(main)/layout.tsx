import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pt-16 lg:pt-0 lg:ml-[150px] p-4 lg:p-6">{children}</main>
    </div>
  )
}

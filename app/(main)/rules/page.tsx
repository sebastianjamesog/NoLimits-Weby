"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { AlertTriangle, Users, Car, MessageCircle, Shield, Skull } from "lucide-react"

const rules = [
  {
    icon: AlertTriangle,
    title: "No Random Death Match (RDM)",
    description:
      "Do not kill other players without proper roleplay justification. All conflict must have in-character reasoning.",
    color: "text-[#ef4444]",
    bgColor: "bg-[#ef4444]/20",
  },
  {
    icon: MessageCircle,
    title: "No Fail Roleplay (FRP)",
    description:
      "Always stay in character during roleplay scenarios. Breaking character or acting unrealistically is not allowed.",
    color: "text-[#facc15]",
    bgColor: "bg-[#facc15]/20",
  },
  {
    icon: Users,
    title: "Respect All Players",
    description:
      "Treat everyone with respect. Harassment, discrimination, and toxic behavior will result in immediate action.",
    color: "text-[#3b9eff]",
    bgColor: "bg-[#3b9eff]/20",
  },
  {
    icon: Car,
    title: "No Vehicle Death Match (VDM)",
    description: "Do not use vehicles as weapons to kill or injure players without proper roleplay context.",
    color: "text-[#f97316]",
    bgColor: "bg-[#f97316]/20",
  },
  {
    icon: Shield,
    title: "No Metagaming",
    description:
      "Do not use out-of-character information for in-character advantage. Stream sniping is strictly prohibited.",
    color: "text-[#a855f7]",
    bgColor: "bg-[#a855f7]/20",
  },
  {
    icon: Skull,
    title: "Value Your Life",
    description:
      "Act as if your character's life is precious. Don't take unnecessary risks when your life is threatened.",
    color: "text-[#ec4899]",
    bgColor: "bg-[#ec4899]/20",
  },
]

export default function RulesPage() {
  return (
    <div>
      <Header title="Server Rules" subtitle="Read and understand our community guidelines" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className={`p-2 rounded-lg ${rule.bgColor}`}>
                  <rule.icon className={`h-5 w-5 ${rule.color}`} />
                </div>
                {rule.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{rule.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border mt-6">
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground">
            Violation of these rules may result in warnings, temporary bans, or permanent removal from the server.
            <br />
            <span className="text-[#3b9eff]">Join our Discord</span> for the complete rulebook and updates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

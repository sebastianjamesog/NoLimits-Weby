"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ShoppingCart, Star, Zap, Crown, Car, Home, Briefcase } from "lucide-react"

const storeItems = [
  {
    icon: Crown,
    title: "VIP Membership",
    description: "Priority queue, exclusive vehicles, and special perks",
    price: 9.99,
    popular: true,
    color: "text-[#facc15]",
    bgColor: "bg-[#facc15]/20",
  },
  {
    icon: Car,
    title: "Premium Car Pack",
    description: "Access to 50+ exclusive luxury and sports vehicles",
    price: 14.99,
    popular: false,
    color: "text-[#3b9eff]",
    bgColor: "bg-[#3b9eff]/20",
  },
  {
    icon: Home,
    title: "Property Pack",
    description: "Unlock exclusive mansions and penthouses",
    price: 19.99,
    popular: false,
    color: "text-[#4ade80]",
    bgColor: "bg-[#4ade80]/20",
  },
  {
    icon: Zap,
    title: "Starter Boost",
    description: "$500,000 in-game money to kickstart your journey",
    price: 4.99,
    popular: true,
    color: "text-[#f97316]",
    bgColor: "bg-[#f97316]/20",
  },
  {
    icon: Briefcase,
    title: "Business License",
    description: "Start your own legal business in the city",
    price: 24.99,
    popular: false,
    color: "text-[#a855f7]",
    bgColor: "bg-[#a855f7]/20",
  },
  {
    icon: Star,
    title: "Custom Character",
    description: "Exclusive clothing and customization options",
    price: 7.99,
    popular: false,
    color: "text-[#ec4899]",
    bgColor: "bg-[#ec4899]/20",
  },
]

export default function StorePage() {
  return (
    <div>
      <Header title="Store" subtitle="Purchase in-game items and memberships" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {storeItems.map((item, index) => (
          <Card key={index} className="bg-card border-border relative">
            {item.popular && (
              <div className="absolute -top-2 -right-2 bg-[#3b9eff] text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            <CardHeader>
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-2`}
              >
                <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
              </div>
              <CardTitle className="text-foreground text-base sm:text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xl sm:text-2xl font-bold text-[#4ade80]">${item.price}</span>
              <Button className="bg-[#3b9eff] hover:bg-[#2d8be8] text-white w-full sm:w-auto">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border mt-6">
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            All purchases are non-refundable. By purchasing, you agree to our terms of service.
            <br />
            <span className="text-[#3b9eff]">Need help?</span> Contact support for purchase-related issues.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

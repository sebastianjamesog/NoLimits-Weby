"use client"
import React, { useState, useEffect } from "react"
import { MessageCircle, ShieldCheck, ChevronRight, Gamepad2, Users } from "lucide-react"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDiscordLogin = () => {
    setIsLoading(true)
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const redirectUri = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/callback`
    const scopes = ['identify', 'guilds']
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`
    
    window.location.href = discordAuthUrl
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-[#3b9eff] selection:text-white">
      
      {/* Background Layer with Parallax-like fixity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: 'url(/backgroud.png)',
        }}
      >
        {/* Dark overlay gradients for depth and readability */}
        <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b9eff]/10 to-purple-900/10 mix-blend-overlay"></div>
      </div>

      {/* Decorative ambient lighting blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#3b9eff] opacity-20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[100px] rounded-full animate-pulse-slow pointer-events-none"></div>

      {/* Main Content Container */}
      <div className={`relative z-10 w-full max-w-5xl px-4 flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Left Side: Server Info / Hero Text (Desktop Only) */}
        <div className="hidden md:flex flex-col flex-1 text-left space-y-6 pr-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400 tracking-wide uppercase">Server Online</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.9]">
            NO LIMITS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b9eff] to-blue-400">ROLEPLAY</span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-md leading-relaxed border-l-2 border-[#3b9eff]/50 pl-4">
            Experience the next generation of immersive roleplay. Build your legacy, forge alliances, and live without boundaries.
          </p>

          <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#3b9eff]" />
              <span>Custom Framework</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#3b9eff]" />
              <span>Active Community</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md md:w-[420px]">
          <div className="relative group">
            {/* Card Glow Effect */}            
            {/* Card Content */}
            <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
              
              {/* Shine effect passing through */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

              {/* Header Section */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative w-24 h-24 mb-6 animate-float">
                  {/* Logo Glow */}
                  <div className="absolute inset-0 bg-[#3b9eff] rounded-full blur-xl opacity-40"></div>
                  <img 
                    src="/Logo.png" 
                    alt="NO LIMITS Logo"
                    className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,158,255,0.5)]"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white text-center mb-1 font-display tracking-wide">WELCOME BACK</h2>
                <p className="text-slate-400 text-sm text-center max-w-[280px]">
                  Please authenticate via Discord to access the dashboard and server whitelist.
                </p>
              </div>

              {/* Action Section */}
              <div className="space-y-4">
                <button
                  onClick={handleDiscordLogin}
                  disabled={isLoading}
                  className="group/btn relative w-full overflow-hidden rounded-xl bg-[#5865F2] hover:bg-[#4752c4] p-[1px] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#5865F2]/25"
                >
                  <div className="relative h-full w-full bg-gradient-to-r from-[#5865F2] to-[#4752c4] rounded-xl flex items-center justify-center py-4 px-6 gap-3">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-white font-semibold tracking-wide">CONNECTING...</span>
                      </div>
                    ) : (
                      <>
                        <MessageCircle className="w-6 h-6 text-white fill-white" />
                        <span className="text-white font-bold tracking-wide text-lg">LOGIN WITH DISCORD</span>
                        <ChevronRight className="w-5 h-5 text-white/50 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
                
                {/* Secondary Links */}
              </div>
            </div>
            
            {/* Bottom Footer Text within card area */}
            <div className="text-center mt-6">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Protected by No Limits Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

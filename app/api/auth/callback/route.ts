import { NextRequest, NextResponse } from "next/server"
import { exchangeCodeForToken, getDiscordUser, checkUserRoleInGuild } from "@/lib/discord"
import { createToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  if (error) {
    console.error("Discord OAuth error:", error, errorDescription)
    return NextResponse.json(
      { error: `Discord authorization failed: ${error}` },
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code provided" },
      { status: 400 }
    )
  }

  try {
    const redirectUri = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/callback`
    console.log("Auth callback initiated. Redirect URI:", redirectUri)

    // Exchange code for access token
    const accessToken = await exchangeCodeForToken(code, redirectUri)
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to exchange code for token. Check your Discord credentials." },
        { status: 401 }
      )
    }

    // Get Discord user info
    const discordUser = await getDiscordUser(accessToken)
    if (!discordUser) {
      return NextResponse.json(
        { error: "Failed to fetch user information" },
        { status: 401 }
      )
    }

    console.log("Discord user authenticated:", discordUser.id)

    // Check if user has required role in the guild
    const guildId = process.env.DISCORD_GUILD_ID
    const requiredRoleId = process.env.DISCORD_REQUIRED_ROLE_ID
    const botToken = process.env.DISCORD_BOT_TOKEN

    if (!guildId || !requiredRoleId || !botToken) {
      console.error("Missing Discord configuration:", {
        guildIdExists: !!guildId,
        requiredRoleIdExists: !!requiredRoleId,
        botTokenExists: !!botToken,
      })
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const hasRole = await checkUserRoleInGuild(botToken, guildId, discordUser.id, requiredRoleId)

    if (!hasRole) {
      console.warn(`User ${discordUser.id} does not have required role ${requiredRoleId}. Redirecting to whitelist.`)
      
      // Create temporary JWT token for whitelist quiz
      const jwtToken = await createToken({
        id: discordUser.id,
        username: discordUser.username,
        avatar: discordUser.avatar || undefined,
      })
      
      // Redirect to whitelist quiz with token in cookie
      const response = NextResponse.redirect(new URL("/whitelist", request.url))
      response.cookies.set({
        name: "auth-token",
        value: jwtToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })
      
      return response
    }

    console.log(`User ${discordUser.id} authorized with required role`)

    // Create JWT token
    const jwtToken = await createToken({
      id: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatar || undefined,
    })

    // Redirect to dashboard with token in cookie
    const response = NextResponse.redirect(new URL("/dashboard", request.url))
    response.cookies.set({
      name: "auth-token",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Auth callback error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

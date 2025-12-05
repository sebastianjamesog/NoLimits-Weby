import { NextResponse } from "next/server"

export async function GET() {
  // Only show debug info in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Debug endpoint only available in development" },
      { status: 403 }
    )
  }

  const config = {
    nodeEnv: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    discordClientIdExists: !!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    discordClientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ? "✓ Set" : "✗ Missing",
    discordClientSecretExists: !!process.env.DISCORD_CLIENT_SECRET,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET ? "✓ Set" : "✗ Missing",
    discordBotTokenExists: !!process.env.DISCORD_BOT_TOKEN,
    discordBotToken: process.env.DISCORD_BOT_TOKEN ? "✓ Set" : "✗ Missing",
    discordGuildIdExists: !!process.env.DISCORD_GUILD_ID,
    discordGuildId: process.env.DISCORD_GUILD_ID ? "✓ Set" : "✗ Missing",
    discordRequiredRoleIdExists: !!process.env.DISCORD_REQUIRED_ROLE_ID,
    discordRequiredRoleId: process.env.DISCORD_REQUIRED_ROLE_ID ? "✓ Set" : "✗ Missing",
    jwtSecretExists: !!process.env.JWT_SECRET,
    jwtSecret: process.env.JWT_SECRET ? "✓ Set" : "✗ Missing",
  }

  const missingVars = Object.entries(config)
    .filter(([key, value]) => key.includes("Exists") && value === false)
    .map(([key]) => key.replace("Exists", ""))

  return NextResponse.json({
    status: missingVars.length === 0 ? "All configured ✓" : "Missing configuration ✗",
    config,
    missingVariables: missingVars.length > 0 ? missingVars : "None",
    instructions:
      "Update your .env.local file with the missing values and restart the dev server",
  })
}

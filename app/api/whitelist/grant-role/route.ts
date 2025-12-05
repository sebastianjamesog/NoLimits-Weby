import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const guildId = process.env.DISCORD_GUILD_ID
    const whitelistRoleId = process.env.DISCORD_WHITELIST_ROLE_ID
    const roleToRemove = process.env.DISCORD_ROLE_TO_REMOVE
    const botToken = process.env.DISCORD_BOT_TOKEN

    if (!guildId || !whitelistRoleId || !botToken) {
      console.error("Missing Discord configuration for role grant")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Remove role if configured
    if (roleToRemove) {
      const removeResponse = await fetch(
        `https://discord.com/api/v10/guilds/${guildId}/members/${user.id}/roles/${roleToRemove}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bot ${botToken}`,
          },
        }
      )

      if (!removeResponse.ok && removeResponse.status !== 404) {
        console.error("Failed to remove role:", await removeResponse.text())
      } else {
        console.log(`Removed role ${roleToRemove} from user ${user.id}`)
      }
    }

    // Add whitelist role (required)
    const addResponse = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${user.id}/roles/${whitelistRoleId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!addResponse.ok) {
      console.error("Failed to add whitelist role:", await addResponse.text())
      return NextResponse.json(
        { error: "Failed to grant whitelist role" },
        { status: addResponse.status }
      )
    } else {
      console.log(`Added whitelist role ${whitelistRoleId} to user ${user.id}`)
    }

    console.log(`Role management completed for user ${user.id}: Removed ${roleToRemove || 'none'}, Added ${whitelistRoleId}`)

    return NextResponse.json({
      success: true,
      message: "Whitelist role granted successfully",
    })
  } catch (error) {
    console.error("Grant role error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

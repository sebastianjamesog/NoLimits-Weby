interface DiscordUser {
  id: string
  username: string
  avatar: string | null
}

interface DiscordMember {
  user: DiscordUser
  roles: string[]
}

const DISCORD_API_BASE = "https://discord.com/api/v10"

export async function getDiscordUser(accessToken: string): Promise<DiscordUser | null> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Failed to fetch Discord user:", error)
    return null
  }
}

export async function getUserGuilds(accessToken: string): Promise<any[]> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) return []
    return response.json()
  } catch (error) {
    console.error("Failed to fetch user guilds:", error)
    return []
  }
}

export async function checkUserRoleInGuild(
  botToken: string,
  guildId: string,
  userId: string,
  requiredRoleId: string
): Promise<boolean> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/guilds/${guildId}/members/${userId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) return false

    const member = (await response.json()) as DiscordMember
    return member.roles.includes(requiredRoleId)
  } catch (error) {
    console.error("Failed to check user role:", error)
    return false
  }
}

export async function exchangeCodeForToken(code: string, redirectUri: string): Promise<string | null> {
  try {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    const clientSecret = process.env.DISCORD_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("Missing Discord credentials:", {
        clientIdExists: !!clientId,
        clientSecretExists: !!clientSecret,
      })
      return null
    }

    const response = await fetch(`${DISCORD_API_BASE}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        scope: "identify guilds",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to exchange code:", errorText)
      return null
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Failed to exchange code for token:", error)
    return null
  }
}

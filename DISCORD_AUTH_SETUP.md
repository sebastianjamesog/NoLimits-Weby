# Discord Authentication Setup Guide

This application uses Discord OAuth2 authentication with role-based access control. Follow these steps to set up the backend properly.

## Prerequisites

1. A Discord Server
2. A Discord Application (Bot)
3. Node.js and npm/pnpm installed

## Step 1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it
3. Go to "OAuth2" → "General"
4. Copy your **Client ID** and **Client Secret**
5. Under "Redirects", add: `http://localhost:3000/api/auth/callback` (for development)

## Step 2: Create a Discord Bot

1. In your application, go to "Bot" section
2. Click "Add Bot"
3. Under "TOKEN", click "Copy" to get your **Bot Token**
4. Give your bot necessary permissions:
   - Read Messages/View Channels
   - Read Message History
   - Identify

## Step 3: Get Your Discord IDs

### Guild ID (Server ID):
1. Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
2. Right-click on your server name and click "Copy Server ID"

### Role ID:
1. Right-click on the role that should have access and click "Copy Role ID"

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values:

```env
# Discord OAuth2 Configuration
NEXT_PUBLIC_DISCORD_CLIENT_ID=<your_client_id>
DISCORD_CLIENT_SECRET=<your_client_secret>
DISCORD_BOT_TOKEN=<your_bot_token>
DISCORD_GUILD_ID=<your_guild_id>
DISCORD_REQUIRED_ROLE_ID=<your_required_role_id>

# JWT Configuration (generate a strong secret, min 32 chars)
JWT_SECRET=<your_strong_secret_key_here>

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## Step 5: Install Dependencies

```bash
npm install
# or
pnpm install
```

## Step 6: Invite Bot to Your Server

1. Go to OAuth2 → URL Generator in your application
2. Select scopes: `bot`, `identify`, `guilds`
3. Select permissions: `View Channels`, `Read Messages`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

## Step 7: Run the Application

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## How It Works

### Login Flow:
1. User clicks "Login with Discord" button
2. User is redirected to Discord's OAuth2 authorization page
3. After authorization, Discord redirects to `/api/auth/callback`
4. The callback endpoint:
   - Exchanges the code for an access token
   - Fetches user information from Discord
   - Checks if user has the required role in the guild
   - Creates a JWT token and stores it in an HTTP-only cookie
   - Redirects to dashboard

### Protected Routes:
- `/dashboard` and all routes under `/(main)` require authentication
- The middleware checks for valid JWT token
- Invalid/missing tokens redirect to login page

### Logout:
- Clicking logout clears the authentication cookie
- User is redirected to home page

## API Endpoints

- `GET /api/auth/callback` - OAuth2 callback (automatic)
- `GET /api/auth/me` - Check current user info (requires auth)
- `POST /api/auth/logout` - Logout user

## Troubleshooting

### "Invalid Client ID"
- Check that `NEXT_PUBLIC_DISCORD_CLIENT_ID` is correct
- Make sure it matches your Discord application

### "User does not have required role"
- Verify the user has the role assigned in Discord
- Check that `DISCORD_REQUIRED_ROLE_ID` is correct
- Ensure your bot has permission to check member roles

### "Failed to exchange code"
- Check `DISCORD_CLIENT_SECRET` is correct
- Verify `NEXTAUTH_URL` matches your application URL
- Check that redirect URI in Discord app matches: `{NEXTAUTH_URL}/api/auth/callback`

### Token errors
- Ensure `JWT_SECRET` is at least 32 characters
- Check that cookies are enabled in browser

## Security Notes

1. Always use strong JWT secrets (min 32 characters)
2. Keep `DISCORD_CLIENT_SECRET` and `DISCORD_BOT_TOKEN` secret
3. Use HTTPS in production
4. Set `NODE_ENV=production` when deploying
5. Update `NEXTAUTH_URL` to your production domain

## Production Deployment

Before deploying:

1. Update all environment variables for production
2. Add production redirect URI in Discord app: `https://yourdomain.com/api/auth/callback`
3. Set `NODE_ENV=production`
4. Ensure HTTPS is enabled
5. Use a secure database for user data (optional)

# Discord Authentication Troubleshooting Guide

## Issue: "Missing Discord credentials: { clientIdExists: false, clientSecretExists: true }"

This error means the `NEXT_PUBLIC_DISCORD_CLIENT_ID` environment variable is not being loaded.

### **Solution:**

1. **Check your `.env.local` file** - Make sure it has:
   ```env
   NEXT_PUBLIC_DISCORD_CLIENT_ID=your_actual_client_id
   DISCORD_CLIENT_SECRET=your_actual_client_secret
   ```

   **IMPORTANT:** The variable name MUST be `NEXT_PUBLIC_DISCORD_CLIENT_ID` (not `DISCORD_CLIENT_ID`)

2. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   # or
   pnpm dev
   ```

3. **Verify configuration** by visiting:
   ```
   http://localhost:3000/api/auth/debug
   ```
   
   This should show all your environment variables as "✓ Set"

## Common Issues

### Issue: All variables show as "✗ Missing"
- Make sure `.env.local` file exists in the project root
- Check that all values are filled in (not empty)
- Verify you restarted the dev server after creating/updating `.env.local`

### Issue: Still getting "Failed to exchange code" error
1. Visit `http://localhost:3000/api/auth/debug` to see which variables are missing
2. Check that `NEXT_PUBLIC_DISCORD_CLIENT_ID` (with the prefix!) is set
3. Verify the values are correct by checking Discord Developer Portal

### Issue: "You do not have the required role"
- Make sure you have the role assigned in your Discord server
- Verify `DISCORD_GUILD_ID` and `DISCORD_REQUIRED_ROLE_ID` are correct
- Check that your bot has permission to read member roles

### Issue: "Invalid Form Body" Discord error
- Check that `NEXT_PUBLIC_DISCORD_CLIENT_ID` is not empty
- Verify the Client Secret is correct in Discord Developer Portal
- Make sure your Redirect URI matches: `http://localhost:3000/api/auth/callback`

## Environment Variables Reference

```env
# Must include NEXT_PUBLIC_ prefix - used by both server and client
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id

# Server-side only - DO NOT include NEXT_PUBLIC_
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_guild_id
DISCORD_REQUIRED_ROLE_ID=your_role_id
JWT_SECRET=your_jwt_secret

# Application config
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## How to Get Your Values

### Client ID & Client Secret
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click your application
3. Go to "OAuth2" → "General"
4. Copy the **Client ID** and **Client Secret**

### Bot Token
1. In your application, go to "Bot"
2. Under "TOKEN", click "Copy"

### Guild ID (Server ID)
1. Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
2. Right-click your server name
3. Click "Copy Server ID"

### Role ID
1. Right-click the role in your server
2. Click "Copy Role ID"

## Testing the Fix

1. Update `.env.local` with correct values
2. Restart dev server
3. Visit `http://localhost:3000/api/auth/debug` - all should show "✓ Set"
4. Click "LOGIN WITH DISCORD" button
5. You should be redirected to Discord to authorize
6. After authorizing, you should be redirected to `/dashboard`

## Still Having Issues?

Run this command to verify Node.js can read your environment file:
```bash
node -e "console.log(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID)"
```

If it shows `undefined`, the `.env.local` file isn't being loaded properly.

For Next.js apps, the `.env.local` file must be:
- In the project root directory (same level as `package.json`)
- Named exactly `.env.local`
- Properly formatted with `KEY=VALUE` on each line

## Need More Help?

Check the application logs in your terminal for detailed error messages. They usually show:
- Which step of the OAuth flow failed
- Why it failed
- What configuration is missing

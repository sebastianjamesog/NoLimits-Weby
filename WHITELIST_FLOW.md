# Whitelist Quiz System - Complete Flow Documentation

## Overview

The whitelist system is now fully integrated with Discord role management:
1. User tries to access the dashboard
2. System checks if user has the `DISCORD_REQUIRED_ROLE_ID` role
3. If they DON'T have it → Redirect to whitelist quiz
4. If they pass the quiz (60%+) → Automatically award them the `DISCORD_WHITELIST_ROLE_ID` role
5. User can then access the dashboard

## Architecture

### User Flow Diagram

```
User Logs In with Discord
        ↓
[Check User's Roles]
        ↓
    ┌───┴────────────────────┐
    ↓                        ↓
Has Required Role?      No Required Role
    ↓                        ↓
[Dashboard Access]     [Whitelist Quiz]
                              ↓
                         ┌─────┴─────┐
                         ↓           ↓
                      Pass      Fail (< 60%)
                      (60%+)        ↓
                         ↓      [Retry Option]
                    [Grant Whitelist Role]
                         ↓
                    [Dashboard Access]
```

## Components & Files

### 1. **Whitelist Quiz Page**
- **File**: `app/(main)/whitelist/page.tsx`
- **Purpose**: Main quiz container
- **Features**:
  - Game state management (START, PLAYING, FINISHED)
  - Timer management (30 seconds per question)
  - Score calculation
  - Question shuffling

### 2. **Quiz Components**

#### StartScreen.tsx
- Displays introduction and instructions
- "Start Quiz" button

#### QuizScreen.tsx
- Shows current question
- Multiple choice options (A, B, C, D)
- Timer countdown with warnings
- Progress bar

#### ResultScreen.tsx
- Shows score and percentage
- Pass/Fail status
- **NEW**: Automatically grants whitelist role on pass
- "Try Again" or "Go to Dashboard" buttons

### 3. **API Endpoints**

#### `/api/auth/callback` (Existing)
- Handles Discord OAuth callback
- Checks if user has `DISCORD_REQUIRED_ROLE_ID`
- Creates JWT token

#### `/api/whitelist/grant-role` (NEW)
- **Method**: POST
- **Authentication**: Requires valid JWT token
- **Purpose**: Awards `DISCORD_WHITELIST_ROLE_ID` to user after passing quiz
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Whitelist role granted successfully"
  }
  ```

## Environment Variables

### Required for Whitelist System

```env
# Discord OAuth Configuration
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_guild_id

# TWO DIFFERENT ROLES NEEDED:

# 1. DISCORD_REQUIRED_ROLE_ID
# Role that users NEED to access the dashboard
# If they don't have this role → they see the whitelist quiz
DISCORD_REQUIRED_ROLE_ID=your_required_role_id

# 2. DISCORD_WHITELIST_ROLE_ID
# Role that gets AWARDED after passing the whitelist quiz
# This is what grants them access
DISCORD_WHITELIST_ROLE_ID=your_whitelist_role_id

# JWT Configuration
JWT_SECRET=your_strong_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## How to Set Up Two Separate Roles

### Step 1: Create Both Roles in Discord

1. **Access Control Role** (Required for Dashboard Access)
   - Name: "Whitelisted" or similar
   - This is the role users must have to access the dashboard

2. **Whitelist Award Role** (Same as Required Role)
   - Can be the same role or a different one
   - Usually the same role that you check for access

### Step 2: Configure Environment Variables

Get the role IDs:
1. Enable Developer Mode in Discord
2. Right-click each role
3. Click "Copy Role ID"
4. Set in `.env.local`:
   ```env
   DISCORD_REQUIRED_ROLE_ID=role_id_to_check
   DISCORD_WHITELIST_ROLE_ID=role_id_to_award
   ```

### Step 3: Update Your Bot Permissions

Ensure your bot has:
- `Manage Roles` permission
- The whitelist role must be BELOW the bot's role in the role hierarchy

## Quiz Passing Flow

### When User Passes (60%+)

1. **ResultScreen Component** detects pass:
   ```typescript
   const passed = percentage >= 60;
   ```

2. **useEffect Hook** calls grant-role API:
   ```typescript
   useEffect(() => {
     if (passed) {
       fetch('/api/whitelist/grant-role', { method: 'POST' })
     }
   }, [passed])
   ```

3. **Grant-Role API** authenticates user:
   - Verifies JWT token in cookie
   - Retrieves Discord IDs from env

4. **Discord API Call** assigns role:
   ```
   PUT /guilds/{GUILD_ID}/members/{USER_ID}/roles/{WHITELIST_ROLE_ID}
   ```

5. **Success Response** confirms role granted

## Integration with Dashboard

### Current Implementation

The whitelist page is:
- ✅ Removed from sidebar navigation
- ✅ Not in the main menu
- ✅ Only accessible via direct URL or as a redirect

### Future Enhancement Needed

To fully implement the role-based redirect, you'll need to add middleware that:
1. Checks user's JWT token
2. Verifies if user has `DISCORD_REQUIRED_ROLE_ID`
3. Redirects to `/whitelist` if role is missing

Example middleware logic:
```typescript
// In middleware.ts
if (user.roles && !user.roles.includes(DISCORD_REQUIRED_ROLE_ID)) {
  return NextResponse.redirect(new URL('/whitelist', request.url))
}
```

## API Security

### Grant-Role Endpoint Security

✅ **Requires Authentication**
- Must have valid JWT token in cookie
- Token is verified before processing

✅ **User-Specific**
- Only grants role to authenticated user
- Cannot grant roles to other users

✅ **Server-Side Only**
- Client Secret is never exposed
- Bot token is server-side only
- Environment variables are not accessible to browser

## Testing Checklist

- [ ] User without required role sees whitelist quiz
- [ ] Quiz displays 5 questions correctly
- [ ] Timer counts down (30s per question)
- [ ] Time-up auto-advances question
- [ ] Score calculates correctly
- [ ] Pass/Fail logic works (60% threshold)
- [ ] On pass: Discord role is granted automatically
- [ ] On fail: "Retry" button works
- [ ] User can access dashboard after passing

## Troubleshooting

### Role Not Being Granted

**Check**:
1. `DISCORD_WHITELIST_ROLE_ID` is set correctly in `.env.local`
2. Bot has "Manage Roles" permission
3. Whitelist role is below bot's role in hierarchy
4. Check server console for error messages

### Grant-Role API Returns 403

**Likely causes**:
- Bot doesn't have "Manage Roles" permission
- Whitelist role is higher than bot's role
- Role ID is incorrect

**Solution**:
1. Check bot permissions in Discord server
2. Verify role hierarchy (bot must be above whitelist role)
3. Confirm role ID is correct

### User Can Still Access Dashboard Without Quiz

**Check**:
- Middleware is not yet implemented
- Currently users must manually navigate to quiz or access without role

**Solution**:
- Implement role-checking middleware (see Future Enhancement section)

## File Structure Summary

```
app/(main)/whitelist/
├── page.tsx                              # Main quiz container
├── types.ts                              # TypeScript definitions
├── components/
│   ├── StartScreen.tsx                   # Intro screen
│   ├── QuizScreen.tsx                    # Active quiz
│   └── ResultScreen.tsx                  # Results + role grant
└── data/
    └── questions.ts                      # Quiz questions

app/api/whitelist/
└── grant-role/
    └── route.ts                          # Role granting endpoint

components/sidebar.tsx                    # (Updated: removed whitelist link)
.env.local                               # (Updated: new role variable)
```

## Next Steps

1. **Set up Discord roles**:
   - Create access control role
   - Create whitelist award role

2. **Update `.env.local`**:
   ```env
   DISCORD_WHITELIST_ROLE_ID=your_role_id
   ```

3. **Test the flow**:
   - Login without the role
   - Take the quiz
   - Verify role was granted in Discord

4. **Implement middleware** (Optional):
   - Add role checking to protect routes
   - Auto-redirect to whitelist if needed

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment variable configuration
3. Verify Discord bot permissions
4. Check server console logs for errors

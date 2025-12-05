# Whitelist Quiz System Documentation

## Overview

The whitelist quiz system is an interactive quiz module that tests users' knowledge before granting them access to the server. Users must score at least 60% to pass the quiz.

## System Architecture

### Directory Structure
```
app/(main)/whitelist/
├── page.tsx                    # Main page component
├── types.ts                    # TypeScript interfaces
├── components/
│   ├── StartScreen.tsx         # Quiz start screen
│   ├── QuizScreen.tsx          # Active quiz screen
│   └── ResultScreen.tsx        # Results screen
└── data/
    └── questions.ts           # Quiz questions database
```

## Components

### 1. **StartScreen Component**
Displays the initial quiz introduction screen with:
- Server logo
- Quiz title and description
- Instructions on how the quiz works
- "Start Quiz" button

**File**: `components/StartScreen.tsx`

### 2. **QuizScreen Component**
Displays the active quiz with:
- Question counter (e.g., "Question 1 of 5")
- 30-second countdown timer with color warnings
- Progress bar showing completion
- Multiple choice options (A, B, C, D)
- Time warning when under 5 seconds

**File**: `components/QuizScreen.tsx`

### 3. **ResultScreen Component**
Shows the quiz results with:
- Pass/Fail indicator with icons
- Score percentage
- Score breakdown (e.g., "4 out of 5")
- Custom message based on result
- "Try Again" button (if failed)
- "Go to Dashboard" button

**File**: `components/ResultScreen.tsx`

## Game Flow

```
START
  ↓
[StartScreen] ← User clicks "Start Quiz"
  ↓
[QuizScreen] ← Display question 1
  ↓
[User answers] ← Check answer
  ↓
[More questions?] → Yes → Next question
  ↓
  No → Go to ResultScreen
  ↓
[ResultScreen] ← Show score
  ↓
[Check score >= 60%]
  ├─→ PASS → "Go to Dashboard"
  └─→ FAIL → "Try Again"
```

## Question Structure

Each question in `data/questions.ts` follows this format:

```typescript
{
  id: 1,
  question: "What is the capital of France?",
  options: ["London", "Berlin", "Paris", "Madrid"],
  correctOption: 2,  // Index of the correct answer (0-based)
}
```

## Game States

The quiz uses three game states defined in `types.ts`:

```typescript
enum GameState {
  START = 'START',      // Initial state
  PLAYING = 'PLAYING',  // Quiz in progress
  FINISHED = 'FINISHED' // Quiz completed
}
```

## Key Features

### ✅ Timer System
- **Duration**: 30 seconds per question
- **Auto-advance**: Time up counts as wrong answer
- **Visual feedback**: Color changes based on remaining time
  - Green: > 10 seconds
  - Yellow: 5-10 seconds
  - Red: < 5 seconds with warning

### ✅ Shuffling Algorithm
- Questions are shuffled using Fisher-Yates algorithm
- Answer options are also shuffled for each question
- Ensures randomized quiz experience

### ✅ Scoring System
- 1 point per correct answer
- Pass score: 60% or higher
- Percentage calculated: (score / totalQuestions) * 100

### ✅ User Feedback
- Visual feedback on answer selection
- Time warnings when running low
- Progress bar showing quiz completion
- Encouraging messages after completion

## Styling

All components use:
- **Tailwind CSS** for styling
- **Lucide React** icons for visual elements
- **Dark theme** matching the server's design
- **Responsive design** for mobile and desktop

Color scheme:
- Primary: `#3b9eff` (Blue)
- Background: `#0f172a` (Dark)
- Secondary: `#1e3a5f` (Navy)
- Success: `#4ade80` (Green)
- Warning: `#f97316` (Orange)
- Error: `#ff5252` (Red)

## Data Management

### Adding Questions

To add new questions, edit `data/questions.ts`:

```typescript
{
  id: 6,
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctOption: 0,  // Index of correct answer
}
```

**Important**: Ensure `correctOption` uses 0-based indexing (0, 1, 2, or 3)

## Integration Points

### Navigation
The whitelist page is available via:
- Direct URL: `/whitelist`
- Sidebar menu item (with CheckCircle icon)

### User Flow
1. User navigates to `/whitelist` from sidebar
2. Sees StartScreen with instructions
3. Clicks "Start Quiz"
4. Answers 5 randomized questions
5. Gets instant feedback on results
6. Can retry if failed or proceed to dashboard if passed

### Future Integration
The system is designed to integrate with:
- Discord whitelist database
- User role assignment
- Automatic role grants on pass
- Activity logging

## Testing Checklist

- [ ] Quiz starts when button is clicked
- [ ] Questions display correctly
- [ ] Timer counts down from 30 to 0
- [ ] Time-up auto-advances question
- [ ] Score calculates correctly
- [ ] Pass/Fail logic works (60% threshold)
- [ ] Retry button works
- [ ] Dashboard button works
- [ ] Mobile responsive design works
- [ ] All icons display correctly

## Performance Notes

- Component re-renders optimized with `useCallback` hooks
- Timer interval cleaned up on component unmount
- No unnecessary re-renders during timer countdown
- Memory efficient array shuffling

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential improvements:
- [ ] Backend integration to save scores
- [ ] Database persistence of passed users
- [ ] Custom questions per server/guild
- [ ] Difficulty levels
- [ ] Time limits per quiz
- [ ] Leaderboard integration
- [ ] Animated transitions between screens
- [ ] Sound effects for correct/wrong answers
- [ ] Question hints (optional)
- [ ] Multiple choice of question sets

## Troubleshooting

### Quiz not starting
- Check browser console for errors
- Verify `page.tsx` is in correct directory
- Ensure all imports are correct

### Timer not working
- Check browser DevTools console
- Verify `useEffect` cleanup is properly implemented
- Check for multiple timer intervals

### Styling issues
- Clear browser cache
- Verify Tailwind CSS is properly configured
- Check that color classes match design system

## Maintenance

### Adding Questions
1. Edit `data/questions.ts`
2. Add new question object to array
3. Increment `id` number
4. Test thoroughly

### Updating Design
1. Modify color values in components
2. Update className strings
3. Test on mobile devices
4. Verify accessibility

### Performance Monitoring
- Monitor component re-render frequency
- Check timer memory leaks
- Validate shuffle algorithm efficiency

## Support

For issues or questions about the whitelist system, refer to the main project documentation or contact the development team.

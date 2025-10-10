# Trainer Refactoring Guide

This document outlines the refactoring pattern used for TacticsTrainer and shows how to apply it to other trainers.

## Changes Made to TacticsTrainer

### 1. Improved Imports
- Replaced individual `useSound` imports with centralized `useSounds` hook from `@hooks/use-sound`
- Added `lucide-react` icons (ThumbsUp, ThumbsDown, ExternalLink) for cleaner, consistent icons

### 2. New Design Pattern
- Moved from inline SVG icons to Lucide React icons
- Created a cleaner, more modern card-based layout
- Improved status indicators with better visual feedback
- Enhanced PGN display with better interactivity

### 3. Code Structure
- Extracted reusable utility functions to `@utils/trainer-helpers`:
  - `makeMove()`: Safely makes moves without errors
  - `showMoveSequence()`: Shows move sequences with delays
- Created shared components in `src/components/training/shared/`:
  - `TrainerContainer`: Wrapper with loading overlay
  - `TrainerHeader`: Consistent header styling
  - `SoundToggle`: Reusable sound toggle component
  - `StatusIndicator`: Shows none/correct/incorrect with icons and Lichess link
  - `PgnNavigator`: Move list with clickable navigation

## How to Apply to Other Trainers

### Step 1: Update Imports
Replace:
```typescript
import useSound from 'use-sound'
// ...
const [correctSound] = useSound('/sfx/correct.mp3')
const [incorrectSound] = useSound('/sfx/incorrect.mp3')
```

With:
```typescript
import { useSounds } from '@hooks/use-sound'
// ...
const { correctSound, incorrectSound } = useSounds()
```

Also add shared component imports:
```typescript
import { makeMove, showMoveSequence } from '@utils/trainer-helpers'
import PgnNavigator from '../shared/PgnNavigator'
import SoundToggle from '../shared/SoundToggle'
import StatusIndicator from '../shared/StatusIndicator'
import TrainerContainer from '../shared/TrainerContainer'
```

### Step 2: Replace `makeMove` Function
Replace the try-catch makeMove function with:
```typescript
const handleMove = (move: string) => {
  makeMove(game, move)
  setPosition(game.fen())
}
```

### Step 3: Replace `showIncorrectSequence`
Replace the manual timeout loop with:
```typescript
const showIncorrectSequence = async () => {
  if (!currentPuzzle) return
  await showMoveSequence(
    game,
    currentPuzzle.moves,
    game.history().length,
    handleMove,
  )
  setPosition(game.fen())
}
```

### Step 4: Replace Status Display
Replace the manual status SVGs with:
```typescript
<StatusIndicator
  status={puzzleStatus}
  orientation={orientation}
  puzzleId={currentPuzzle?.puzzleid}
/>
```

### Step 5: Replace PGN Display
Replace the manual PGN mapping with:
```typescript
<PgnNavigator
  game={game}
  puzzleFinished={puzzleFinished}
  onMoveClick={handleMoveClick}
  basePosition={currentPuzzle?.fen}
/>
```

And add the handler:
```typescript
const handleMoveClick = (moveIndex: number) => {
  if (!currentPuzzle) return
  const newGame = new Chess(currentPuzzle.fen)
  for (let i = 0; i <= moveIndex; i++) {
    newGame.move(game.history()[i]!)
  }
  setPosition(newGame.fen())
  trackEventOnClient('endgame_set_jump_to_move', {})
}
```

### Step 6: Replace Sound Toggle
Replace the manual sound toggle SVG with:
```typescript
<SoundToggle
  soundEnabled={soundEnabled}
  onToggle={() => setSoundEnabled(!soundEnabled)}
/>
```

### Step 7: Use TrainerContainer
Wrap the main trainer content with:
```typescript
<TrainerContainer loading={loading}>
  {/* existing content */}
</TrainerContainer>
```

Remove manual loading overlay code.

## Design Improvements

### Modern Card Layout
The new design uses:
- `bg-card-light/20` for outer containers
- `bg-card` for inner containers
- `bg-card-dark` for status indicators
- Consistent rounded corners with `rounded-lg`
- Shadow effects for depth

### Icon Usage
- Use Lucide React icons for better consistency
- `ThumbsUp` / `ThumbsDown` for correct/incorrect
- `ExternalLink` for Lichess links
- SVG for chess piece orientation indicator

### Color Scheme
- Lime-500 for correct
- Red-500 for incorrect
- Purple-700 for borders and accents
- Orange-500 for headers

## Testing Checklist
After refactoring each trainer, test:
- [ ] Settings page loads correctly
- [ ] Puzzle loads and displays
- [ ] Moves can be played
- [ ] Correct/incorrect feedback works
- [ ] Sound effects play (if enabled)
- [ ] PGN navigation works (after puzzle complete)
- [ ] Auto-next works (if enabled)
- [ ] Skip/Show solution works
- [ ] Exit button returns to correct page
- [ ] XP tracking updates
- [ ] All statistics update correctly

## Trainers Status
- [x] TacticsTrainer - Completed
- [ ] EndgameTrainer - In Progress
- [ ] RecallTrainer - Pending
- [ ] VisualisationTrainer - Pending
- [ ] CourseTrainer - Pending (most complex, requires special handling)

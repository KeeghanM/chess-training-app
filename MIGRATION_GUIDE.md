# React Query & Zustand Migration Guide

## Overview

This document outlines the new patterns for data fetching and state management in the Chess Training App, following the guidelines established in `AGENTS.md`.

## Architecture

### Data Fetching with React Query
- **Server state**: Use React Query hooks organized by domain
- **Location**: `src/hooks/use-{domain}-queries.ts`
- **Pattern**: One hook function per domain that returns direct queries and factory functions

### Client State with Zustand
- **Client-side state**: Use Zustand stores for UI state, user preferences, etc.
- **Location**: `src/stores/{store-name}-store.ts`
- **Pattern**: Organized stores with actions and persistent preferences

## Hook Patterns

### Structure Example
```typescript
// src/hooks/use-puzzle-queries.ts
export function usePuzzleQueries() {
  // --- Data fetching ---
  const puzzlesQuery = useQuery({...}) // Direct access
  
  // Factory function for parameterized queries
  const usePuzzleQuery = (puzzleId: string) => useQuery({...})
  
  // --- Mutations ---
  const createPuzzle = useMutation({...})
  
  return {
    puzzlesQuery,        // Direct access
    usePuzzleQuery,      // Factory function
    createPuzzle,        // Mutation
  }
}
```

### Usage Example
```typescript
// In components
const { puzzlesQuery, usePuzzleQuery, createPuzzle } = usePuzzleQueries()
const { data: puzzles, isLoading } = puzzlesQuery
const puzzleQuery = usePuzzleQuery(puzzleId)
const { data: puzzle } = puzzleQuery

// Using mutations
createPuzzle.mutate(newPuzzleData)
```

## Current Implementation Status

### ✅ Completed Hooks
- **Profile Queries** (`use-profile-queries.ts`)
  - `useProfileQueries()` - User profile and XP management
  
- **Puzzle Queries** (`use-puzzle-queries.ts`)
  - `usePuzzleQueries()` - Individual puzzles and training puzzles
  
- **Tactics Queries** (`use-tactics-queries.ts`)
  - `useTacticsQueries()` - Tactics sets, rounds, and statistics
  
- **Course Queries** (`use-course-queries.ts`)
  - `useCourseQueries()` - Course management and purchases
  
- **Admin Queries** (`use-admin-queries.ts`)
  - `useAdminQueries()` - Admin functionality for curated sets and badges

### ✅ Completed Stores
- **App Store** (`app-store.ts`)
  - User preferences (sound, auto-next, theme)
  - UI state (loading, modals, errors)
  - Persistent preferences with Zustand persist middleware

### ✅ Updated Components
- **XpTracker** - Migrated from raw fetch to React Query
- **PuzzleList** (Admin) - Migrated from inline useQuery to hook pattern
- **Providers** - Updated with new QueryClient configuration

## Migration Plan

### Phase 1: Core Hooks (✅ DONE)
- Profile management
- Puzzle operations
- Tactics/training functionality
- Course management
- Admin operations

### Phase 2: Component Migration
- [ ] **TacticsTrainer** - Major component using multiple endpoints
- [ ] **TacticsSetCreator** - Admin component for creating sets
- [ ] **BadgeCreator/ExistingBadges** - Badge management
- [ ] **GetPremiumButton** - Subscription management
- [ ] **Dashboard components** - User dashboard

### Phase 3: Additional Domains
- [ ] **Subscription/Ecommerce hooks** (`use-subscription-queries.ts`)
- [ ] **Mail/Contact hooks** (`use-mail-queries.ts`)
- [ ] **Endgames hooks** (`use-endgame-queries.ts`)
- [ ] **Visualisation hooks** (`use-visualisation-queries.ts`)

### Phase 4: State Management
- [ ] **Game State Store** - Chess game state for training components
- [ ] **Navigation Store** - UI navigation state
- [ ] **Settings Store** - Extended user settings

## Key Benefits

1. **Consistent Patterns** - All data fetching follows the same structure
2. **Better Error Handling** - Centralized error handling with React Query
3. **Caching** - Automatic caching and invalidation
4. **TypeScript** - Full type safety with Prisma types
5. **Performance** - Optimistic updates and background refetching
6. **Developer Experience** - React Query DevTools integration

## Next Steps

1. **Migrate TacticsTrainer** - High-impact component with multiple data operations
2. **Add remaining domain hooks** - Cover all API endpoints
3. **Migrate admin components** - Complete admin functionality migration
4. **Add specialized stores** - Game state and UI management
5. **Testing** - Add tests for hooks and stores

## Usage Guidelines

- **Import directly**: Use `@hooks/use-domain-queries` imports
- **Destructure wisely**: Only destructure what you need from hooks
- **Handle loading states**: Always handle `isLoading` and `error` states
- **Use mutations properly**: Leverage `onSuccess`/`onError` callbacks
- **Invalidate queries**: Ensure proper cache invalidation after mutations
- **Store client state**: Use Zustand for non-server state only

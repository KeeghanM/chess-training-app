// Export all query hooks for easy importing
export { useAdminQueries } from './use-admin-queries'
export { useCourseQueries } from './use-course-queries'
export { useProfileQueries } from './use-profile-queries'
export { usePuzzleQueries } from './use-puzzle-queries'
export { useTacticsQueries } from './use-tactics-queries'

// Export types
export type { Badge, CuratedSet, CuratedSetPuzzle } from './use-admin-queries'
export type { UserProfile, XpUpdate } from './use-profile-queries'
export type { TrainingPuzzle } from './use-puzzle-queries'
export type { TacticsRound, TacticsSet } from './use-tactics-queries'

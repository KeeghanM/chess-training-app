import { z } from 'zod'

// Schema for tactics set ID operations (archive, restore, delete, reset)
export const TacticsSetIdSchema = z.object({
  setId: z.string().min(1, 'Set ID is required'),
})

// Schema for adding puzzle to set
export const AddPuzzleToSetSchema = z.object({
  setId: z.string().min(1, 'Set ID is required'),
  puzzleId: z.string().min(1, 'Puzzle ID is required'),
})

// Schema for archiving a specific set
export const ArchiveSetSchema = z.object({
  setId: z.string().min(1, 'Set ID is required'),
})

// Schema for increasing correct stat
export const IncreaseCorrectSchema = z.object({
  roundId: z.string().min(1, 'Round ID is required'),
  currentStreak: z.number(),
})

// Schema for increasing incorrect stat
export const IncreaseIncorrectSchema = z.object({
  roundId: z.string().min(1, 'Round ID is required'),
})

// Schema for increasing time taken
export const IncreaseTimeTakenSchema = z.object({
  roundId: z.string().min(1, 'Round ID is required'),
  timeTaken: z.number().positive('Time taken must be positive'),
  setId: z.string().optional(), // Optional for backwards compatibility
})

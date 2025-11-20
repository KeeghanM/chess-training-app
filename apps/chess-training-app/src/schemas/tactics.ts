import { z } from 'zod'

export const CreateTacticsSetSchema = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(150, 'Name must be less than 150 characters')
    .regex(/^[^@?#%^*]*$/, 'Name cannot contain special characters (@?#%^*)'),
  puzzleIds: z
    .array(z.object({ puzzleid: z.string() }))
    .min(20, 'Invalid size of puzzle set')
    .max(500, 'Invalid size of puzzle set'),
  rating: z.number(),
})

export type CreateTacticsSetData = z.infer<typeof CreateTacticsSetSchema>

export const CreateRoundSchema = z.object({
  setId: z.string().min(1, 'Missing fields'),
  roundNumber: z.number(),
  puzzleRating: z.number().optional(),
})

export type CreateRoundData = z.infer<typeof CreateRoundSchema>

export const UpdateTacticsSetSchema = z.object({
  setId: z.string().min(1, 'Missing required fields'),
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(150, 'Name must be less than 150 characters')
    .regex(/^[^@?#%^*]*$/, 'Name cannot contain special characters (@?#%^*)'),
})

export type UpdateTacticsSetData = z.infer<typeof UpdateTacticsSetSchema>

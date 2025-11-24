import { z } from 'zod'

export const AccountSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(150, 'Username must be less than 150 characters')
    .regex(
      /^[^@?#%^*]*$/,
      'Username cannot contain special characters (@?#%^*)',
    ),
  fullname: z
    .string()
    .max(150, 'Full name must be less than 150 characters')
    .regex(
      /^[^@?#%^*]*$/,
      'Full name cannot contain special characters (@?#%^*)',
    )
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(1000, 'Bio must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  highestOnlineRating: z.coerce
    .number()
    .min(100, 'Highest online rating must be at least 100')
    .max(3500, 'Highest online rating must be at most 3500')
    .optional()
    .or(z.literal(0)),
  highestOTBRating: z.coerce
    .number()
    .min(100, 'Highest OTB rating must be at least 100')
    .max(3500, 'Highest OTB rating must be at most 3500')
    .optional()
    .or(z.literal(0)),
  puzzleRating: z.coerce
    .number()
    .min(500, 'Puzzle rating must be at least 500')
    .max(3500, 'Puzzle rating must be at most 3500')
    .default(1500),
  difficulty: z.coerce.number().min(0).max(2).default(1),
  publicProfile: z.boolean().default(false),
})

export type AccountData = z.infer<typeof AccountSchema>

export const XpUpdateSchema = z.object({
  xp: z.number(),
  type: z.enum(['line', 'tactic']),
})

export type XpUpdateData = z.infer<typeof XpUpdateSchema>

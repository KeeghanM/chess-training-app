import { z } from 'zod'

export const CreateCourseSchema = z.object({
  courseName: z.string().min(1, 'Missing required fields'),
  slug: z
    .string()
    .min(1, 'Missing required fields')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  description: z.string(),
  groupNames: z
    .array(z.object({ groupName: z.string() }))
    .min(1, 'Missing required fields'),
  lines: z
    .array(
      z.object({
        groupName: z.string(),
        colour: z.string(),
        moves: z.array(z.any()), // CleanMove type is complex, using z.any() for now
      }),
    )
    .min(1, 'Missing required fields'),
})

export type CreateCourseData = z.infer<typeof CreateCourseSchema>

export const UploadFensSchema = z.object({
  fens: z
    .array(
      z.object({
        fen: z.string(),
        commentId: z.number(),
      }),
    )
    .min(1, 'Missing fens'),
})

export type UploadFensData = z.infer<typeof UploadFensSchema>

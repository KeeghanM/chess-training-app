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

export const PurchaseCourseSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
})

export const UploadTrainedFensSchema = z.object({
  userCourseId: z.string().min(1, 'Missing userCourseId'),
  fens: z.array(
    z.object({
      fen: z.string(),
      commentId: z.number().optional(),
    }),
  ),
})

export const UpdateLineStatsSchema = z.object({
  userCourseId: z.string().min(1, 'Missing userCourseId'),
  lineId: z.string().min(1, 'Missing lineId'),
  lineCorrect: z.boolean(),
  revisionDate: z.coerce.date(),
})

export const CheckCourseNameSchema = z.object({
  name: z.string().min(1, 'Missing name'),
})

export const UserCourseIdSchema = z.object({
  userCourseId: z.string().min(1, 'Missing userCourseId'),
})

export const UpdateCourseSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
  courseName: z.string().min(1, 'Missing courseName'),
  courseDescription: z.string(),
  shortDescription: z.string(),
  linesToDelete: z.array(z.number()),
  lines: z.array(
    z.object({
      id: z.number(),
      sortOrder: z.number(),
      trainable: z.boolean(),
    }),
  ),
  groups: z.array(
    z.object({
      id: z.number(),
      groupName: z.string(),
      sortOrder: z.number(),
    }),
  ),
})

export const AddLinesSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
  groupNames: z.array(z.string()),
  lines: z.array(
    z.object({
      groupName: z.string(),
      colour: z.string(),
      moves: z.array(z.any()), // CleanMove type
    }),
  ),
})

export const CourseIdSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
})

export const MarkLineForReviewSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
  lineId: z.string().min(1, 'Missing lineId'),
  minDate: z.string(),
})

export const MarkGroupForReviewSchema = z.object({
  courseId: z.string().min(1, 'Missing courseId'),
  groupId: z.number(),
})

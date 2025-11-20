import { z } from 'zod'

// Schema for marking line for review
export const MarkLineForReviewSchema = z.object({
  lineId: z.number(),
  minDate: z.coerce.date(),
})

// Schema for marking group for review
export const MarkGroupForReviewSchema = z.object({
  groupId: z.string().min(1, 'Group ID is required'),
})

// Schema for course stats update
export const UpdateCourseStatsSchema = z.object({
  lineCorrect: z.boolean(),
  revisionDate: z.coerce.date(),
})

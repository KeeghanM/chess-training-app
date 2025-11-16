import { ProgressPercentage } from '~/components/_elements/progress'
import { PrismaUserCourse } from '~/hooks/use-course-queries'

export const generateCoursePercentages = (
  userCourse: PrismaUserCourse | null,
) => {
  if (!userCourse) return []

  const totalLines =
    userCourse.linesLearned +
    userCourse.linesLearning +
    userCourse.linesHard +
    userCourse.linesUnseen

  const learnedPercent = Math.round(
    (userCourse.linesLearned / totalLines) * 100,
  )
  const learningPercent = Math.round(
    (userCourse.linesLearning / totalLines) * 100,
  )
  const hardPercent = Math.round((userCourse.linesHard / totalLines) * 100)

  const percentages: ProgressPercentage[] = []
  if (learnedPercent > 0)
    percentages.push({
      percentage: learnedPercent,
      color: 'text-[#4ade80]',
    })

  if (learningPercent > 0)
    percentages.push({
      percentage: learningPercent,
      color: 'text-[#2563eb]',
    })

  if (hardPercent > 0)
    percentages.push({
      percentage: hardPercent,
      color: 'text-[#ff3030]',
    })

  return percentages
}

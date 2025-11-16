import { getUserServer } from './getUserServer'
import { errorResponse } from './server-responsses'

type User = NonNullable<Awaited<ReturnType<typeof getUserServer>>['user']>

/**
 * Higher-order function to wrap admin-only API routes with authentication
 *
 * @param handler - The route handler function that receives the request and authenticated user
 * @returns A Next.js route handler function
 *
 * @example
 * export const POST = withAdminAuth(async (request, user) => {
 *   // Your admin-only logic here
 *   return successResponse('Success', { data })
 * })
 */
export function withAdminAuth(
  handler: (request: Request, user: User) => Promise<Response>,
) {
  return async (request: Request): Promise<Response> => {
    const { user, isStaff } = await getUserServer()

    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    if (!isStaff) {
      return errorResponse('Forbidden - Admin access required', 403)
    }

    return handler(request, user)
  }
}

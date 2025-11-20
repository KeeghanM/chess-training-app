import { errorResponse } from '@utils/server-responses'

import { ErrorHandler, Forbidden, Unauthorized } from './errors'
import { getUserServer } from './get-user-server'

type User = NonNullable<Awaited<ReturnType<typeof getUserServer>>['user']>

type AuthOptions = {
  needsAdmin?: boolean
}

/**
 * Higher-order function to wrap API routes with authentication, error handling, and logging.
 * Acts as a global middleware for all API routes.
 *
 * @param handler - The route handler function that receives the request, user, and isPremium flag
 * @param options - Authentication options (needsAdmin flag)
 * @returns A Next.js route handler function
 *
 * @example
 * // Regular authenticated route
 * export const POST = apiWrapper(async (request, { user, isPremium }) => {
 *   // Your logic here - just throw errors!
 *   if (!user) throw new Unauthorized('No user')
 *   return successResponse('Success', { data })
 * })
 *
 * @example
 * // Admin-only route
 * export const POST = apiWrapper(async (request, { user, isPremium }) => {
 *   // Your admin-only logic here
 *   return successResponse('Success', { data })
 * }, { needsAdmin: true })
 */
export function apiWrapper(
  handler: (
    request: Request,
    context: { user: User; isPremium: boolean },
  ) => Promise<Response>,
  options: AuthOptions = {},
) {
  return async (request: Request): Promise<Response> => {
    try {
      const { user, isStaff, isPremium } = await getUserServer()

      if (!user) {
        throw new Unauthorized('Unauthorized')
      }

      if (options.needsAdmin && !isStaff) {
        throw new Forbidden('Forbidden - Admin access required')
      }

      return await handler(request, { user, isPremium })
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return errorResponse(error.message, error.status)
      }

      // Unexpected errors - log and return generic 500
      if (error instanceof Error) {
        return errorResponse(error.message, 500)
      }

      return errorResponse('Internal Server Error', 500)
    }
  }
}

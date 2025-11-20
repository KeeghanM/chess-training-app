import { errorResponse } from '@utils/server-responses'

import { ErrorHandler } from './errors'

/**
 * Higher-order function to wrap public API routes with error handling.
 * Does NOT require authentication.
 *
 * @param handler - The route handler function
 * @returns A Next.js route handler function
 */
export function publicApiWrapper(
  handler: (request: Request) => Promise<Response>,
) {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request)
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return errorResponse(error.message, error.status)
      }

      // Unexpected errors - log and return generic 500
      if (error instanceof Error) {
        console.error('[API_ERROR]', error)
        return errorResponse(error.message, 500)
      }

      console.error('[API_ERROR]', error)
      return errorResponse('Internal Server Error', 500)
    }
  }
}

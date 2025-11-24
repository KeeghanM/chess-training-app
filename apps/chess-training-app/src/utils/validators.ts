import type { z } from 'zod'

import { BadRequest } from './errors'

/**
 * Validates request body using a Zod schema
 *
 * @param request - The incoming request
 * @param schema - Zod schema to validate against
 * @returns Validated and typed data
 * @throws BadRequest if validation fails
 *
 * @example
 * export const POST = apiWrapper(async (request, { user }) => {
 *   const { username, email } = await validateBody(request, AccountSchema)
 *   // username and email are fully typed and validated
 * })
 */
export async function validateBody<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const body = await request.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    throw new BadRequest(
      result.error.issues[0]?.message || 'Invalid request body',
      { issues: result.error.issues },
    )
  }

  return result.data
}

/**
 * Validates URL query parameters using a Zod schema
 *
 * @param request - The incoming request
 * @param schema - Zod schema to validate against
 * @returns Validated and typed query parameters
 * @throws BadRequest if validation fails
 *
 * @example
 * export const GET = apiWrapper(async (request, { user }) => {
 *   const { page, limit } = validateQuery(request, PaginationSchema)
 *   // page and limit are fully typed and validated
 * })
 */
export function validateQuery<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): z.infer<T> {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  const result = schema.safeParse(params)

  if (!result.success) {
    throw new BadRequest(
      result.error.issues[0]?.message || 'Invalid query parameters',
      { issues: result.error.issues },
    )
  }

  return result.data
}

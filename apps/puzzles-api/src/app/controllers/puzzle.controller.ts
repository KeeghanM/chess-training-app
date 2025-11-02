import type { Request, Response } from 'express'
import oracledb, { Connection, OUT_FORMAT_OBJECT } from 'oracledb'
import { z } from 'zod'

export const ErrorResponse = (message: string, status: number) => {
  return {
    message,
    status,
  }
}

export type PuzzleResult = {
  PUZZLEID: string
  FEN: string
  RATING: string
  RATINGDEVIATION: string
  MOVES: string
  THEMES: string
}

const QuerySchema = z
  .object({
    id: z
      .string()
      .max(6, 'ID must be 6 characters or less')
      .refine((val) => /^[a-z0-9]+$/i.test(val), {
        message: 'ID must be alphanumeric',
      })
      .optional(),
    rating: z.coerce.number().min(1).optional(),
    playerMoves: z.coerce.number().min(1).optional(),
    count: z.coerce.number().min(1).max(500).optional(),
    themes: z
      .string()
      .transform((val, ctx) => {
        try {
          const parsed = JSON.parse(val)
          if (!Array.isArray(parsed)) {
            ctx.addIssue({
              code: 'custom',
              message: 'Themes must be an array',
            })
            return z.NEVER
          }
          // Validate each theme is alphanumeric/safe
          if (
            !parsed.every(
              (theme) =>
                typeof theme === 'string' && /^[a-zA-Z0-9_-]+$/.test(theme),
            )
          ) {
            ctx.addIssue({
              code: 'custom',
              message:
                'Themes must be alphanumeric with hyphens or underscores only',
            })
            return z.NEVER
          }
          return parsed as string[]
        } catch {
          ctx.addIssue({
            code: 'custom',
            message: 'Invalid JSON format for themes',
          })
          return z.NEVER
        }
      })
      .optional(),
    themesType: z.enum(['ALL', 'OR']).optional(),
  })
  .refine(
    (data) => {
      // If themes array has more than 1 element, themesType is required
      if (data.themes && data.themes.length > 1 && !data.themesType) {
        return false
      }
      return true
    },
    {
      message: 'themesType needed when multiple themes supplied',
      path: ['themesType'],
    },
  )

const PuzzleController = async (req: Request, res: Response) => {
  // RapidAPI authentication check
  if (
    process.env.NODE_ENV === 'production' &&
    (req.headers['x-mashape-proxy-secret'] === undefined ||
      req.headers['x-mashape-proxy-secret'] !== process.env.RAPID_API_SECRET)
  ) {
    res
      .status(400)
      .send(ErrorResponse('Request must be sent via RapidAPI', 400))
    return
  }

  // Validate query parameters with Zod
  const queryValidation = QuerySchema.safeParse(req.query)

  if (!queryValidation.success) {
    const errorMessage = queryValidation.error.issues
      .map((err) => err.message)
      .join(', ')
    res.status(400).send(ErrorResponse(errorMessage, 400))
    return
  }

  const validatedQuery = queryValidation.data

  // Build query string and bind parameters
  let queryString =
    'SELECT puzzleid,fen,rating,ratingdeviation,moves,themes FROM PUZZLES WHERE 1=1 '
  const bindParams: Record<string, number | string> = {}
  let maxRows = 1 // Default to 1 row

  if (Object.keys(validatedQuery).length === 0) {
    // No query parameters - return a single random puzzle
    const randRating = Math.floor(Math.random() * (3001 - 511 + 1) + 511)
    queryString += 'AND rating BETWEEN :ratingLower AND :ratingUpper '
    queryString += 'ORDER BY DBMS_RANDOM.VALUE'

    bindParams.ratingLower = randRating - 1
    bindParams.ratingUpper = randRating + 1
  } else if (validatedQuery.id) {
    // Handle ID query
    queryString += 'AND puzzleid = :puzzleid'

    bindParams.puzzleid = validatedQuery.id
  } else {
    // Handle filtered queries
    maxRows = validatedQuery.count ?? 1

    // Player moves filter
    if (validatedQuery.playerMoves) {
      queryString +=
        " AND(LENGTH(MOVES) - LENGTH(replace(MOVES, ' ', '')) + 1) = :playerMovesCount "
      bindParams.playerMovesCount = validatedQuery.playerMoves * 2
    }

    // Themes filter
    // Note: CONTAINS() requires a text query expression as a literal string.
    // We've validated themes are alphanumeric via Zod, so it's safe to build this string.
    if (validatedQuery.themes) {
      const operator = validatedQuery.themesType === 'ALL' ? ' AND ' : ' OR '
      const themesQuery = validatedQuery.themes.join(operator)
      queryString += " AND CONTAINS(THEMES, '" + themesQuery + "') > 0 "
    }

    // Rating filter (always applied for performance)
    const rating =
      validatedQuery.rating ??
      Math.floor(Math.random() * (3001 - 511 + 1) + 511)
    queryString +=
      ' AND :rating BETWEEN RATING - RATINGDEVIATION AND RATING + RATINGDEVIATION '
    bindParams.rating = rating

    // Order by random
    queryString += ' ORDER BY DBMS_RANDOM.VALUE'
  }

  let connection: Connection | undefined

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING,
      externalAuth: false,
    })

    // Set maxRows as a safety net and primary row limiter
    const result = await connection.execute<PuzzleResult>(
      queryString,
      bindParams,
      { maxRows, outFormat: OUT_FORMAT_OBJECT },
    )

    if (result.rows === undefined || result.rows.length === 0) {
      res.status(400).send(ErrorResponse('No Matching Puzzles', 400))
      return
    }

    const puzzles = result.rows.map((puzzle) => ({
      puzzleid: puzzle.PUZZLEID,
      fen: puzzle.FEN,
      rating: puzzle.RATING,
      ratingdeviation: puzzle.RATINGDEVIATION,
      moves: puzzle.MOVES.split(' '),
      themes: puzzle.THEMES.split(' '),
    }))

    res.status(200).send({ puzzles })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .send(
        ErrorResponse('Error fetching puzzles. Please contact the admin.', 500),
      )
    return
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error('Error closing connection:', err)
      }
    }
  }
}

export { PuzzleController }

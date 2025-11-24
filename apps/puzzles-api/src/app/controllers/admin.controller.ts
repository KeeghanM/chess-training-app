import type { Request, Response } from 'express'
import oracledb, { Connection, OUT_FORMAT_OBJECT } from 'oracledb'

import { env } from '../../env'
import { ErrorResponse, PuzzleResult } from './puzzle.controller'

const AdminController = async (req: Request, res: Response) => {
  if (
    env.NODE_ENV === 'production' &&
    req.headers['x-admin-secret'] !== env.ADMIN_SECRET
  ) {
    res
      .status(400)
      .send(ErrorResponse('Request must be sent via RapidAPI', 400))
    return
  }

  const count = parseInt(req.query.count as string) || 10
  const results = []

  let connection: Connection | undefined
  try {
    for (let i = 0; i < count; i++) {
      connection = await oracledb.getConnection()
      // Get the oldest unchecked puzzle (or never checked)
      // NULLS FIRST ensures puzzles that have never been checked are prioritised
      const result = await connection.execute<PuzzleResult>(
        `SELECT puzzleid, fen, rating, ratingdeviation, moves, themes 
       FROM PUZZLES 
       ORDER BY last_checked NULLS FIRST, last_checked ASC 
       FETCH FIRST 1 ROW ONLY`,
        {},
        { outFormat: OUT_FORMAT_OBJECT },
      )

      await connection.close()
      connection = undefined

      if (!result.rows || result.rows.length === 0) {
        res.status(404).send(ErrorResponse('No Matching Puzzles', 404))
        return
      }

      const puzzle = {
        puzzleid: result.rows[0]!.PUZZLEID,
        rating: result.rows[0]!.RATING,
        ratingdeviation: result.rows[0]!.RATINGDEVIATION,
      }

      const lichessPuzzleResponse = await fetch(
        `https://lichess.org/api/puzzle/${puzzle.puzzleid}`,
      )

      if (!lichessPuzzleResponse.ok) {
        // if it's a 404 just update last_checked, if LiChess doesn't have it any more it will just permantly be whatever it's rating was.
        if (lichessPuzzleResponse.status === 404) {
          connection = await oracledb.getConnection()
          await connection.execute(
            `UPDATE PUZZLES 
           SET last_checked = SYSTIMESTAMP 
           WHERE PUZZLEID = :puzzleid`,
            {
              puzzleid: puzzle.puzzleid,
            },
            { autoCommit: true },
          )
          results.push({
            checked: puzzle.puzzleid,
            ratingChanged: false,
          })
          await connection.close()
          connection = undefined
          continue
        }

        const resp = await lichessPuzzleResponse.json()
        console.error('LICHESS ERROR:', resp)
        throw new Error('Error fetching from Lichess')
      }

      const lichessData = (await lichessPuzzleResponse.json()) as {
        puzzle: { rating: number }
      }

      if (!lichessData || !lichessData.puzzle || !lichessData.puzzle.rating) {
        throw new Error('Error parsing puzzle from Lichess', {
          cause: lichessData,
        })
      }

      // Update the puzzle if rating has changed, and always update last_checked
      connection = await oracledb.getConnection()
      if (lichessData.puzzle.rating !== parseInt(puzzle.rating)) {
        await connection.execute(
          `UPDATE PUZZLES 
         SET RATING = :rating, last_checked = SYSTIMESTAMP 
         WHERE PUZZLEID = :puzzleid`,
          {
            rating: lichessData.puzzle.rating,
            puzzleid: puzzle.puzzleid,
          },
          { autoCommit: true },
        )
      } else {
        // Even if rating hasn't changed, update last_checked so we move on to the next puzzle
        await connection.execute(
          `UPDATE PUZZLES 
         SET last_checked = SYSTIMESTAMP 
         WHERE PUZZLEID = :puzzleid`,
          {
            puzzleid: puzzle.puzzleid,
          },
          { autoCommit: true },
        )
      }
      await connection.close()
      connection = undefined

      results.push({
        checked: puzzle.puzzleid,
        ratingChanged: lichessData.puzzle.rating !== parseInt(puzzle.rating),
      })
      // Wait 3 seconds between each puzzle (except the last one)
      if (i < count - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    res.status(200).send({
      processed: results.length,
      results,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .send(
        ErrorResponse('Error fetching puzzles. Please contact the admin.', 500),
      )
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

export { AdminController }

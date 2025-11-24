import express, { Request, Response } from 'express'
import helmet from 'helmet'
import oracledb from 'oracledb'

import { AdminController } from './app/controllers/admin.controller'
import { PuzzleController } from './app/controllers/puzzle.controller'
import { env } from './env'

async function init() {
  // CONFIG
  const app = express()
  app.use(helmet())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // ROUTES
  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Chess Puzzle API.' })
  })
  app.get('/api', PuzzleController)
  app.get('/admin', AdminController)

  // Create connection pool
  await oracledb.createPool({
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    connectionString: env.DB_CONNECTION_STRING,
    externalAuth: false,
    poolIncrement: 1,
    poolMin: 5,
    poolMax: 20,
  })

  // START THE SERVER
  const PORT = env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

init()

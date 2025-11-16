import express, { Request, Response } from 'express'
import helmet from 'helmet'

import { AdminController } from './app/controllers/admin.controller'
import { PuzzleController } from './app/controllers/puzzle.controller'
import { env } from './env'

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

// START THE SERVER
const PORT = env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

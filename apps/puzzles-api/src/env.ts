import 'dotenv/config'
import z from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DB_CONNECTION_STRING: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  RAPID_API_SECRET: z.string(),
  ADMIN_SECRET: z.string(),
})

export const env = EnvSchema.parse(process.env)

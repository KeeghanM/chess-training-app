import Redis from 'ioredis'
import { env } from '~/env'

const redis = new Redis({
  host: env.REDIS_HOST || 'redis',
  port: env.REDIS_PORT || parseInt('6379', 10),
})

interface PgnPayload {
  pgn: string
  userId: string
  setId: string
}

export async function publishPgnToRedis(payload: PgnPayload) {
  await redis.lpush('pgn_queue', JSON.stringify(payload))
}

export default redis

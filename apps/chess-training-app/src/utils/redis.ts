import Redis from 'ioredis'
import { env } from '~/env'

let redis: Redis | null = null

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      host: env.REDIS_HOST || 'redis',
      port: env.REDIS_PORT || 6379,
      lazyConnect: true, // Important: prevents immediate connection
      retryStrategy: (times) => {
        // Reconnect after a delay
        const delay = Math.min(times * 50, 2000)
        return delay
      },
      maxRetriesPerRequest: 3,
    })
  }
  return redis
}

type PgnPayload = {
  pgn: string
  userId: string
  setId: string
}

export async function publishPgnToRedis(payload: PgnPayload) {
  const redisClient = getRedis()
  await redisClient.lpush('pgn_queue', JSON.stringify(payload))
}

export default getRedis()

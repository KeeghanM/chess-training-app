import Redis from 'ioredis'

console.log({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
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

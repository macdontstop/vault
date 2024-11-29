import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function rateLimit(
  ip: string,
  limit: number,
  windowInSeconds = 3600
) {
  const key = `rate-limit:${ip}`
  const now = Date.now()
  const windowStart = now - windowInSeconds * 1000

  await redis.zadd(key, { score: now, member: now.toString() })
  await redis.zremrangebyscore(key, 0, windowStart)

  const count = await redis.zcard(key)

  await redis.expire(key, windowInSeconds)

  const oldestTimestamp = await redis.zrange<string[]>(key, 0, 0)
  const resetTime = oldestTimestamp.length
    ? parseInt(oldestTimestamp[0]) + windowInSeconds * 1000
    : now + windowInSeconds * 1000

  return {
    success: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    reset: resetTime,
  }
}

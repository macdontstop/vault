import { NextResponse } from 'next/server'

import { rateLimit } from '@/lib/rate-limit'

const UPLOADS_PER_HOUR = parseInt(process.env.UPLOADS_PER_HOUR || '10')

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'

    const { success, limit, remaining, reset } = await rateLimit(
      ip,
      UPLOADS_PER_HOUR
    )

    if (!success) {
      return NextResponse.json(
        {
          error: 'Too many uploads',
          limit,
          remaining,
          reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error checking rate limit:', error)
    return NextResponse.json(
      { error: 'Failed to check rate limit' },
      { status: 500 }
    )
  }
}

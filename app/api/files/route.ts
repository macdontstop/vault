import { addDays } from 'date-fns'
import { NextResponse } from 'next/server'

import { rateLimit } from '@/lib/rate-limit'
import { createClient } from '@/lib/supabase/server'

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

    const supabase = createClient()
    const body = await request.json()

    const expirationDate = addDays(new Date(), 7)

    const { data, error } = await supabase
      .from('files')
      .insert({
        name: body.name,
        size: body.size,
        type: body.type,
        key: body.key,
        share_id: body.shareId,
        expires_at: expirationDate.toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error saving file metadata:', error)
    return NextResponse.json(
      { error: 'Failed to save file metadata' },
      { status: 500 }
    )
  }
}

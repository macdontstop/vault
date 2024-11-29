import { addDays } from 'date-fns'
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
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

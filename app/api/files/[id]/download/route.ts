import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()

    // check if file exists and hasn't expired
    const { data: file } = await supabase
      .from('files')
      .select('expires_at')
      .eq('share_id', params.id)
      .single()

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    if (file.expires_at && new Date(file.expires_at) < new Date()) {
      return NextResponse.json({ error: 'File has expired' }, { status: 410 })
    }

    // update download count
    const { data, error } = await supabase.rpc('increment_downloads', {
      row_id: params.id,
    })

    if (error) throw error

    return NextResponse.json({ download_count: data })
  } catch (error) {
    console.error('Error updating download count:', error)
    return NextResponse.json(
      { error: 'Failed to update download count' },
      { status: 500 }
    )
  }
}

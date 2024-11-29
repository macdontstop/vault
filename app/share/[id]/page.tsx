import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getFileType } from '@/lib/file-utils'
import { createClient } from '@/lib/supabase/server'

import { SharePageClient } from './share-page-client'

interface SharePageProps {
  params: {
    id: string
  }
}

async function getFileMetadata(shareId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('share_id', shareId)
    .single()
  if (error || !data) return null
  return data
}

export default async function SharePage({ params }: SharePageProps) {
  const file = await getFileMetadata(params.id)

  if (!file) {
    notFound()
  }

  return <SharePageClient file={file} />
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const file = await getFileMetadata(params.id)
  if (!file) return {}

  const { isImage } = getFileType(file)
  const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${file.key}`

  return {
    title: `${file.name} - Vault`,
    description: `View and download ${file.name} shared via Vault`,
    openGraph: {
      title: `${file.name} - Vault`,
      description: `View and download ${file.name} shared via Vault`,
      images: [
        {
          url: isImage ? fileUrl : `/share/${params.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: file.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${file.name} - Vault`,
      description: `View and download ${file.name} shared via Vault`,
      images: [isImage ? fileUrl : `/share/${params.id}/opengraph-image`],
    },
  }
}

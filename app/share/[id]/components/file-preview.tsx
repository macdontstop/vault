'use client'

import Image from 'next/image'

import type { File } from '@/lib/file-utils'
import { getFileType } from '@/lib/file-utils'

interface FilePreviewProps {
  file: File
  downloadUrl: string
}

export function FilePreview({ file, downloadUrl }: FilePreviewProps) {
  const { isImage, isVideo } = getFileType(file)

  if (!isImage && !isVideo) return null

  return (
    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10">
      {isImage && (
        <Image
          src={downloadUrl}
          alt={file.name}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      )}
      {isVideo && (
        <video
          controls
          className="absolute inset-0 w-full h-full"
          poster={`${downloadUrl}#t=0.5`}
        >
          <source src={downloadUrl} type={file.type} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

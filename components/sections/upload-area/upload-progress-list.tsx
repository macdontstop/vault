'use client'

import { AnimatePresence } from 'framer-motion'

import type { FileUploadState } from './types'
import { UploadProgressCard } from './upload-progress-card'

interface UploadProgressListProps {
  uploads: FileUploadState[]
  copiedId: string | null
  onCopyLink: (shareId: string) => void
  onRemove: (file: File) => void
}

export function UploadProgressList({
  uploads,
  copiedId,
  onCopyLink,
  onRemove,
}: UploadProgressListProps) {
  if (uploads.length === 0) return null

  return (
    <div className="mt-8 space-y-3">
      <AnimatePresence>
        {uploads.map((upload, index) => (
          <UploadProgressCard
            key={`${upload.file.name}-${index}`}
            file={upload.file}
            progress={upload.progress}
            status={upload.status}
            error={upload.error}
            shareId={upload.shareId}
            onCopyLink={onCopyLink}
            onRemove={onRemove}
            copiedId={copiedId}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

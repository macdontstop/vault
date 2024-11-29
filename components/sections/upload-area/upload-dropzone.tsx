'use client'

import { UploadIcon } from 'lucide-react'
import type { ClipboardEventHandler } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface UploadDropzoneProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onChooseFiles: () => void
  onPaste: ClipboardEventHandler<HTMLDivElement>
}

export function UploadDropzone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onChooseFiles,
  onPaste,
}: UploadDropzoneProps) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border border-white/10 transition-colors',
        isDragging && 'border-primary/50 bg-white/[0.03]'
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      tabIndex={0}
      onPaste={onPaste}
    >
      <div className="p-8 md:p-12 flex flex-col items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-full bg-gradient-to-b from-white/10 to-white/5 p-4">
            <UploadIcon className="w-8 h-8 text-white/80" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-medium text-white">
            {isDragging ? 'Drop your files here' : 'Drop your files here'}
          </h2>
          <p className="text-sm text-white/60">
            or select files from your device
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="relative font-medium border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] hover:border-white/20 hover:bg-white/5"
          onClick={onChooseFiles}
        >
          Choose Files
        </Button>

        <p className="text-xs text-white/40">
          Upload up to 5 files (max 50MB each)
        </p>
      </div>
    </div>
  )
}

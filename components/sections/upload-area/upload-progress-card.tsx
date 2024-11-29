'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Download, FileIcon, X } from 'lucide-react'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface UploadProgressCardProps {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
  error?: string
  shareId?: string
  onCopyLink: (shareId: string) => void
  onRemove: (file: File) => void
  copiedId: string | null
}

export function UploadProgressCard({
  file,
  progress,
  status,
  error,
  shareId,
  onCopyLink,
  onRemove,
  copiedId,
}: UploadProgressCardProps) {
  const isComplete = status === 'complete'
  const isError = status === 'error'
  const isUploading = status === 'uploading'

  const handleRemove = useCallback(() => {
    onRemove(file)
  }, [file, onRemove])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-white/[0.03] backdrop-blur-xl transition-colors',
        isComplete && 'border-green-500/20 bg-green-500/[0.02]',
        isError && 'border-red-500/20 bg-red-500/[0.02]',
        !isComplete && !isError && 'border-white/10'
      )}
    >
      <div className="p-4">
        {/* Header Section */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'rounded-lg p-2 transition-colors',
                isComplete && 'bg-green-500/10 text-green-500',
                isError && 'bg-red-500/10 text-red-500',
                !isComplete && !isError && 'bg-white/10 text-white/80'
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : isError ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <FileIcon className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-white/60">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isComplete && shareId && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopyLink(shareId)}
                    className={cn(
                      'h-8 gap-1.5 transition-all duration-200',
                      copiedId === shareId
                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">
                      {copiedId === shareId ? 'Copied!' : 'Copy Link'}
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleRemove}
              className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {!isError && (
          <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={cn(
                'absolute inset-y-0 left-0 transition-colors',
                isComplete ? 'bg-green-500' : 'bg-white/40'
              )}
            />
          </div>
        )}

        {/* Error Message */}
        {isError && (
          <p className="mt-2 text-xs font-medium text-red-400">{error}</p>
        )}

        {/* Status Text */}
        {isUploading && (
          <p className="mt-2 text-xs text-white/60">
            Uploading... {Math.round(progress)}%
          </p>
        )}
      </div>
    </motion.div>
  )
}

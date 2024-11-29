import confetti from 'canvas-confetti'
import { formatDistanceToNow } from 'date-fns'
import { useCallback } from 'react'
import type { ClipboardEvent } from 'react'

import { validateFileSize } from '@/lib/file-utils'
import { uploadFile } from '@/lib/storage-client'

import type { FileUploadState } from './types'

interface UseUploadHandlersProps {
  setIsDragging: (isDragging: boolean) => void
  setUploads: React.Dispatch<React.SetStateAction<FileUploadState[]>>
  uploads: FileUploadState[]
  setCopiedId: (id: string | null) => void
}

export function useUploadHandlers({
  setIsDragging,
  setUploads,
  uploads,
  setCopiedId,
}: UseUploadHandlersProps) {
  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return

      const filesToUpload = Array.from(files).slice(0, 5)

      filesToUpload.forEach((file) => {
        const { isValid, error } = validateFileSize(file)

        if (!isValid) {
          setUploads((prev) => [
            ...prev,
            {
              file,
              progress: 0,
              status: 'error',
              error,
            },
          ])
          return
        }

        setUploads((prev) => [
          ...prev,
          {
            file,
            progress: 0,
            status: 'pending',
          },
        ])
      })

      // Check rate limit before starting uploads
      try {
        const response = await fetch('/api/files/check-limit', {
          method: 'POST',
        })

        if (response.status === 429) {
          const rateLimitData = await response.json()
          const resetTime = formatDistanceToNow(new Date(rateLimitData.reset), {
            addSuffix: true,
          })
          const error = `Upload limit reached. You can try again ${resetTime}`

          // Update all pending uploads with the rate limit error
          setUploads((prev) =>
            prev.map((upload) =>
              upload.status === 'pending'
                ? {
                    ...upload,
                    status: 'error',
                    error,
                  }
                : upload
            )
          )
          return
        }

        if (!response.ok) {
          throw new Error('Failed to check upload limit')
        }
      } catch (error) {
        console.error('Rate limit check error:', error)
        const errorMessage =
          error instanceof Error ? error.message : 'Upload failed'
        setUploads((prev) =>
          prev.map((upload) =>
            upload.status === 'pending'
              ? {
                  ...upload,
                  status: 'error',
                  error: errorMessage,
                }
              : upload
          )
        )
        return
      }

      // Continue with uploads if rate limit check passes
      filesToUpload.forEach(async (file) => {
        if (file.size > 50 * 1024 * 1024) return

        try {
          const { data, shareId } = await uploadFile(file, (progress) => {
            setUploads((prev) =>
              prev.map((upload) =>
                upload.file === file
                  ? { ...upload, progress, status: 'uploading' }
                  : upload
              )
            )
          })

          const response = await fetch('/api/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              size: file.size,
              type: file.type,
              key: data.path,
              shareId,
            }),
          })

          if (response.status === 429) {
            const rateLimitData = await response.json()
            const resetTime = formatDistanceToNow(
              new Date(rateLimitData.reset),
              {
                addSuffix: true,
              }
            )
            throw new Error(
              `Upload limit reached. You can try again ${resetTime}`
            )
          }

          if (!response.ok) {
            throw new Error('Failed to save file metadata')
          }

          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file
                ? { ...upload, status: 'complete', progress: 100, shareId }
                : upload
            )
          )

          if (!uploads.some((upload) => upload.status === 'complete')) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: [
                '#D4C93A',
                '#3F9C83',
                '#DF6998',
                '#026ED7',
                '#C9DAE2',
                '#A4BAE9',
                '#A0D8D0',
                '#E9A7C8',
              ],
            })
          }
        } catch (error) {
          console.error('Upload error:', error)
          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file
                ? {
                    ...upload,
                    status: 'error',
                    error:
                      error instanceof Error ? error.message : 'Upload failed',
                  }
                : upload
            )
          )
        }
      })
    },
    [uploads, setUploads]
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLDivElement>) => {
      const items = e.clipboardData?.items
      if (!items) return

      const files: File[] = []

      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            files.push(file)
          }
        }
      }

      if (files.length > 0) {
        const dataTransfer = new DataTransfer()
        files.forEach((file) => dataTransfer.items.add(file))
        handleUpload(dataTransfer.files)
      }
    },
    [handleUpload]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    },
    [setIsDragging]
  )

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    },
    [setIsDragging]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleUpload(e.dataTransfer.files)
    },
    [handleUpload, setIsDragging]
  )

  const copyShareLink = useCallback(
    (shareId: string) => {
      const shareLink = `${window.location.origin}/share/${shareId}`
      navigator.clipboard.writeText(shareLink)
      setCopiedId(shareId)
      setTimeout(() => setCopiedId(null), 2000)
    },
    [setCopiedId]
  )

  const removeUpload = useCallback(
    (fileToRemove: File) => {
      setUploads((prev) =>
        prev.filter((upload) => upload.file !== fileToRemove)
      )
    },
    [setUploads]
  )

  return {
    handleUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    copyShareLink,
    removeUpload,
    handlePaste,
  }
}

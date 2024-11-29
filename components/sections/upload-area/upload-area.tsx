'use client'

import { useRef, useState } from 'react'

import { FileUploadState } from './types'
import { UploadDropzone } from './upload-dropzone'
import { UploadProgressList } from './upload-progress-list'
import { useUploadHandlers } from './use-upload-handlers'

export function UploadArea() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploads, setUploads] = useState<FileUploadState[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const {
    handleUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    copyShareLink,
    removeUpload,
    handlePaste,
  } = useUploadHandlers({
    setIsDragging,
    setUploads,
    uploads,
    setCopiedId,
  })

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
        accept="*/*"
      />

      <UploadDropzone
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onChooseFiles={() => fileInputRef.current?.click()}
        onPaste={handlePaste}
      />

      <UploadProgressList
        uploads={uploads}
        copiedId={copiedId}
        onCopyLink={copyShareLink}
        onRemove={removeUpload}
      />
    </div>
  )
}

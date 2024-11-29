import type { Database } from '@/types/supabase'

export type File = Database['public']['Tables']['files']['Row']

export function getFileType(file: File | { type: string }) {
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')
  const isPdf = file.type === 'application/pdf'

  return {
    isImage,
    isVideo,
    isPdf,
  }
}

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop() || ''
}

export function validateFileSize(file: File | { size: number }): {
  isValid: boolean
  error?: string
} {
  const MAX_SIZE = 50 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: 'File size exceeds 50MB limit',
    }
  }
  return { isValid: true }
}

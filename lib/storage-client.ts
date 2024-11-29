import { nanoid } from 'nanoid'

import { getFileExtension, validateFileSize } from '@/lib/file-utils'
import { createClient } from '@/lib/supabase/client'

interface UploadProgressEvent {
  loaded: number
  total: number
}

const STORAGE_BUCKET = 'uploads'

export async function uploadFile(
  file: File,
  onProgress?: (progress: number) => void
) {
  const supabase = createClient()
  const validation = validateFileSize(file)

  if (!validation.isValid) throw new Error(validation.error)

  const fileExt = getFileExtension(file.name)
  const shareId = nanoid(12)
  const fileName = `${shareId}-${Date.now()}.${fileExt}`

  // upload to supabase storage
  const result = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      // @ts-expect-error - it is not typed
      onUploadProgress: (progress: UploadProgressEvent) => {
        const percent = (progress.loaded / progress.total) * 100
        onProgress?.(percent)
      },
    })

  if (result.error) throw result.error
  return { data: result.data, shareId }
}

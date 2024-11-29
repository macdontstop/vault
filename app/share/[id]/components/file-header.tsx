import {
  ClockIcon,
  EyeIcon,
  FileIcon,
  ImageIcon,
  VideoIcon,
} from 'lucide-react'

import type { Database } from '@/types/supabase'

type File = Database['public']['Tables']['files']['Row']

interface FileHeaderProps {
  file: File
}

export function FileHeader({ file }: FileHeaderProps) {
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')

  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="p-4 rounded-xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10">
        {isImage ? (
          <ImageIcon className="h-6 w-6 text-white/80" />
        ) : isVideo ? (
          <VideoIcon className="h-6 w-6 text-white/80" />
        ) : (
          <FileIcon className="h-6 w-6 text-white/80" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-medium text-white truncate mb-2">
          {file.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span>
              Uploaded {new Date(file.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            <span>{file.download_count || 0} downloads</span>
          </div>
        </div>
      </div>
    </div>
  )
}

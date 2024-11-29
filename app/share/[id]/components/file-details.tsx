import { formatDistanceToNow } from 'date-fns'

import { formatFileSize } from '@/lib/utils'

import type { Database } from '@/types/supabase'

type File = Database['public']['Tables']['files']['Row']

interface FileDetailsProps {
  file: File
}

export function FileDetails({ file }: FileDetailsProps) {
  const expiresIn = file.expires_at
    ? formatDistanceToNow(new Date(file.expires_at), { addSuffix: true })
    : 'Never'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-medium text-white/60 mb-2">File Details</h3>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="text-white/40">Size</dt>
            <dd className="text-white">{formatFileSize(file.size)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/40">Type</dt>
            <dd className="text-white capitalize">{file.type.split('/')[1]}</dd>
          </div>
        </dl>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-medium text-white/60 mb-2">Security</h3>
        <p className="text-sm text-white/40">
          This file will expire {expiresIn.toLowerCase()}.
        </p>
      </div>
    </div>
  )
}

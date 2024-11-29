'use client'

import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  CalendarIcon,
  DownloadIcon,
  EyeIcon,
  FileTypeIcon,
  HardDriveIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import type { File } from '@/lib/file-utils'
import { getDisplayFileType, getFileType } from '@/lib/file-utils'
import { formatFileSize } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface SharePageClientProps {
  file: File
}

export function SharePageClient({ file }: SharePageClientProps) {
  const downloadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${file.key}`
  const { isImage, isVideo, isPdf } = getFileType(file)
  const expiresIn = file.expires_at
    ? formatDistanceToNow(new Date(file.expires_at), { addSuffix: true })
    : 'Never'
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true)
      await fetch(`/api/files/${file.share_id}/download`, { method: 'POST' })
      window.location.href = downloadUrl
    } catch (error) {
      console.error('Error updating download count:', error)
      window.location.href = downloadUrl
    } finally {
      setIsDownloading(false)
    }
  }, [file.share_id, downloadUrl])

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        {/* back button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Upload
        </Link>

        <div className="space-y-8">
          {/* file preview */}
          {(isImage || isVideo || isPdf) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[16/9] group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-[1px] rounded-2xl overflow-hidden bg-black/40">
                {isImage && (
                  <Image
                    src={downloadUrl}
                    alt={file.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    sizes="(max-width: 1280px) 100vw, 1280px"
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
                  </video>
                )}
                {isPdf && (
                  <iframe
                    src={`${downloadUrl}#view=FitH`}
                    className="absolute inset-0 w-full h-full bg-white"
                    title={file.name}
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* file info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-xl font-medium text-white break-all">
              {file.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: HardDriveIcon,
                  label: 'Size',
                  value: formatFileSize(file.size),
                },
                {
                  icon: FileTypeIcon,
                  label: 'Type',
                  value: getDisplayFileType(file.type),
                },
                {
                  icon: EyeIcon,
                  label: 'Downloads',
                  value: file.download_count || 0,
                },
                { icon: CalendarIcon, label: 'Expires', value: expiresIn },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent -z-10" />
                  <div className="p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <item.icon className="h-4 w-4" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              <Button
                size="lg"
                className="relative w-full font-medium transition-all duration-200 overflow-hidden"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  <DownloadIcon className="h-5 w-5" />
                  {isDownloading ? 'Downloading...' : 'Download File'}
                </span>
              </Button>

              <p className="text-xs text-center text-white/40">
                This is a secure, temporary file share that will expire{' '}
                {expiresIn}.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

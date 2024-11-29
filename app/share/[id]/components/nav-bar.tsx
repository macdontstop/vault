'use client'

import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface NavBarProps {
  onDownload: () => void
}

export function NavBar({ onDownload }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upload
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-white hover:bg-white/10"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </nav>
  )
}

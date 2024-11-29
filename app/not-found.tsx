'use client'

import { motion } from 'framer-motion'
import { ArrowLeftIcon, CompassIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto text-center space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto w-fit"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
            <div className="relative rounded-full bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 p-6">
              <CompassIcon
                className="w-12 h-12 text-white/80"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-medium text-white">Page not found</h1>
          <p className="text-base text-white/60">
            The page you're looking for doesn't exist
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/">
            <Button
              variant="outline"
              className="gap-2 border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}

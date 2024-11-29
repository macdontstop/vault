'use client'

import { motion } from 'framer-motion'

import { SparklesIcon } from '@/components/ui/sparkles-icon'

export function HeroSection() {
  return (
    <div className="relative">
      <div className="relative space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <div className="text-primary">
            <SparklesIcon />
          </div>
          <span className="text-sm text-white/80 font-medium">
            Drag. Drop. Done.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-4xl/tight sm:text-5xl/tight font-bold tracking-tight text-white">
            Share files with
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
              simplicity
            </span>
          </h1>
          <p className="text-white/60 text-base/relaxed max-w-xl mx-auto">
            The fastest way to share your files. No signup required.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { FileTypeIcon, LockIcon, ZapIcon } from 'lucide-react'

const features = [
  {
    title: 'Instant Sharing',
    description: 'Share files immediately with a generated link',
    icon: ZapIcon,
  },
  {
    title: 'No Registration',
    description: 'Start sharing files without creating an account',
    icon: LockIcon,
  },
  {
    title: 'Any File Type',
    description: 'Support for all file types up to 50MB',
    icon: FileTypeIcon,
  },
]

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-xl -z-10" />
          <div className="relative p-4 space-y-2">
            <div className="inline-flex p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <feature.icon className="w-4 h-4 text-white/80" />
            </div>
            <h3 className="text-base font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-white/60">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

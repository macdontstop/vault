/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcldaubpothrmkuywsmm.supabase.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      '@supabase/supabase-js',
      '@vercel/analytics/react',
      '@vercel/speed-insights/next',
      'canvas-confetti',
      'framer-motion',
      'nanoid',
      'zod',
    ],
  },
}

export default nextConfig

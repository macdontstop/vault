import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GithubIcon } from 'lucide-react'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import { cn } from '@/lib/utils'

import { GridPattern } from '@/components/ui/grid-pattern'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
  preload: true,
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vault.jawad.sh'),
  title: {
    template: '%s | Vault',
    default: 'Vault - Simple File Sharing',
  },
  description: 'Share files with anyone, anywhere. No signup required.',
  keywords: ['file sharing', 'secure', 'simple'],
  authors: [{ name: 'Jawad Abdulrazzaq', url: 'https://jawad.sh' }],
  openGraph: {
    type: 'website',
    title: 'Vault - Simple File Sharing',
    description: 'Share files with anyone, anywhere. No signup required.',
    siteName: 'Vault',
    locale: 'en_US',
    url: 'https://vault.jawad.sh',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Vault - Simple File Sharing',
        type: 'image/png',
        secureUrl: 'https://vault.jawad.sh/opengraph-image.png',
      },
    ],
    determiner: 'auto',
    countryName: 'US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'scroll-smooth motion-safe:scroll-smooth dark antialiased',
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body
        className={cn(
          'min-h-screen',
          'bg-black',
          'selection:bg-primary/10 selection:text-primary',
          'flex flex-col'
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:p-4"
        >
          Skip to main content
        </a>

        <div className="fixed inset-0">
          <GridPattern
            width={40}
            height={40}
            className="absolute inset-0 text-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
            strokeDasharray="1 1"
          />
        </div>

        <header className="absolute top-0 right-0 p-6 z-50">
          <nav className="flex items-center gap-6 text-sm text-white/40">
            <a
              href="https://github.com/your-username/vault"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white/60 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </nav>
        </header>

        <main id="main-content" className="relative flex-grow">
          {children}
        </main>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

import { FeaturesSection } from '@/components/sections/features-section'
import { HeroSection } from '@/components/sections/hero-section'
import { UploadArea } from '@/components/sections/upload-area/upload-area'

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[1200px] mx-auto grid grid-rows-[auto_1fr_auto] gap-8 h-full max-h-[900px]">
        <HeroSection />
        <UploadArea />
        <FeaturesSection />
      </div>
    </main>
  )
}

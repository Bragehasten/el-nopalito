import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import HoursLocation from '@/components/HoursLocation'

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <AboutSection />
      <HoursLocation />
    </main>
  )
}

import Hero from '@/components/Hero'
import MenuHighlights from '@/components/MenuHighlights'
import HoursLocation from '@/components/HoursLocation'

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <MenuHighlights />
      <HoursLocation />
    </main>
  )
}

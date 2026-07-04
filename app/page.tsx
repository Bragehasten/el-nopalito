import Hero from '@/components/Hero'
import FeaturedItems from '@/components/FeaturedItems'
import HoursLocation from '@/components/HoursLocation'

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <FeaturedItems />
      <HoursLocation />
    </main>
  )
}

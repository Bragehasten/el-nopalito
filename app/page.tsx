import Hero from '@/components/Hero'
import ReviewMarquee from '@/components/ReviewMarquee'
import FeaturedItems from '@/components/FeaturedItems'
import HoursLocation from '@/components/HoursLocation'

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <ReviewMarquee />
      <FeaturedItems />
      <HoursLocation />
    </main>
  )
}

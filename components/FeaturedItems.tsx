import Image from 'next/image'
import Link from 'next/link'
import OrderNowButton from '@/components/OrderNowButton'

type FeaturedItem = {
  name: string
  image: string
}

const featuredItems: FeaturedItem[] = [
  { name: 'The QuesaBirria', image: '/images/menu/quesabirria-tacos-port-st-lucie.jpeg' },
  { name: 'Oversized Carne Asada Burrito', image: '/images/menu/oversized-carne-asada-burrito.jpeg' },
  { name: 'Sizzling Steak Fajitas', image: '/images/menu/sizzling-steak-fajitas-florida.jpeg' },
]

export default function FeaturedItems() {
  return (
    <section id="featured" className="w-full bg-brand-cream py-20 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-3 text-center">
          🔥 Customer Favorites
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-black text-brand-dark text-center mb-12 md:mb-16">
          Hand-Pressed &amp; Flame-Grilled
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.name}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-display text-xl font-bold text-white">
                  {item.name}
                </p>
                <OrderNowButton className="inline-flex items-center gap-1 mt-1 text-sm font-semibold text-brand-yellow touch-manipulation">
                  Order Now →
                </OrderNowButton>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-12 md:mt-16 inline-flex items-center justify-center gap-2 border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark font-semibold text-sm rounded-full px-6 py-3 transition-colors"
        >
          View Full Menu →
        </Link>
      </div>
    </section>
  )
}

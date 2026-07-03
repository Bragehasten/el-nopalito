import Link from 'next/link'
import { menuItems } from '@/data/menuData'

// Curated homepage teaser — sourced live from the same data module that
// powers /menu, so prices/names/badges here can never drift out of sync
// with the real menu.
const featuredIds = ['main-burrito', 'taco-quesobirria', 'main-quesadilla']
const featuredItems = featuredIds
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => item !== undefined)

export default function MenuHighlights() {
  return (
    <section
      id="menu-highlights"
      className="w-full bg-brand-cream flex flex-col items-center"
    >
      <div className="h-12 md:h-16" />
      <div className="w-full max-w-5xl mx-auto px-8 flex flex-col items-center">
        <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-3 text-center">
          FAN FAVORITES
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4 text-center">
          What Everyone Orders
        </h2>
        <p className="text-brand-gray text-base leading-relaxed mb-10 text-center max-w-xl">
          A taste of our most-loved dishes — handmade, fresh to order, every time.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col bg-white rounded-2xl p-6 border border-brand-cream-dark hover:shadow-md transition-shadow duration-200"
            >
              {item.popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-brand-yellow text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                  🔥 Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-brand-dark mt-2 mb-1">
                {item.name}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed mb-4 flex-1">
                {item.description}
              </p>
              <p className="text-brand-red text-lg font-bold">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center justify-center min-h-[44px] bg-brand-red text-white px-8 py-3 rounded-full font-bold text-sm whitespace-nowrap touch-manipulation shadow-md hover:brightness-95 transition-all"
        >
          View Full Menu →
        </Link>
      </div>
      <div className="h-12 md:h-16" />
    </section>
  )
}

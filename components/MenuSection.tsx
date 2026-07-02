'use client'

import { useMemo, useState } from 'react'
import { menuItems, menuCategories } from '@/data/menuData'
import type { MenuCategory } from '@/data/menuData'
import OrderNowButton from '@/components/OrderNowButton'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('tacos')

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  return (
    <section
      id="menu"
      className="w-full bg-brand-cream-dark
        flex flex-col items-center"
    >
      {/* Category Filter Tabs - sticky under the fixed navbar (top-16 matches
          its h-16 height) so the tabs and the desktop Order Now button stay
          reachable while scrolling through the menu grid below */}
      <div className="sticky top-16 z-30 w-full bg-brand-cream-dark pb-12">
        <div className="max-w-5xl mx-auto px-8 pt-4
          flex items-center justify-center md:justify-between gap-4 flex-wrap">
          <div className="flex gap-3 flex-wrap justify-center select-none touch-manipulation">
            {menuCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`inline-flex items-center justify-center py-3 px-6 rounded-full text-sm font-semibold min-w-[130px] ${
                  activeCategory === cat.value
                    ? 'bg-brand-red text-white border-none'
                    : 'bg-white text-brand-dark border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Order Now - desktop/tablet only, mirrors the mobile
              FAB's conversion goal without duplicating it on small screens */}
          <div className="hidden md:block shrink-0">
            <OrderNowButton
              className="min-h-[44px] inline-flex items-center gap-2
                bg-brand-yellow text-brand-dark px-5 py-2.5
                rounded-full font-bold text-sm
                shadow-md transition-all duration-200
                hover:scale-105 whitespace-nowrap"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="w-full max-w-5xl mx-auto px-8">
        <div className="w-full grid grid-cols-1
          md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5
                border border-gray-100
                hover:shadow-lg
                hover:border-brand-red/20
                hover:-translate-y-1
                transition-all duration-200
                flex flex-col"
            >
              {/* Name and Price Row */}
              <div className="flex justify-between
                items-start gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold
                    text-brand-dark text-base
                    leading-snug">
                    {item.name}
                  </p>
                  {item.spanishName && (
                    <p className="text-xs
                      text-brand-gray italic mt-0.5">
                      {item.spanishName}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-bold
                  text-brand-red text-lg leading-snug">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Popular Badge */}
              {item.popular && (
                <div className="flex mb-2">
                  <span className="inline-flex
                    items-center gap-1 bg-brand-yellow
                    text-white text-xs font-bold
                    px-2.5 py-1 rounded-full">
                    ⭐ Popular
                  </span>
                </div>
              )}

              {/* Description */}
              <p
                className="text-sm text-brand-gray
                  leading-relaxed mt-1"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <div className="w-full max-w-5xl mx-auto
        px-8 mt-16 text-center">
        <p className="text-brand-gray text-sm italic">
          🌶️ All tacos served on handmade corn tortillas.
          Ask about our daily specials!
        </p>
      </div>

      {/* Bottom spacer */}
      <div className="h-12 md:h-16" />

    </section>
  )
}

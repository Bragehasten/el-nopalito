'use client'

import Image from 'next/image'
import OrderNowButton from '@/components/OrderNowButton'
import type { MenuItem } from '@/data/menuData'

const CATEGORY_EMOJI: Record<MenuItem['category'], string> = {
  tacos: '🌮',
  mains: '🍽️',
  lunch: '☀️',
}

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <OrderNowButton className="group relative flex flex-col bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-brand-yellow/30 text-left w-full">
      {/* Image header */}
      <div className="relative aspect-video w-full overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-red/30">
            <span className="text-5xl" aria-hidden="true">{CATEGORY_EMOJI[item.category]}</span>
          </div>
        )}

        {(item.popular || item.spicy || item.isNew) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {item.popular && (
              <span className="bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                🔥 Popular
              </span>
            )}
            {item.spicy && (
              <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                🌶️ Spicy
              </span>
            )}
            {item.isNew && (
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ✨ New
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content body */}
      <div className="flex flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xl font-bold text-white leading-snug">{item.name}</p>
          <span className="shrink-0 text-brand-yellow font-bold text-lg">${item.price.toFixed(2)}</span>
        </div>
        {item.spanishName && (
          <p className="text-xs text-white/50 italic mt-0.5">{item.spanishName}</p>
        )}
        <p className="text-gray-400 text-sm line-clamp-2 mt-2">{item.description}</p>

        <span className="text-brand-yellow text-sm font-semibold mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Add to Order →
        </span>
      </div>
    </OrderNowButton>
  )
}

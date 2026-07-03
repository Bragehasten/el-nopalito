import type { Metadata } from 'next'
import MenuSection from '@/components/MenuSection'
import OrderNowButton from '@/components/OrderNowButton'
import MenuStickyOrderBar from '@/components/MenuStickyOrderBar'

export const metadata: Metadata = {
  title: 'Menu | El Nopalito',
  description:
    "Explore El Nopalito's full menu — authentic tacos, birria, carne asada, al pastor, burritos and more. Handmade tortillas, real ingredients. Port St. Lucie, FL.",
}

export default function MenuPage() {
  return (
    <main className="w-full">
      <section
        className="w-full flex flex-col items-center text-center"
        style={{
          background: 'linear-gradient(to bottom, #26211D, #3A2318)'
        }}
      >
        <div className="h-28 md:h-36" />
        <div className="w-full max-w-5xl mx-auto px-8 pb-14 md:pb-20">
          <p className="text-brand-yellow text-sm font-semibold tracking-widest uppercase mb-3">
            EL NOPALITO
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight">
            <span className="text-white">Our Full </span>
            <span className="text-brand-red">Menu</span>
          </h1>
          <p className="font-body text-base md:text-xl text-white/80 leading-relaxed mt-4">
            Handmade tortillas. Bold flavors. Real ingredients.
          </p>
          <div id="menu-hero-order-button" className="flex justify-center mt-6">
            <OrderNowButton
              className="w-full max-w-xs min-h-[44px] inline-flex items-center justify-center gap-2
                bg-brand-yellow text-brand-dark px-8 py-4
                rounded-full font-bold text-base
                transition-all duration-200 shadow-lg shadow-orange-500/30
                hover:scale-105 whitespace-nowrap"
            />
          </div>
        </div>
      </section>
      <MenuSection />
      <MenuStickyOrderBar />
    </main>
  )
}

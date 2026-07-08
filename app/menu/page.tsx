import type { Metadata } from 'next'
import MenuSection from '@/components/MenuSection'
import MenuStickyOrderBar from '@/components/MenuStickyOrderBar'
import { menuItems, menuCategories } from '@/data/menuData'

const MENU_TITLE = 'Menu | El Nopalito'
const MENU_DESCRIPTION =
  "Explore El Nopalito's full menu — authentic tacos, birria, carne asada, al pastor, burritos and more. Handmade tortillas, real ingredients. Port St. Lucie, FL."

export const metadata: Metadata = {
  title: MENU_TITLE,
  description: MENU_DESCRIPTION,
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: MENU_TITLE,
    description: MENU_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: MENU_TITLE,
    description: MENU_DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'El Nopalito Menu',
  hasMenuSection: menuCategories.map((category) => ({
    '@type': 'MenuSection',
    name: category.label.split(' ').slice(1).join(' '),
    hasMenuItem: menuItems
      .filter((item) => item.category === category.value)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        offers: {
          '@type': 'Offer',
          price: item.price.toFixed(2),
          priceCurrency: 'USD',
        },
      })),
  })),
}

export default function MenuPage() {
  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section
        id="menu-hero"
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
        </div>
      </section>
      <MenuSection />
      <MenuStickyOrderBar />
    </main>
  )
}

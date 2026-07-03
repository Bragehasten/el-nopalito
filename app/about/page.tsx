import type { Metadata } from 'next'
import AboutSection from '@/components/AboutSection'

const ABOUT_TITLE = 'About Us | El Nopalito'
const ABOUT_DESCRIPTION =
  "El Nopalito has been serving Port St. Lucie authentic Mexican street food made the traditional way — handmade tortillas, slow-marinated meats, and recipes passed down through generations."

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

export default function AboutPage() {
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
            <span className="text-white">More Than Just </span>
            <span className="text-brand-red">a Food Truck</span>
          </h1>
        </div>
      </section>
      <AboutSection />
    </main>
  )
}

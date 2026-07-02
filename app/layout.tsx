import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ContactBar from '@/components/ContactBar'
import Footer from '@/components/Footer'
import MobileBar from '@/components/MobileBar'
import { BUSINESS, getOpeningHoursSpecification } from '@/lib/constants'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://elnopalitopsl.com'),
  title: 'El Nopalito | Authentic Mexican Food Truck — Port St. Lucie, FL',
  description:
    "El Nopalito is Port St. Lucie's most loved Mexican food truck. Authentic tacos, birria, carne asada, al pastor, burritos and more. Handmade tortillas. 101 NW Airoso Blvd. Open Wed–Sun 11am–9pm.",
  keywords:
    'El Nopalito, Mexican food truck Port St Lucie, tacos Port St Lucie, birria tacos, carne asada, authentic Mexican food Florida, best tacos PSL',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'El Nopalito | Authentic Mexican Food Truck — Port St. Lucie, FL',
    description:
      "Port St. Lucie's most loved Mexican food truck. Authentic tacos, birria, carne asada, al pastor and more. Handmade tortillas. Open Wed–Sun 11am–9pm.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Nopalito | Authentic Mexican Food Truck — Port St. Lucie, FL',
    description:
      "Port St. Lucie's most loved Mexican food truck. Authentic tacos, birria, carne asada and more. Open Wed–Sun 11am–9pm.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: BUSINESS.name,
  description:
    'Authentic Mexican food truck serving tacos, birria, carne asada, al pastor, burritos and more in Port St. Lucie, FL.',
  url: 'https://elnopalitopsl.com',
  telephone: BUSINESS.phoneE164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  servesCuisine: 'Mexican',
  priceRange: '$',
  openingHoursSpecification: getOpeningHoursSpecification(),
  hasMap: BUSINESS.googleMapsUrl,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-brand-cream text-brand-dark min-h-screen antialiased overflow-x-hidden">
        <Navbar />
        {children}
        <ContactBar />
        <Footer />
        {/* Reserves space so the fixed MobileBar doesn't cover the
            end of the page content on mobile. */}
        <div
          className="md:hidden"
          style={{ height: 'calc(4.5rem + env(safe-area-inset-bottom))' }}
          aria-hidden="true"
        />
        <MobileBar />
      </body>
    </html>
  )
}

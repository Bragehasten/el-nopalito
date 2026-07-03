'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUSINESS, BUSINESS_ADDRESS_LINE, getHoursSummary } from '@/lib/constants'

const quickLinks = [
  { label: 'Our Menu',         href: '/menu'    },
  { label: 'About Us',         href: '/about'   },
  { label: 'Hours & Location', href: '/#hours'  },
  { label: 'Contact',          href: '/#contact' },
]

export default function Footer() {
  const pathname = usePathname()
  const { openDaysLabel, hoursLabel, closedDaysLabel } = getHoursSummary()

  return (
    <footer
      className="w-full bg-brand-dark
        flex flex-col items-center"
      style={{ borderTop: '4px solid #C1502D' }}
    >
      <div className="w-full max-w-5xl mx-auto
        px-8 sm:px-12 lg:px-16 pt-20 md:pt-24 pb-16">

        {/* Top three-column grid */}
        <div className="w-full grid grid-cols-1
          md:grid-cols-3 gap-16 mb-20">

          {/* Column 1 — Brand */}
          <div>
            <p className="font-display text-3xl font-bold text-white mb-2">El Nopalito</p>
            <p className="text-brand-yellow text-sm font-semibold tracking-wide mb-4">
              Authentic Mexican Street Food
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Serving the Treasure Coast with bold flavors, handmade tortillas, and recipes
              made the traditional way.
            </p>
            <p className="text-white/40 text-xs mb-3">Follow us for daily specials</p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/elnopalito2019/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="El Nopalito on Facebook"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors">
                  <span className="text-white font-bold text-sm">f</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <p className="text-white font-semibold text-sm tracking-widest uppercase">
              Quick Links
            </p>
            <div className="w-6 h-0.5 bg-brand-red mt-2 mb-6" />
            <div className="space-y-3">
              {quickLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 transition-colors ${
                      isActive ? 'text-brand-yellow font-semibold' : 'text-white/60 hover:text-brand-yellow'
                    }`}
                  >
                    <span className="text-brand-red text-xs">→</span>
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Column 3 — Contact Info */}
          <div>
            <p className="text-white font-semibold text-sm tracking-widest uppercase">
              Visit Us
            </p>
            <div className="w-6 h-0.5 bg-brand-red mt-2 mb-6" />

            <div className="flex items-start gap-2 mb-4">
              <span>📍</span>
              <p className="text-white/60 text-sm leading-relaxed">{BUSINESS_ADDRESS_LINE}</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span>📞</span>
              <a
                href={BUSINESS.phoneHref}
                className="text-white/60 hover:text-brand-yellow text-sm transition-colors"
              >
                {BUSINESS.phone}
              </a>
            </div>

            <div className="flex items-start gap-2">
              <span>🕐</span>
              <div className="text-white/60 text-sm leading-relaxed">
                <p>{openDaysLabel}: {hoursLabel}</p>
                {closedDaysLabel && <p>{closedDaysLabel}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-white/10
          pt-10 mt-6 flex flex-col md:flex-row
          items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} El Nopalito. All rights reserved.</p>
          <p className="text-white/40 text-xs text-center">
            Port St. Lucie, FL &nbsp;•&nbsp; Authentic Street Food
          </p>
        </div>

      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUSINESS, BUSINESS_ADDRESS_LINE, getHoursSummary } from '@/lib/constants'
import OrderNowButton from '@/components/OrderNowButton'

const quickLinks = [
  { label: 'Home',      href: '/'          },
  { label: 'Menu',      href: '/menu'      },
  { label: 'Our Story', href: '/#our-story' },
]

export default function Footer() {
  const pathname = usePathname()
  const { openDaysLabel, hoursLabel, closedDaysLabel } = getHoursSummary()

  return (
    <footer className="relative bg-brand-dark text-white pt-10 pb-6 md:pt-20 md:pb-10 border-t border-white/10 overflow-hidden">
      {/* Premium texture — soft radial blooms, no image asset needed */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(224,167,62,0.08), transparent 55%), radial-gradient(circle at 85% 100%, rgba(193,80,45,0.08), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">

        {/* Column 1 — Brand */}
        <div>
          <p className="font-display text-3xl font-bold text-brand-yellow mb-2">El Nopalito</p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Authentic Mexican Street Food. Port St. Lucie&apos;s finest.
          </p>
          <a
            href="https://www.facebook.com/elnopalito2019/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="El Nopalito on Facebook"
            className="inline-flex w-9 h-9 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-brand-red hover:border-brand-red transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>

        {/* Column 2 — Explore */}
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">Explore</p>
          <ul className="space-y-2">
            {quickLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-block transition-all duration-300 hover:text-brand-yellow hover:translate-x-1 ${
                      isActive ? 'text-brand-yellow font-semibold' : 'text-white/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <OrderNowButton className="text-white/70 hover:text-brand-yellow hover:translate-x-1 transition-all duration-300 text-left">
                Order Now
              </OrderNowButton>
            </li>
          </ul>
        </div>

        {/* Column 3 — Find Us */}
        <div className="border-l border-white/10 pl-4">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">Find Us</p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">{BUSINESS_ADDRESS_LINE}</p>
          <a href={BUSINESS.phoneHref} className="text-white/70 hover:text-brand-yellow text-sm transition-colors">
            {BUSINESS.phone}
          </a>
        </div>

        {/* Column 4 — Hours */}
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">Hours</p>
          <p className="text-white/70 text-sm leading-relaxed">{openDaysLabel}: {hoursLabel}</p>
          {closedDaysLabel && <p className="text-white/70 text-sm leading-relaxed">{closedDaysLabel}</p>}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="border-t border-white/10 mt-8 pt-6 md:mt-16 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tacos El Nopalito. All rights reserved.</p>
          <p>
            Designed &amp; Built by{' '}
            <a
              href="https://launchpointwebdesign.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-yellow transition-colors duration-300"
            >
              Launchpoint Web Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

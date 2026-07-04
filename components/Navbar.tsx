'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUSINESS, isOpenNow } from '@/lib/constants'
import OrderNowButton from '@/components/OrderNowButton'

const navLinks = [
  { label: 'Menu',    href: '/menu'    },
  { label: 'About',   href: '/about'   },
  { label: 'Hours',   href: '/#hours'   },
]

// Mobile dropdown additionally surfaces a "Home" link at the top, since
// there's no persistent logo/home affordance once the dropdown covers the
// screen (desktop keeps just the logo for that).
const mobileNavLinks = [{ label: 'Home', href: '/' }, ...navLinks]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Start as "unknown" so server-rendered HTML and the first client render
  // are identical, then refresh periodically so the badge doesn't go stale
  // if the tab is left open across an open/close boundary.
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const refresh = () => setOpen(isOpenNow())
    refresh()
    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const statusBadgeStyle: React.CSSProperties = open
    ? {
        background: 'rgba(110, 139, 92, 0.14)',
        border: '1px solid rgba(110, 139, 92, 0.45)',
        color: isScrolled ? '#3F5335' : '#A9C199',
      }
    : {
        background: 'rgba(193, 80, 45, 0.14)',
        border: '1px solid rgba(193, 80, 45, 0.45)',
        // Closed state needs a darker tone once scrolled (white bar)
        // to stay readable; the pale tone still works on the
        // transparent/dark hero background.
        color: isScrolled ? '#8A3B20' : 'rgba(255, 255, 255, 0.7)',
      }

  const statusBadge = open !== null && (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
      style={statusBadgeStyle}
    >
      {open ? '● Open Now' : '○ Currently Closed'}
    </span>
  )

  return (
    <>
      {/* Navbar bar - only as tall as the bar itself. Left brand + status
          badge sit at their natural width; right nav+CTA also natural
          width. */}
      <div
        className={`fixed top-0 left-0 right-0 h-16 z-[100] flex items-center justify-between px-5 pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]' : 'bg-transparent shadow-none'
        }`}
      >
        {/* Left zone - brand + status badge, all sizes */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="font-display text-2xl font-bold text-brand-red whitespace-nowrap"
          >
            El Nopalito
          </Link>
          {statusBadge}
        </div>

        {/* Right zone - desktop nav + CTAs, mobile hamburger */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium touch-manipulation ${
                    isActive
                      ? 'text-brand-red font-semibold'
                      : isScrolled
                      ? 'text-brand-dark'
                      : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={BUSINESS.phoneHref}
              className={`inline-flex items-center gap-1.5 text-white py-2 px-4 rounded-full text-sm font-semibold whitespace-nowrap touch-manipulation ${
                isScrolled ? 'bg-brand-red border-none' : 'bg-transparent border-2 border-white'
              }`}
            >
              📞 Call Now
            </a>
            <OrderNowButton className="inline-flex items-center gap-1.5 min-h-[44px] bg-brand-yellow text-brand-dark py-2 px-4 rounded-full text-sm font-bold whitespace-nowrap touch-manipulation shadow-md hover:brightness-95 transition-all">
              🛵 Order Now
            </OrderNowButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 touch-manipulation"
          >
            {isMobileMenuOpen ? (
              <span className={`text-xl font-bold leading-none ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
                ✕
              </span>
            ) : (
              <>
                <span className={`block w-6 h-0.5 rounded-xs ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`} />
                <span className={`block w-6 h-0.5 rounded-xs ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`} />
                <span className={`block w-6 h-0.5 rounded-xs ${isScrolled ? 'bg-brand-dark' : 'bg-white'}`} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown - separate from navbar so it does not affect
          touch events. Always rendered, just CSS-hidden when closed
          (rather than JS-conditionally unmounted) so the Order Now
          button's own modal state survives being "closed" by its own
          click handler - see OrderNowButton.tsx. */}
      <div
        className={`fixed top-16 left-0 right-0 z-[99] bg-white border-t border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] pointer-events-auto ${
          isMobileMenuOpen ? '' : 'hidden'
        }`}
      >
        <div className="pt-3 px-5 pb-6">
          {mobileNavLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block w-full text-left text-base py-4 border-b border-gray-100 touch-manipulation ${
                  isActive ? 'text-brand-red font-semibold' : 'text-brand-dark font-medium'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <OrderNowButton
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-1.5 w-full mt-4 bg-brand-yellow text-brand-dark rounded-full py-3 px-4 text-base font-bold touch-manipulation shadow-md"
          >
            🛵 Order Now
          </OrderNowButton>
          <a
            href={BUSINESS.phoneHref}
            onClick={closeMobileMenu}
            className="flex items-center justify-center mt-3 bg-brand-red text-white rounded-full py-3 px-4 text-base font-semibold touch-manipulation"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </>
  )
}

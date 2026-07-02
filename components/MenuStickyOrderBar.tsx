'use client'

import { useEffect, useState } from 'react'
import OrderNowButton from '@/components/OrderNowButton'

// Floating "Order Now" button for mobile, shown only once the visitor has
// scrolled past the hero's own Order Now button (tracked via IntersectionObserver
// on that button's wrapper, id'd below) — avoids showing two Order Now buttons
// at once at the top of the page.
export default function MenuStickyOrderBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('menu-hero-order-button')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' } // account for the fixed navbar height
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-24 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <OrderNowButton
        className="min-h-[44px] inline-flex items-center gap-2
          bg-brand-yellow text-brand-dark px-6 py-4
          rounded-full font-bold text-base
          shadow-xl transition-transform duration-200
          hover:scale-105 whitespace-nowrap"
      />
    </div>
  )
}

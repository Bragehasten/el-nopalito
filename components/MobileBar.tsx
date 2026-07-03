'use client'

import { useDirectionsUrl } from '@/lib/directions'
import OrderNowButton from '@/components/OrderNowButton'

export default function MobileBar() {
  const directionsUrl = useDirectionsUrl()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex bg-brand-dark/80 backdrop-blur-md supports-[backdrop-filter]:bg-brand-dark/60 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <OrderNowButton className="flex-1 flex flex-col items-center justify-center py-3 bg-brand-red/85 text-white touch-manipulation">
        <span className="text-xl">🛵</span>
        <span className="text-xs font-semibold mt-0.5">Order Now</span>
      </OrderNowButton>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions to El Nopalito"
        className="flex-1 flex flex-col items-center justify-center py-3 bg-brand-dark/85 text-white touch-manipulation"
      >
        <span className="text-xl">📍</span>
        <span className="text-xs font-semibold mt-0.5">Directions</span>
      </a>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BUSINESS } from '@/lib/constants'

const ORDER_LINKS = [
  {
    name: 'DoorDash',
    href: 'https://www.doordash.com/store/el-nopalito-port-st.-lucie-24785062/20121352/?srsltid=AfmBOorKQSF03vmAcPCGnBK-JBfWvmraVbQsoznD0ccM6RdG7YNe-tdk',
    emoji: '🚗',
    className: 'bg-[#EB1700] hover:bg-[#C81400]',
  },
  {
    name: 'Uber Eats',
    href: 'https://www.ubereats.com/store/el-nopalito-101-northwest-airoso-boulevard/xQ1FOSlAVgOiCR-DiBEQcg?srsltid=AfmBOooh8d7GNgGWBdUkqICt-aZombdCbUgPwJuH7bs4yPZvcKWl8s6q',
    emoji: '🍔',
    className: 'bg-black hover:bg-neutral-800',
  },
]

export default function OrderOnlineModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Rendered via a portal directly under <body> so this always overlays the
  // full viewport, even when the trigger button lives inside an ancestor
  // with a CSS transform (e.g. a fade/slide-in wrapper) — a transformed
  // ancestor would otherwise become the containing block for this `fixed`
  // element, scoping it to that ancestor's box instead of the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-online-title"
    >
      {/* Backdrop - click to close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: 'fade-in 0.2s ease-out' }}
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
        style={{ animation: 'scale-in 0.2s ease-out' }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-brand-cream-dark text-brand-dark hover:bg-brand-red hover:text-white transition-colors touch-manipulation"
        >
          ✕
        </button>

        <h2
          id="order-online-title"
          className="font-display text-2xl md:text-3xl font-bold text-brand-dark text-center mb-2"
        >
          Order Now
        </h2>
        <p className="text-brand-gray text-sm text-center mb-8">
          Choose how you&apos;d like to order
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-brand-yellow text-brand-dark font-bold text-base text-center transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <span className="text-2xl">📞</span>
            Call to Order
          </a>
          {ORDER_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-2 py-6 rounded-2xl text-white font-bold text-base text-center transition-all duration-200 hover:scale-105 shadow-lg ${link.className}`}
            >
              <span className="text-2xl">{link.emoji}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

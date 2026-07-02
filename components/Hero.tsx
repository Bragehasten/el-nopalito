'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import OrderOnlineModal from '@/components/OrderOnlineModal'
import { useDirectionsUrl } from '@/lib/directions'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const directionsUrl = useDirectionsUrl()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Some mobile browsers (notably iOS Safari) only honor autoplay if the
    // `.muted` DOM property is set directly, not just the `muted` HTML
    // attribute — otherwise the play attempt is silently rejected and the
    // video sits paused on the poster with a tap-to-play button.
    video.muted = true
    video.defaultMuted = true

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay was blocked (e.g. media not ready yet) — the
        // loadeddata/canplay listeners below will retry once it is.
      })
    }

    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
    }
  }, [])

  return (
    <section
      id="home"
      className="w-full relative min-h-[100dvh]
        flex items-center justify-center
        overflow-hidden py-20 md:py-24"
      style={{
        background: 'linear-gradient(to bottom, #1A1A1A, #2C0A0A)'
      }}>
      {/* Background video - fallback gradient above shows
          until this paints and if it fails to load */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay - sits between video and content,
          pointer-events-none so it never blocks taps */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b
          from-black/60 via-black/40 to-black/60"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main content - z-10 sits above video and overlay */}
      <div
        className="relative max-w-4xl mx-auto px-6 text-center"
        style={{ zIndex: 10 }}
      >
        {/* Headline */}
        <div className="mb-4 md:mb-6">
          <h1 className="font-display leading-tight">
            <span className="block text-5xl md:text-7xl
              font-black text-white">
              Authentic Mexican
            </span>
            <span className="block text-5xl md:text-7xl
              font-black text-brand-red">
              Street Food
            </span>
            <span className="block text-2xl md:text-3xl
              font-normal text-white/80 mt-2">
              in Port St. Lucie
            </span>
          </h1>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-3 md:mb-10">
          <div className="w-16 h-1 bg-brand-red
            rounded-full" />
        </div>

        {/* Description */}
        <div className="mb-6 md:mb-10">
          <p className="font-body text-base md:text-xl
            text-white/80 leading-relaxed">
            Handmade tortillas. Bold flavors.
            Real ingredients.
          </p>
          <p className="font-body text-base md:text-xl
            text-white/80 leading-relaxed mt-1">
            The most authentic tacos on the
            Treasure Coast.
          </p>
        </div>

        {/* Primary CTA - full-width (capped) to dominate the secondary row */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() => setIsOrderModalOpen(true)}
            className="w-full max-w-xs min-h-[44px] inline-flex items-center justify-center gap-2
              bg-brand-yellow text-brand-dark px-8 py-4
              rounded-full font-bold text-base
              transition-all duration-200 shadow-lg shadow-orange-500/30
              hover:scale-105 whitespace-nowrap"
          >
            🛵 Order Now
          </button>
        </div>

        {/* Secondary CTAs - ghost/outline style so they don't compete
            with the primary Order Now button */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <Link
            href="/menu"
            className="w-full min-h-[44px] inline-flex items-center justify-center
              border-2 border-white text-white px-5 py-3
              rounded-full font-semibold text-sm
              transition-all duration-200 hover:bg-white/10
              whitespace-nowrap"
          >
            See Our Menu
          </Link>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] inline-flex items-center justify-center
              border-2 border-white text-white px-5 py-3
              rounded-full font-semibold text-sm
              transition-all duration-200 hover:bg-white/10
              whitespace-nowrap"
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            Get Directions
          </a>
        </div>

        {/* Scroll indicator - in-flow on mobile only */}
        <div className="flex justify-center mt-8 md:hidden" style={{ pointerEvents: 'none' }}>
          <div className="w-9 h-9 border-2 border-white/30 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white/60 text-sm">↓</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - absolute on desktop only */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2
          -translate-x-1/2 animate-bounce"
        style={{
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        <div className="w-10 h-10 border-2
          border-white/30 rounded-full flex
          items-center justify-center">
          <span className="text-white/60 text-sm">
            ↓
          </span>
        </div>
      </div>

      <OrderOnlineModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </section>
  )
}

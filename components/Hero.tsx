'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        overflow-hidden pt-20 pb-28 md:py-24"
      style={{
        background: 'linear-gradient(to bottom, #26211D, #3A2318)'
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
          from-brand-dark/70 via-brand-dark/45 to-brand-dark/70"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main content - z-20 sits above video and overlay */}
      <div
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Headline */}
        <div className="mb-2 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <h1 className="font-display leading-[1.1] md:leading-tight">
            <span className="block text-xl md:text-2xl
              font-semibold text-white/80 tracking-wide uppercase mb-1">
              Port St. Lucie&apos;s
            </span>
            <span className="block text-5xl md:text-7xl
              font-black text-white">
              Premier Authentic
            </span>
            <span className="block text-5xl md:text-7xl
              font-black text-brand-red">
              Taqueria
            </span>
          </h1>
        </div>

        {/* Sub-headline */}
        <p
          className="text-xl md:text-2xl text-brand-yellow font-semibold mt-1 md:mt-4 mb-2 md:mb-6 animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          Made Fresh Every Day
        </p>

        {/* Divider */}
        <div className="flex justify-center mb-2 md:mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="w-16 h-1 bg-brand-red
            rounded-full" />
        </div>

        {/* Description - hidden on mobile to save vertical space, video
            and headline carry the message there; visible from md up */}
        <div className="hidden md:block mb-6 md:mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
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

        {/* CTA row - single "See Our Menu" link, centered */}
        <div
          className="flex flex-row items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            href="/menu"
            className="flex-1 md:flex-none md:w-auto min-h-[44px] inline-flex items-center justify-center
              border-2 border-white text-white px-8 py-3 md:py-4
              rounded-full font-semibold text-base
              transition-colors duration-300 hover:bg-white hover:text-brand-dark
              whitespace-nowrap"
          >
            See Our Menu
          </Link>
        </div>

        {/* Trust badges - social proof */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-4 md:mt-6 animate-fade-in-up"
          style={{ animationDelay: '450ms' }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark/50 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm font-medium text-white">
            <span className="text-brand-yellow tracking-tight">★★★★★</span>
            {BUSINESS.googleRating} · {BUSINESS.googleReviewCount} Google Reviews
          </span>
        </div>

        {/* Scroll indicator - in-flow on mobile only */}
        <div className="flex justify-center mt-4 md:hidden" style={{ pointerEvents: 'none' }}>
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
    </section>
  )
}

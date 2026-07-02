'use client'

import { BUSINESS, getHoursSummary } from '@/lib/constants'
import { useDirectionsUrl } from '@/lib/directions'

export default function ContactBar() {
  const { openDaysLabel, hoursLabel } = getHoursSummary()
  const directionsUrl = useDirectionsUrl()

  return (
    <section
      id="contact"
      className="w-full bg-brand-red flex flex-col items-center"
    >
      <div className="h-12 md:h-16" />
      <div className="w-full max-w-5xl mx-auto px-8
        flex flex-col md:flex-row items-center
        justify-between gap-10">

          {/* Left — text */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to eat? Come find us.
            </h2>
            <p className="text-white/80 text-base font-body">
              Open {openDaysLabel} &nbsp;•&nbsp; {hoursLabel}
            </p>
          </div>

          {/* Right — buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={BUSINESS.phoneHref}
              className="bg-white text-brand-red font-bold px-8 py-4 rounded-full text-base hover:bg-brand-cream hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap"
            >
              📞 Call Us
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-white font-bold border-2 border-white px-8 py-4 rounded-full text-base hover:bg-white hover:text-brand-red hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              📍 Get Directions
            </a>
          </div>
      </div>
      <div className="h-12 md:h-16" />
    </section>
  )
}

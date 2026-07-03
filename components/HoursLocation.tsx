'use client'

import { useEffect, useState } from 'react'
import { BUSINESS, BUSINESS_ADDRESS_LINE, HOURS, isOpenNow, getTodayName } from '@/lib/constants'
import { useDirectionsUrl } from '@/lib/directions'

export default function HoursLocation() {
  const directionsUrl = useDirectionsUrl()
  // Start as "unknown" so server-rendered HTML and the first client render
  // are identical (neither calls the clock-dependent functions below). The
  // real value is computed after mount, avoiding a hydration mismatch.
  const [open, setOpen] = useState<boolean | null>(null)
  const [todayName, setTodayName] = useState<string | null>(null)

  useEffect(() => {
    const refresh = () => {
      setOpen(isOpenNow())
      setTodayName(getTodayName())
    }
    refresh()

    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hours"
      className="w-full bg-brand-dark flex flex-col items-center"
    >
      <div className="h-12 md:h-16" />
      <div className="w-full max-w-5xl mx-auto px-8
        flex flex-col items-center">
        <div className="w-full grid grid-cols-1
          lg:grid-cols-2 gap-20 items-start">

          {/* Left column — hours */}
          <div>
            {/* Section label + heading */}
            <div>
              <p className="text-brand-yellow text-sm font-semibold tracking-widest uppercase mb-3 text-center">
                FIND US
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 text-center">
                Hours &amp; Location
              </h2>
            </div>

            {/* Open / closed status badge */}
            <div className="mb-8 mt-3 flex justify-center">
              {open === null ? null : open ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-brand-green/20 border border-brand-green/40 text-brand-green">
                  ● OPEN NOW
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-brand-red/20 border border-brand-red/40 text-brand-red-light">
                  ● CLOSED NOW
                </span>
              )}
            </div>

            {/* Hours table */}
            <div>
              {HOURS.map((day) => {
                const isToday = todayName !== null && day.day === todayName

                return (
                  <div
                    key={day.day}
                    className={`flex justify-between items-center py-5 border-b border-white/10 last:border-b-0 ${
                      isToday ? 'bg-white/5 rounded-xl px-3 -mx-3' : ''
                    }`}
                  >
                    {/* Day name */}
                    <div className="flex items-center">
                      {day.open && !isToday && (
                        <span className="w-2 h-2 rounded-full bg-brand-green inline-block mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          isToday
                            ? 'text-brand-yellow font-bold'
                            : day.open
                            ? 'text-white font-medium'
                            : 'text-white/40 font-medium'
                        }`}
                      >
                        {day.day}
                      </span>
                    </div>

                    {/* Hours + today label */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          isToday
                            ? 'text-brand-yellow font-bold'
                            : day.open
                            ? 'text-brand-green font-medium'
                            : 'text-white/30'
                        }`}
                      >
                        {day.hours}
                      </span>
                      {isToday && (
                        <span className="text-brand-yellow text-xs opacity-70">
                          ← Today
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Contact info */}
            <div className="mt-14 space-y-3 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl">📞</span>
                <a
                  href={BUSINESS.phoneHref}
                  className="text-brand-yellow hover:text-white font-semibold text-lg transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-start justify-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-white/70 text-sm leading-snug">{BUSINESS_ADDRESS_LINE}</p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-yellow text-sm hover:underline mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — map */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-64 md:h-96 lg:h-[520px]">
              <iframe
                width="100%"
                height="100%"
                src={BUSINESS.googleMapsEmbed}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="El Nopalito Location"
                className="w-full h-full invert-[.9] hue-rotate-180 contrast-75 saturate-150"
                suppressHydrationWarning
              />
            </div>
            <p className="mt-4 text-center text-white/50 text-xs">
              📍 {BUSINESS_ADDRESS_LINE}
            </p>
          </div>

        </div>
      </div>
      <div className="h-12 md:h-16" />
    </section>
  )
}

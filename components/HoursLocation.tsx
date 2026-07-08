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
  // The interactive embed pulls in Google's own Maps JS SDK (~300KB) once it
  // loads, so it's deferred behind a click instead of loading automatically
  // as soon as it scrolls into view.
  const [showMap, setShowMap] = useState(false)

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
    <section id="hours" className="w-full bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left column — hours */}
          <div>
            <p className="text-brand-yellow text-sm font-semibold tracking-widest uppercase mb-3 text-center lg:text-left">
              FIND US
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 text-center lg:text-left">
              Hours &amp; Location
            </h2>
            <p className="text-white/90 text-lg font-medium mb-8 text-center lg:text-left">
              {BUSINESS_ADDRESS_LINE}
            </p>

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
                    <span
                      className={`text-sm ${
                        isToday ? 'text-brand-yellow font-bold' : 'text-gray-400 font-medium'
                      }`}
                    >
                      {day.day}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          isToday ? 'text-brand-yellow font-bold' : 'text-gray-100 font-medium'
                        }`}
                      >
                        {day.hours}
                      </span>
                      {isToday && open && (
                        <span className="text-xs font-bold text-brand-green">🟢 Open Now</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Phone */}
            <div className="mt-14 flex justify-center lg:justify-start">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-3 text-brand-yellow hover:text-white font-semibold text-lg transition-colors"
              >
                📞 {BUSINESS.phone}
              </a>
            </div>
          </div>

          {/* Right column — map + directions */}
          <div>
            <div className="w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              {showMap ? (
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
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="w-full h-full flex flex-col items-center justify-center gap-3 bg-brand-dark text-white hover:bg-brand-dark/90 transition-colors"
                >
                  <span className="text-4xl">📍</span>
                  <span className="font-semibold text-base">Show Interactive Map</span>
                  <span className="text-white/60 text-sm px-6 text-center">{BUSINESS_ADDRESS_LINE}</span>
                </button>
              )}
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold text-sm rounded-full px-6 py-3 transition-colors"
            >
              📍 Get Directions →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

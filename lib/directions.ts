import { useEffect, useState } from 'react'
import { BUSINESS_ADDRESS_LINE } from './constants'

const destination = BUSINESS_ADDRESS_LINE.replace(/ /g, '+')

export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${destination}`
const APPLE_MAPS_DIRECTIONS_URL = `http://maps.apple.com/?daddr=${destination}`

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

// Client-only — calling this during initial render would diverge from the
// server-rendered HTML (no `navigator` there) and trigger a hydration
// mismatch. Safe inside useEffect/event handlers only.
export function getDirectionsUrl(): string {
  return isIOS() ? APPLE_MAPS_DIRECTIONS_URL : GOOGLE_MAPS_DIRECTIONS_URL
}

// Starts at the universal URL (identical on server and the client's first
// render), then upgrades to the OS-aware URL once mounted in a real browser.
export function useDirectionsUrl(): string {
  const [url, setUrl] = useState(GOOGLE_MAPS_DIRECTIONS_URL)
  useEffect(() => {
    const refresh = () => setUrl(getDirectionsUrl())
    refresh()
  }, [])
  return url
}

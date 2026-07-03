const PHONE_E164 = '+17729794747'

export const BUSINESS = {
  name: "El Nopalito",
  tagline: "Authentic Mexican Street Food Since Day One",
  address: {
    street: "101 NW Airoso Blvd",
    city: "Port St. Lucie",
    state: "FL",
    zip: "34983",
  },
  phone: "(772) 979-4747",
  phoneE164: PHONE_E164,
  phoneHref: `tel:${PHONE_E164}`,
  googleMapsUrl: "https://maps.google.com/?q=El+Nopalito+101+NW+Airoso+Blvd+Port+St+Lucie+FL",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.8453399137243!2d-80.3499865!3d27.3180285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88deed3439684ed9%3A0x52f3c2a95530b769!2sTacos%20El%20Nopalito!5e0!3m2!1sen!2s!4v1747699832574!5m2!1sen!2s",
  geo: { lat: 27.3180285, lng: -80.3499865 },
  googleRating: 4.7,
  googleReviewCount: 214,
}

export const BUSINESS_ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`

export const HOURS = [
  { day: "Monday",    hours: "Closed",             open: false, opensAt: null, closesAt: null },
  { day: "Tuesday",   hours: "Closed",             open: false, opensAt: null, closesAt: null },
  { day: "Wednesday", hours: "11:00 AM – 9:00 PM", open: true,  opensAt: 11,   closesAt: 21    },
  { day: "Thursday",  hours: "11:00 AM – 9:00 PM", open: true,  opensAt: 11,   closesAt: 21    },
  { day: "Friday",    hours: "11:00 AM – 9:00 PM", open: true,  opensAt: 11,   closesAt: 21    },
  { day: "Saturday",  hours: "11:00 AM – 9:00 PM", open: true,  opensAt: 11,   closesAt: 21    },
  { day: "Sunday",    hours: "11:00 AM – 9:00 PM", open: true,  opensAt: 11,   closesAt: 21    },
]

const TIMEZONE = 'America/New_York'

function nowInBusinessTimezone() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date())

  return {
    weekday: parts.find((p) => p.type === 'weekday')!.value,
    hour: Number(parts.find((p) => p.type === 'hour')!.value),
    minute: Number(parts.find((p) => p.type === 'minute')!.value),
  }
}

export function isOpenNow(): boolean {
  const { weekday, hour, minute } = nowInBusinessTimezone()
  const today = HOURS.find((d) => d.day === weekday)
  if (!today || !today.open || today.opensAt == null || today.closesAt == null) return false

  const timeAsNumber = hour + minute / 60
  return timeAsNumber >= today.opensAt && timeAsNumber < today.closesAt
}

export function getTodayName(): string {
  return nowInBusinessTimezone().weekday
}

function formatHour(n: number): string {
  const wholeHours = Math.floor(n)
  const minutes = Math.round((n - wholeHours) * 60)
  if (minutes === 60) return `${String(wholeHours + 1).padStart(2, '0')}:00`
  return `${String(wholeHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function getOpeningHoursSpecification() {
  const openDays = HOURS.filter(
    (d): d is typeof d & { opensAt: number; closesAt: number } =>
      d.open && d.opensAt != null && d.closesAt != null
  )
  if (openDays.length === 0) return []

  // Group by identical hours so days with different schedules (e.g. a
  // shorter Sunday) each get their own correct entry instead of all
  // inheriting the first open day's hours.
  const groups = new Map<string, { opensAt: number; closesAt: number; days: string[] }>()
  for (const d of openDays) {
    const key = `${d.opensAt}-${d.closesAt}`
    const group = groups.get(key)
    if (group) group.days.push(d.day)
    else groups.set(key, { opensAt: d.opensAt, closesAt: d.closesAt, days: [d.day] })
  }

  return Array.from(groups.values()).map((group) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: group.days,
    opens: formatHour(group.opensAt),
    closes: formatHour(group.closesAt),
  }))
}

// Human-readable summary of open days/hours, derived from HOURS so every
// component shows the same schedule instead of hand-typed copies drifting
// out of sync. Assumes open days form one contiguous run (true today).
export function getHoursSummary(): { openDaysLabel: string; hoursLabel: string; closedDaysLabel: string } {
  const openDays = HOURS.filter((d) => d.open)
  const closedDays = HOURS.filter((d) => !d.open)

  const dayAbbr = (day: string) => day.slice(0, 3)
  const rangeLabel = (days: typeof HOURS) =>
    days.length === 0
      ? ''
      : days.length === 1
      ? dayAbbr(days[0].day)
      : `${dayAbbr(days[0].day)}–${dayAbbr(days[days.length - 1].day)}`

  return {
    openDaysLabel: rangeLabel(openDays),
    hoursLabel: openDays[0]?.hours ?? '',
    closedDaysLabel: closedDays.length > 0 ? `${rangeLabel(closedDays)}: Closed` : '',
  }
}

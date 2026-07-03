import { ImageResponse } from 'next/og'

export const alt = 'El Nopalito - Authentic Mexican Street Food in Port St. Lucie, FL'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #26211D, #3A2318)',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#E0A73E',
            marginBottom: 24,
            display: 'flex',
          }}
        >
          EL NOPALITO
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Premier Authentic</span>
          <span style={{ color: '#C1502D' }}>Taqueria</span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.8)',
            marginTop: 28,
            display: 'flex',
          }}
        >
          Port St. Lucie, FL
        </div>
      </div>
    ),
    { ...size }
  )
}

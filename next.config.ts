import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows the dev server's HMR/dev-resource requests when loading the site
  // from this machine's LAN IP (e.g. testing on a phone over WiFi) — without
  // this, Next blocks those requests by default and the page never finishes
  // its client-side JS bootstrap, leaving every onClick-driven element dead.
  allowedDevOrigins: ['10.0.0.236'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const csp = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.stripe.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://images.unsplash.com https://*.supabase.co data: blob:;
  connect-src 'self' blob: https://*.supabase.co https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://raw.githubusercontent.com https://www.gstatic.com;
  frame-src https://js.stripe.com;
  font-src 'self' data:;
`

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp.replace(/\s{2,}/g, ' ').trim() },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

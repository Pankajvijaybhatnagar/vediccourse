/** @type {import('next').NextConfig} */

const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').origin;
  } catch {
    return '';
  }
})();

// Baseline security headers for every page.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self "https://checkout.razorpay.com")' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      new URL('https://res.cloudinary.com/**'), // uploads (Cloudinary)
      new URL('https://lh3.googleusercontent.com/**'), // Google profile photos
      new URL('https://platform-lookaside.fbsbx.com/**'), // Facebook profile photos
      new URL('https://i.ytimg.com/**'), // YouTube thumbnails
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  env: { NEXT_PUBLIC_API_ORIGIN: apiOrigin },
};

export default nextConfig;

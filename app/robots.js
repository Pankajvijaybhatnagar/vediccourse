const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private / per-user pages carry no search value.
      disallow: ['/account', '/booking', '/login', '/forgot-password', '/reset-password'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

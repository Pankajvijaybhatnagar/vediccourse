import HomeClient from '@/components/home/HomeClient';
import { apiGet } from '@/lib/server-api';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/** Never let one failing source take down the home page: log and fall back to an empty value. */
async function safe(promise, fallback) {
  try {
    return (await promise) ?? fallback;
  } catch (err) {
    console.error(`[home] ${err.message}`);
    return fallback;
  }
}

const data = (res) => res?.data;

export default async function Home() {
  const [home, astrologers, liveSessions, poojas, preview, samagri] = await Promise.all([
    safe(apiGet('/cms/home', { revalidate: 300, tags: ['cms'] }).then(data), {}),
    safe(apiGet('/astrologers?limit=8', { revalidate: 300, tags: ['astrologers'] }).then(data), []),
    safe(apiGet('/live-sessions', { revalidate: 120, tags: ['live-sessions'] }).then(data), []),
    safe(apiGet('/poojas?limit=100', { revalidate: 600, tags: ['karmkand'] }).then(data), []),
    safe(apiGet('/poojas/ganesh-poojan', { revalidate: 600, tags: ['karmkand'] }).then(data), null),
    safe(apiGet('/samagri?limit=1', { revalidate: 600, tags: ['karmkand'] }), null),
  ]);

  const faqs = home.faqs ?? [];
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'VedicDhaam',
      url: SITE,
      inLanguage: ['en', 'hi'],
    },
    faqs.length > 0 && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q?.en,
        acceptedAnswer: { '@type': 'Answer', text: f.a?.en },
      })),
    },
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD built from our own API data; `<` is escaped so content can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <HomeClient
        banners={home.banners ?? []}
        stats={home.stats ?? []}
        testimonials={home.testimonials ?? []}
        faqs={faqs}
        blogs={home.blogs ?? []}
        videos={home.videos ?? []}
        news={home.news ?? []}
        blocks={home.blocks ?? {}}
        astrologers={astrologers}
        liveSessions={liveSessions}
        karmkand={{ poojas, preview, samagriCount: samagri?.meta?.total }}
      />
    </>
  );
}

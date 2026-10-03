import { apiGetAll } from '@/lib/server-api';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

// [path, changeFrequency, priority]
const STATIC = [
  ['/', 'daily', 1],
  ['/horoscope', 'daily', 0.9],
  ['/panchang', 'daily', 0.9],
  ['/birth-chart', 'monthly', 0.8],
  ['/kundli-milan', 'monthly', 0.8],
  ['/compatibility', 'monthly', 0.7],
  ['/numerology', 'monthly', 0.7],
  ['/tarot', 'monthly', 0.6],
  ['/zodiac', 'monthly', 0.7],
  ['/astrologers', 'weekly', 0.8],
  ['/contact', 'monthly', 0.6],
  ['/blog', 'daily', 0.7],
  ['/karmkand', 'monthly', 0.8],
  ['/karmkand/pooja-paddhati', 'weekly', 0.8],
  ['/karmkand/pooja-samagri', 'monthly', 0.7],
  ['/jyotish-seekhen', 'monthly', 0.8],
  ['/manobal', 'monthly', 0.8],
  ['/manobal/career-compass', 'monthly', 0.6],
  ['/manobal/self-check', 'monthly', 0.6],
];

/** One API source; an outage just drops those URLs instead of failing the whole sitemap. */
async function urls(path, toPath, changeFrequency, priority) {
  try {
    const items = await apiGetAll(path, { revalidate: 3600 });
    return items.map((item) => ({
      url: `${SITE}${toPath(item)}`,
      lastModified: new Date(item.updatedAt ?? item.publishedAt ?? Date.now()),
      changeFrequency,
      priority,
    }));
  } catch (err) {
    console.error(`[sitemap] ${path}: ${err.message}`);
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
  const dynamic = await Promise.all([
    urls('/poojas', (p) => `/karmkand/pooja-paddhati/${p.slug}`, 'monthly', 0.7),
    urls('/blogs', (b) => `/blog/${b.slug}`, 'monthly', 0.6),
    urls('/jyotish/lessons', (l) => `/jyotish-seekhen/${l.slug}`, 'monthly', 0.7),
    urls('/manobal/chapters', (c) => `/manobal/${c.slug}`, 'monthly', 0.7),
  ]);

  return [
    ...STATIC.map(([path, changeFrequency, priority]) => ({ url: `${SITE}${path}`, lastModified: now, changeFrequency, priority })),
    ...SIGNS.map((s) => ({ url: `${SITE}/zodiac/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })),
    ...dynamic.flat(),
  ];
}

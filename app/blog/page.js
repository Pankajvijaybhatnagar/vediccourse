import PageHeader from '@/components/PageHeader';
import { apiGet, apiGetAll } from '@/lib/server-api';
import BlogIndex from './BlogIndex';

export const metadata = {
  title: 'Blog · ज्योतिष लेख',
  description: 'Articles on Vedic astrology, rashifal, palmistry, pooja vidhi and spiritual living in Hindi and English. वैदिक ज्योतिष, राशिफल और पूजा विधि पर लेख।',
  alternates: { canonical: '/blog' },
};

const PER_PAGE = 12;
const opts = { revalidate: 300, tags: ['blogs'] };

export default async function BlogPage({ searchParams }) {
  const sp = await searchParams;
  const category = typeof sp?.category === 'string' && /^[a-z0-9-]{1,60}$/.test(sp.category) ? sp.category : '';
  const page = Math.max(1, Number.parseInt(sp?.page, 10) || 1);

  const query = new URLSearchParams({ limit: String(PER_PAGE), page: String(page), ...(category && { category }) });
  const [list, all] = await Promise.all([apiGet(`/blogs?${query}`, opts), apiGetAll('/blogs', opts)]);

  // Category chips: every category that has a published post, labelled by its kicker.
  const categories = [];
  for (const b of all) {
    if (b.category && !categories.some((c) => c.key === b.category)) categories.push({ key: b.category, label: b.kicker ?? { en: b.category } });
  }

  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Insights & guidance', hi: 'ज्ञान एवं मार्गदर्शन' }}
        title={{ en: 'VedicDhaam', hi: 'वैदिकधाम' }}
        highlight={{ en: 'Blog', hi: 'ब्लॉग' }}
        crumb={{ en: 'Blog', hi: 'ब्लॉग' }}
        lead={{
          en: 'Rashifal, palmistry, pooja vidhi and practical Vedic wisdom, written by our experts.',
          hi: 'राशिफल, हस्तरेखा, पूजा विधि और व्यावहारिक वैदिक ज्ञान — हमारे विशेषज्ञों द्वारा।',
        }}
      />
      <BlogIndex posts={list?.data ?? []} meta={list?.meta ?? { page: 1, totalPages: 1 }} categories={categories} active={category} />
    </>
  );
}

'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { BlogCard } from '@/components/home/HomeClient';
import styles from './blog.module.css';

const hrefFor = (category, page) => {
  const q = new URLSearchParams();
  if (category) q.set('category', category);
  if (page > 1) q.set('page', String(page));
  const s = q.toString();
  return s ? `/blog?${s}` : '/blog';
};

export default function BlogIndex({ posts, meta, categories, active }) {
  const { t } = useLang();
  const { page = 1, totalPages = 1 } = meta;

  return (
    <section className={styles.section}>
      <div className="container">
        {categories.length > 1 && (
          <nav className={styles.filters} aria-label={t({ en: 'Categories', hi: 'श्रेणियाँ' })}>
            <Link href="/blog" className={`${styles.chip} ${!active ? styles.chipOn : ''}`} aria-current={!active ? 'page' : undefined}>
              {t({ en: 'All posts', hi: 'सभी लेख' })}
            </Link>
            {categories.map((c) => (
              <Link
                key={c.key}
                href={hrefFor(c.key, 1)}
                className={`${styles.chip} ${active === c.key ? styles.chipOn : ''}`}
                aria-current={active === c.key ? 'page' : undefined}
              >
                {t(c.label)}
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <div className={`card ${styles.empty}`} role="status">
            {t({ en: 'No articles here yet. Please check back soon.', hi: 'यहाँ अभी कोई लेख नहीं है। कृपया जल्द ही पुनः देखें।' })}
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((b) => (
              <BlogCard key={b.id ?? b.slug} blog={b} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className={styles.pager} aria-label={t({ en: 'Pagination', hi: 'पृष्ठ' })}>
            {page > 1 ? (
              <Link href={hrefFor(active, page - 1)} className="btn btn-ghost btn-sm" rel="prev">
                <ChevronLeft size={16} /> {t({ en: 'Newer', hi: 'नए' })}
              </Link>
            ) : (
              <span />
            )}
            <span>
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={hrefFor(active, page + 1)} className="btn btn-ghost btn-sm" rel="next">
                {t({ en: 'Older', hi: 'पुराने' })} <ChevronRight size={16} />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </section>
  );
}

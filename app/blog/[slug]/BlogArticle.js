'use client';

import Link from 'next/link';
import { CalendarDays, Clock, UserRound } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { BlogCard } from '@/components/home/HomeClient';
import Markdown from '../Markdown';
import styles from '../blog.module.css';

const GLYPH = { weekly: '☸', palm: '✋', ganesh: '🕉️' };

export default function BlogArticle({ post, related }) {
  const { t, lang } = useLang();
  // Show the reader's language when that version exists, otherwise the other one.
  const pick = (v) => (v ? (lang === 'hi' ? v.hi || v.en : v.en || v.hi) : '');
  const content = pick(post.content);
  const excerpt = pick(post.excerpt);
  const title = pick(post.title);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <section className={`page-top ${styles.section}`} style={{ paddingTop: 'calc(var(--header-h) + 24px)' }}>
      <div className="container">
        <article className={`${styles.article} fade-up`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">{t({ en: 'Home', hi: 'होम' })}</Link> <span aria-hidden="true">›</span>
            <Link href="/blog">{t({ en: 'Blog', hi: 'ब्लॉग' })}</Link>
            {post.category && (
              <>
                <span aria-hidden="true">›</span>
                <Link href={`/blog?category=${post.category}`}>{post.kicker ? t(post.kicker) : post.category}</Link>
              </>
            )}
          </nav>

          {post.kicker && <span className={styles.kicker}>{t(post.kicker)}</span>}
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.meta}>
            <span>
              <UserRound size={16} /> {t(post.author) || 'VedicDhaam'}
            </span>
            {date && (
              <span>
                <CalendarDays size={16} /> <time dateTime={post.publishedAt}>{date}</time>
              </span>
            )}
            <span>
              <Clock size={16} /> {t({ en: `${post.readMinutes || 1} min read`, hi: `${post.readMinutes || 1} मिनट में पढ़ें` })}
            </span>
          </div>

          {post.coverImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage.url} alt={post.coverImage.alt || title} className={styles.cover} />
          ) : (
            <div className={styles.coverArt} aria-hidden="true">
              {GLYPH[post.art] ?? '🌙'}
            </div>
          )}

          {excerpt && excerpt !== title && <p className={styles.lead}>{excerpt}</p>}

          {content ? (
            <Markdown source={content} />
          ) : (
            <p className="muted">{t({ en: 'The full article is coming soon.', hi: 'पूरा लेख शीघ्र उपलब्ध होगा।' })}</p>
          )}

          {post.tags?.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className="muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <aside className={styles.cta}>
            <div>
              <h2>{t({ en: 'Have a question about your chart?', hi: 'अपनी कुंडली के बारे में प्रश्न है?' })}</h2>
              <p>{t({ en: 'Talk to a verified VedicDhaam astrologer.', hi: 'वैदिकधाम के सत्यापित ज्योतिषी से बात करें।' })}</p>
            </div>
            <Link href="/astrologers" className="btn btn-primary">
              {t({ en: 'Consult now', hi: 'अभी परामर्श लें' })}
            </Link>
          </aside>
        </article>

        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-title">
            <div className="row-head">
              <h2 id="related-title">{t({ en: 'Related articles', hi: 'संबंधित लेख' })}</h2>
              <Link href="/blog" className="view-all">
                {t({ en: 'View All', hi: 'सभी देखें' })}
              </Link>
            </div>
            <div className={styles.grid}>
              {related.map((b) => (
                <BlogCard key={b.id ?? b.slug} blog={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, Briefcase, Leaf } from 'lucide-react';
import { SIGNS, getSign, ELEMENTS, localizeSign } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import useToday from '@/lib/useToday';
import useApiQuery, { localISODate } from '@/components/astro/useApiQuery';
import { ErrorState, Skeleton } from '@/components/astro/States';
import styles from './horoscope.module.css';

const PERIODS = [
  { id: 'daily', label: { en: 'Today', hi: 'आज' } },
  { id: 'weekly', label: { en: 'This Week', hi: 'इस सप्ताह' } },
  { id: 'monthly', label: { en: 'This Month', hi: 'इस माह' } },
  { id: 'yearly', label: { en: 'This Year', hi: 'इस वर्ष' } },
];

export default function HoroscopeClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { t, lang } = useLang();
  const today = useToday();
  const [slug, setSlug] = useState(getSign(params.get('sign')) ? params.get('sign') : 'aries');
  const [period, setPeriod] = useState(PERIODS.some((p) => p.id === params.get('period')) ? params.get('period') : 'daily');
  const sign = localizeSign(getSign(slug), lang);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';

  // All 12 readings for the period in one request (a published staff override if present, otherwise generated),
  // so switching signs is instant.
  const { data: readings, loading, error, retry } = useApiQuery(today ? `/horoscopes?period=${period}&date=${localISODate(today)}` : null, {
    keepPrevious: false,
  });
  const reading = readings?.find((r) => r.sign === slug) ?? null;
  const matchSign = reading?.match ? getSign(reading.match.slug) : null;
  const match = matchSign ? localizeSign(matchSign, lang) : null;

  const syncUrl = (s, p) => router.replace(`/horoscope?sign=${s}${p !== 'daily' ? `&period=${p}` : ''}`, { scroll: false });

  const chooseSign = (s) => {
    setSlug(s);
    syncUrl(s, period);
  };

  const choosePeriod = (p) => {
    setPeriod(p);
    syncUrl(slug, p);
  };

  const periodLabel = () => {
    if (!today) return ' ';
    const f = (d, o) => d.toLocaleDateString(locale, o);
    if (period === 'daily') return f(today, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    if (period === 'monthly') return f(today, { month: 'long', year: 'numeric' });
    if (period === 'yearly') return f(today, { year: 'numeric' });
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${f(start, { day: 'numeric', month: 'short' })} – ${f(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  const areas = reading
    ? [
        { key: 'love', Icon: Heart, title: { en: 'Love & Relationships', hi: 'प्रेम और संबंध' }, text: reading.love },
        { key: 'career', Icon: Briefcase, title: { en: 'Career & Money', hi: 'करियर और धन' }, text: reading.career },
        { key: 'health', Icon: Leaf, title: { en: 'Health & Wellness', hi: 'स्वास्थ्य' }, text: reading.health },
      ]
    : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.picker} role="radiogroup" aria-label={t({ en: 'Zodiac sign', hi: 'राशि' })}>
          {SIGNS.map((raw) => {
            const s = localizeSign(raw, lang);
            return (
              <button key={s.slug} role="radio" aria-checked={s.slug === slug} className={`${styles.pick} ${s.slug === slug ? styles.pickActive : ''}`} onClick={() => chooseSign(s.slug)}>
                <span className="glyph">{s.glyph}</span>
                <small>{s.name}</small>
              </button>
            );
          })}
        </div>

        <div className={styles.tabsRow}>
          <div className="tabs" role="tablist" aria-label={t({ en: 'Forecast period', hi: 'अवधि' })}>
            {PERIODS.map((p) => (
              <button key={p.id} role="tab" aria-selected={period === p.id} className="tab" onClick={() => choosePeriod(p.id)}>
                {t(p.label)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.layout}>
          <article className={`card card-glow ${styles.reading}`} key={`${slug}-${period}`}>
            <header className={styles.readingHead}>
              <div className={`${styles.bigGlyph} glyph`}>{sign.glyph}</div>
              <div>
                <h2 className={styles.readingTitle}>
                  {sign.name} {lang === 'hi' && <small>({sign.englishName})</small>}
                </h2>
                <p className={styles.readingMeta}>
                  {sign.dates} · <span style={{ color: ELEMENTS[sign.element].color }}>{sign.elementLabel}</span> · {sign.rulerLabel}
                </p>
                <p className={styles.readingDate}>{periodLabel()}</p>
              </div>
            </header>

            {error ? (
              <ErrorState error={error} onRetry={retry} />
            ) : reading ? (
              <p className={`${styles.lead} fade-up`}>{t(reading.text)}</p>
            ) : (
              <div aria-busy={loading} aria-label={t({ en: 'Consulting the stars…', hi: 'सितारों से परामर्श हो रहा है…' })}>
                <Skeleton lines={3} />
              </div>
            )}

            <div className={styles.areas}>
              {areas.map((a, i) => (
                <div key={a.key} className={`${styles.area} fade-up`} style={{ animationDelay: `${120 + i * 90}ms` }}>
                  <div className={styles.areaHead}>
                    <span className={styles.areaIcon}>
                      <a.Icon size={17} />
                    </span>
                    <h3>{t(a.title)}</h3>
                    <span className={styles.areaScore}>{reading.scores[a.key]}%</span>
                  </div>
                  <div className="meter">
                    <span style={{ width: `${reading.scores[a.key]}%` }} />
                  </div>
                  <p>{t(a.text)}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.side}>
            <div className={`card ${styles.lucky}`}>
              <h3>{t({ en: 'Cosmic Snapshot', hi: 'आज के शुभ संकेत' })}</h3>
              <ul>
                {[
                  [{ en: 'Mood', hi: 'मनोदशा' }, reading && t(reading.mood)],
                  [{ en: 'Lucky color', hi: 'शुभ रंग' }, reading && t(reading.color)],
                  [{ en: 'Lucky number', hi: 'शुभ अंक' }, reading?.number],
                  [{ en: 'Lucky time', hi: 'शुभ समय' }, reading?.time],
                ].map(([label, value]) => (
                  <li key={label.en}>
                    <span>{t(label)}</span>
                    <strong>{value ?? '—'}</strong>
                  </li>
                ))}
                <li>
                  <span>{t({ en: 'Overall luck', hi: 'कुल भाग्य' })}</span>
                  <strong className="gold-text">{reading ? `${reading.scores.luck}%` : '—'}</strong>
                </li>
              </ul>
            </div>

            {match && (
              <Link href={`/compatibility?a=${slug}&b=${match.slug}`} className={`card card-hover ${styles.match}`}>
                <span className={styles.matchLabel}>{t({ en: 'Best match', hi: 'सर्वश्रेष्ठ जोड़ी' })}</span>
                <div className={styles.matchPair}>
                  <span className="glyph">{sign.glyph}</span>
                  <span className={styles.heart}>♥</span>
                  <span className="glyph">{match.glyph}</span>
                </div>
                <strong>{match.name}</strong>
                <small>{t({ en: 'Check compatibility →', hi: 'अनुकूलता देखें →' })}</small>
              </Link>
            )}

            <Link href={`/zodiac/${slug}`} className={`card card-hover ${styles.about}`}>
              <h3>{t({ en: `About ${sign.name}`, hi: `${sign.name} राशि के बारे में` })}</h3>
              <p>{sign.summary}</p>
              <span className={styles.aboutLink}>{t({ en: 'Full sign profile →', hi: 'पूरी जानकारी →' })}</span>
            </Link>

            <Link href="/astrologers" className={`card card-hover ${styles.promo}`}>
              <strong>{t({ en: 'Want a personal reading?', hi: 'व्यक्तिगत भविष्यफल चाहिए?' })}</strong>
              <span>{t({ en: 'Talk to an expert astrologer. First consultation FREE.', hi: 'विशेषज्ञ ज्योतिषी से बात करें। पहला परामर्श मुफ़्त।' })}</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

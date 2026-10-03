'use client';

import Link from 'next/link';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { ELEMENTS } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import styles from '../zodiac.module.css';

/**
 * Data comes from the server page: GET /zodiac/:sign (en + hi), GET /zodiac (for prev/next), GET /compatibility/best.
 */
export default function SignDetail({ slug, sign: bySign, signs, bestMatches: best }) {
  const { t, lang } = useLang();
  const pick = (pair) => (lang === 'hi' && pair.hi ? pair.hi : pair.en);
  const sign = pick(bySign);
  const list = pick(signs) ?? [];
  const index = list.findIndex((s) => s.slug === slug);
  const prev = list[(index + 11) % 12];
  const next = list[(index + 1) % 12];
  const bySlug = Object.fromEntries(list.map((s) => [s.slug, s]));
  const bestMatches = best.map((m) => ({ sign: bySlug[m.sign.slug] ?? m.sign, score: m.overall }));

  const facts = [
    [{ en: 'Dates', hi: 'तिथियाँ' }, sign.dates],
    [{ en: 'Element', hi: 'तत्व' }, sign.elementLabel, ELEMENTS[sign.element]?.color],
    [{ en: 'Modality', hi: 'स्वभाव' }, sign.modalityLabel],
    [{ en: 'Ruling planet', hi: 'स्वामी ग्रह' }, sign.rulerLabel],
    [{ en: 'Lucky number', hi: 'शुभ अंक' }, sign.luckyNumber],
    [{ en: 'Lucky color', hi: 'शुभ रंग' }, sign.luckyColor],
  ];

  return (
    <>
      <section className={`page-top ${styles.detailHero}`}>
        <div className={`container ${styles.detailGrid}`}>
          <div className={`${styles.emblem} fade-up`}>
            <span className={`${styles.emblemGlyph} glyph`}>{sign.glyph}</span>
          </div>
          <div className="fade-up" style={{ animationDelay: '120ms' }}>
            <span className="eyebrow">{sign.symbol}</span>
            <h1>
              <span className="gold-text">{sign.name}</span> {lang === 'hi' && <small className={styles.alt}>{sign.englishName}</small>}
            </h1>
            <p className={styles.summary}>{sign.summary}</p>
            <div className={styles.facts}>
              {facts.map(([label, value, color]) => (
                <div key={label.en} className={styles.fact}>
                  <span>{t(label)}</span>
                  <strong style={color ? { color } : undefined}>{value}</strong>
                </div>
              ))}
            </div>
            <div className={`${styles.traits} ${styles.ctaRow}`} style={{ gap: 12 }}>
              <Link href={`/horoscope?sign=${sign.slug}`} className="btn btn-primary">
                {t({ en: `Today's ${sign.name} Horoscope`, hi: `आज का ${sign.name} राशिफल` })}
              </Link>
              <Link href={`/compatibility?a=${sign.slug}`} className="btn btn-ghost">
                {t({ en: 'Check Compatibility', hi: 'अनुकूलता देखें' })}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container" style={{ display: 'grid', gap: 56 }}>
          <Reveal>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">{t({ en: 'Personality', hi: 'व्यक्तित्व' })}</span>
              <h2>{t({ en: 'Core traits', hi: 'मुख्य गुण' })}</h2>
            </div>
            <div className={styles.traits} style={{ justifyContent: 'center', gap: 12 }}>
              {sign.traits.map((tr) => (
                <span key={tr} className="pill" style={{ fontSize: '1rem', padding: '10px 22px' }}>
                  {tr}
                </span>
              ))}
            </div>
          </Reveal>

          <div className={styles.twoCol}>
            <Reveal className={`card ${styles.listCard} ${styles.good}`}>
              <h3>
                <ThumbsUp size={20} /> {t({ en: 'Strengths', hi: 'शक्तियाँ' })}
              </h3>
              <p>{sign.strengths}</p>
            </Reveal>
            <Reveal delay={120} className={`card ${styles.listCard} ${styles.bad}`}>
              <h3>
                <ThumbsDown size={20} /> {t({ en: 'Weaknesses', hi: 'कमज़ोरियाँ' })}
              </h3>
              <p>{sign.weaknesses}</p>
            </Reveal>
          </div>

          <Reveal>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">{t({ en: 'Cosmic connections', hi: 'शुभ संबंध' })}</span>
              <h2>
                {t({ en: 'Best matches for', hi: 'सर्वश्रेष्ठ जोड़ियाँ:' })} <span className="gold-text">{sign.name}</span>
              </h2>
            </div>
            <div className={styles.matches}>
              {bestMatches.map(({ sign: m, score }) => (
                <Link key={m.slug} href={`/compatibility?a=${sign.slug}&b=${m.slug}`} className={`card card-hover ${styles.matchCard}`}>
                  <span className={`glyph ${styles.matchGlyph}`}>{m.glyph}</span>
                  <h3 style={{ margin: 0 }}>{m.name}</h3>
                  <span className={`${styles.matchScore} gold-text`}>{score}%</span>
                  <small className="muted">{t({ en: 'View full match →', hi: 'पूरा मिलान देखें →' })}</small>
                </Link>
              ))}
            </div>
          </Reveal>

          {prev && next && (
          <nav className={styles.pager} aria-label={t({ en: 'Sign navigation', hi: 'राशि नेविगेशन' })}>
            <Link href={`/zodiac/${prev.slug}`} className="btn btn-ghost">
              ← <span className="glyph">{prev.glyph}</span> {prev.name}
            </Link>
            <Link href="/zodiac" className="btn btn-ghost">
              {t({ en: 'All Signs', hi: 'सभी राशियाँ' })}
            </Link>
            <Link href={`/zodiac/${next.slug}`} className="btn btn-ghost">
              {next.name} <span className="glyph">{next.glyph}</span> →
            </Link>
          </nav>
          )}
        </div>
      </section>
    </>
  );
}

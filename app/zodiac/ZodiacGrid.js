'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SIGNS, ELEMENTS, ELEMENT_HI, localizeSign } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import styles from './zodiac.module.css';

const ELEMENT_DESC = {
  Fire: { en: 'Passionate, dynamic and bold', hi: 'जोशीली, गतिशील और साहसी' },
  Earth: { en: 'Grounded, practical and patient', hi: 'स्थिर, व्यावहारिक और धैर्यवान' },
  Air: { en: 'Intellectual, social and curious', hi: 'बौद्धिक, मिलनसार और जिज्ञासु' },
  Water: { en: 'Intuitive, emotional and deep', hi: 'अंतर्ज्ञानी, भावुक और गहरी' },
};

export default function ZodiacGrid() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? SIGNS : SIGNS.filter((s) => s.element === filter);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.filters}>
          <div className="tabs" role="tablist" aria-label={t({ en: 'Filter by element', hi: 'तत्व से छाँटें' })}>
            {['All', ...Object.keys(ELEMENTS)].map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className="tab" onClick={() => setFilter(f)}>
                {f === 'All' ? t({ en: 'All', hi: 'सभी' }) : lang === 'hi' ? ELEMENT_HI[f] : f}
              </button>
            ))}
          </div>
          {filter !== 'All' && <p className={`${styles.filterNote} fade-up`}>{t(ELEMENT_DESC[filter])}</p>}
        </div>

        <div className={styles.grid}>
          {visible.map((raw, i) => {
            const s = localizeSign(raw, lang);
            return (
              <Link
                key={s.slug}
                href={`/zodiac/${s.slug}`}
                className={`card card-hover ${styles.card} fade-up`}
                style={{ '--accent': ELEMENTS[s.element].color, animationDelay: `${i * 50}ms` }}
              >
                <div className={styles.cardTop}>
                  <span className={`${styles.glyph} glyph`}>{s.glyph}</span>
                  <span className={styles.element}>{s.elementLabel}</span>
                </div>
                <h3>{s.name}</h3>
                <p className={styles.dates}>{s.dates}</p>
                <p className={styles.symbol}>
                  {s.symbol} · {t({ en: 'Ruled by', hi: 'स्वामी' })} {s.rulerLabel}
                </p>
                <div className={styles.traits}>
                  {s.traits.slice(0, 3).map((tr) => (
                    <span key={tr} className="pill">
                      {tr}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

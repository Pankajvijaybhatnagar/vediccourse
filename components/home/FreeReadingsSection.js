'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck, Gift, LockOpen, Zap } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { READINGS } from '@/lib/content';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import styles from './freeReadings.module.css';

const FEATURED = READINGS.filter((r) => r.featured);
const OTHERS = READINGS.filter((r) => !r.featured);

const PERKS = [
  { Icon: Gift, text: { en: '100% free', hi: '100% मुफ़्त' } },
  { Icon: LockOpen, text: { en: 'No sign-up', hi: 'बिना साइन-अप' } },
  { Icon: Zap, text: { en: 'Instant results', hi: 'तुरंत परिणाम' } },
  { Icon: BadgeCheck, text: { en: 'Vedic method', hi: 'वैदिक पद्धति' } },
];

export default function FreeReadingsSection() {
  const { t } = useLang();

  return (
    <section className={styles.section} aria-labelledby="free-readings-title">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>ॐ {t({ en: 'Free tools', hi: 'मुफ़्त सेवाएँ' })}</span>
          <h2 id="free-readings-title">
            {t({ en: 'Free Astrology ', hi: 'मुफ़्त ज्योतिष ' })}
            <span className="gold-text">{t({ en: 'Readings', hi: 'रीडिंग' })}</span>
          </h2>
          <p>{t({ en: 'Kundli, matching, palm reading and more, ready in seconds.', hi: 'कुंडली, मिलान, हस्त रेखा और बहुत कुछ, कुछ ही पलों में।' })}</p>
        </div>
        <ul className={styles.perks}>
          {PERKS.map(({ Icon: I, text }) => (
            <li key={text.en}>
              <I size={16} /> {t(text)}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.featured}>
        {FEATURED.map((r, i) => (
          <Reveal key={r.key} delay={i * 90}>
            <Link href={r.href} className={`${styles.feat} ${styles['feat_' + r.key]}`}>
              <span className={styles.featGlow} aria-hidden="true" />
              <span className={styles.featTop}>
                <span className={styles.featIcon}>
                  <Icon name={r.icon} size={30} strokeWidth={1.5} />
                </span>
                <span className={r.isNew ? styles.newBadge : styles.freeBadge}>{r.isNew ? t({ en: 'New · AI', hi: 'नया · AI' }) : t({ en: 'Free', hi: 'मुफ़्त' })}</span>
              </span>
              <strong>{t(r.label)}</strong>
              <span className={styles.featDesc}>{t(r.desc)}</span>
              <span className={styles.chips}>
                {r.chips.map((c) => (
                  <span key={c.en}>{t(c)}</span>
                ))}
              </span>
              <span className={styles.featCta}>
                {t({ en: 'Start now', hi: 'अभी शुरू करें' })} <ArrowRight size={17} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className={styles.grid}>
        {OTHERS.map((r, i) => (
          <Reveal key={r.key} delay={(i % 5) * 60}>
            <Link href={r.href} className={styles.tile} style={{ '--tone': r.tone }}>
              <span className={styles.tileIcon}>
                <Icon name={r.icon} size={26} strokeWidth={1.6} />
              </span>
              <span className={styles.tileText}>
                <strong>{t(r.label)}</strong>
                <small>{t(r.desc)}</small>
              </span>
              <ArrowRight size={18} className={styles.tileArrow} />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

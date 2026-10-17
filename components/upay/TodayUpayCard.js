'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Flame, Moon, Sparkles, Star, Sun } from 'lucide-react';
import { getDailyUpay } from '@/lib/upay';
import { useLang } from '@/lib/i18n';
import styles from './TodayUpayCard.module.css';

/**
 * Compact "Aaj ka Upay" used on the Panchang and home pages. Computes everything for the given
 * date and city, so it always agrees with the full /aaj-ka-upay page.
 */
export default function TodayUpayCard({ date, city }) {
  const { t } = useLang();
  const u = useMemo(() => (date ? getDailyUpay(date, city) : null), [date, city]);
  if (!u) return null;

  const { day, navratri, headline } = u;
  const lead = navratri ? navratri.devi : u.festivals[0] || u.vrats[0] || u.tithi;
  const steps = (navratri ? navratri.devi.upay : lead.upay || []).slice(0, 2);
  const mantra = navratri ? navratri.devi.beej : lead.mantra;
  const hinduDate = t({
    en: `${day.month.purnimanta.en} ${day.panchang.tithi.paksha.en.split(' ')[0]} ${day.panchang.tithi.name.en} · VS ${day.samvat}`,
    hi: `${day.month.purnimanta.hi} ${day.panchang.tithi.paksha.hi.split(' ')[0]} ${day.panchang.tithi.name.hi} · वि.सं. ${day.samvat}`,
  });

  return (
    <section className={styles.wrap} id="upay" style={navratri ? { '--devi': navratri.devi.color.hex } : undefined}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>
          <Flame size={15} /> {t({ en: "Today's Upay", hi: 'आज का उपाय' })}
        </span>
        <span className={styles.hdate}>{hinduDate}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          {navratri && (
            <span className={styles.badge}>
              {t(navratri.name)} · {t({ en: `Day ${navratri.day}`, hi: `दिन ${navratri.day}` })}
            </span>
          )}
          {!navratri && headline.kind !== 'tithi' && <span className={styles.badge}>{t(headline.kind === 'festival' ? { en: 'Festival', hi: 'पर्व' } : { en: 'Vrat', hi: 'व्रत' })}</span>}
          <h3>
            {t(headline.title)}
            {headline.kind === 'tithi' && <small> · {t({ en: 'deity', hi: 'देवता' })}: {t(u.tithi.deity)}</small>}
          </h3>
          <p className={styles.mantra}>{mantra}</p>
          <ul className={styles.steps}>
            {steps.map((s, i) => (
              <li key={i}>{t(s)}</li>
            ))}
          </ul>
          {navratri && (
            <div className={styles.devi}>
              <span>
                <i style={{ background: navratri.devi.color.hex }} /> {t(navratri.devi.color.name)}
              </span>
              <span>🍯 {t(navratri.devi.bhog)}</span>
              <span>🌺 {t(navratri.devi.flower)}</span>
            </div>
          )}
        </div>

        <ul className={styles.side}>
          <li>
            <Moon size={16} />
            <span>
              <small>{t({ en: 'Tithi', hi: 'तिथि' })} · {t(u.tithi.name)}</small>
              <strong>{t(u.tithi.upay[0])}</strong>
            </span>
          </li>
          <li>
            <Sun size={16} />
            <span>
              <small>{t(u.vaar.name)} · {t(u.vaar.deity)}</small>
              <strong>{t(u.vaar.upay[0])}</strong>
            </span>
          </li>
          <li>
            <Star size={16} />
            <span>
              <small>{t({ en: 'Nakshatra', hi: 'नक्षत्र' })} · {t(u.nakshatra.name)}</small>
              <strong>{t(u.nakshatra.upay)}</strong>
            </span>
          </li>
        </ul>
      </div>

      {(u.festivals.length > 0 || u.vrats.length > 0) && (
        <div className={styles.tags}>
          {[...u.festivals, ...u.vrats].map((x) => (
            <span key={x.key}>
              <Sparkles size={13} /> {t(x.name)}
            </span>
          ))}
        </div>
      )}

      <Link href={`/aaj-ka-upay?date=${date}`} className={styles.cta}>
        {t({ en: 'See full upay — rashi-wise, timings, Navratri & upcoming vrat', hi: 'पूरा उपाय देखें — राशि अनुसार, शुभ समय, नवरात्रि एवं आगामी व्रत' })} <ChevronRight size={16} />
      </Link>
    </section>
  );
}

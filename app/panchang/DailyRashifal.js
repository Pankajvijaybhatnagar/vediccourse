'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, ChevronLeft, ChevronRight, Clock, Compass, Hash, Heart, HeartPulse, IndianRupee, Moon, Palette, ShieldAlert, Sparkles, Star, X,
} from 'lucide-react';
import { getDailyRashifal } from '@/lib/rashifal';
import { fmtMinutes } from '@/lib/panchang';
import { ELEMENTS, localizeSign } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import styles from './rashifal.module.css';

const AREAS = [
  { key: 'career', icon: Briefcase, label: { en: 'Career', hi: 'करियर / कार्य' } },
  { key: 'money', icon: IndianRupee, label: { en: 'Money', hi: 'धन' } },
  { key: 'love', icon: Heart, label: { en: 'Love & Family', hi: 'प्रेम एवं परिवार' } },
  { key: 'health', icon: HeartPulse, label: { en: 'Health', hi: 'स्वास्थ्य' } },
];

function Stars({ n }) {
  return (
    <span className={`${styles.stars} ${styles[`r${n}`]}`} aria-label={`${n} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} strokeWidth={1.8} className={i <= n ? styles.on : styles.off} aria-hidden="true" />
      ))}
    </span>
  );
}

function LuckyChips({ r, compact }) {
  const { t } = useLang();
  const items = [
    { icon: Palette, label: { en: 'Colour', hi: 'शुभ रंग' }, value: t(r.lucky.color) },
    { icon: Hash, label: { en: 'Number', hi: 'शुभ अंक' }, value: r.lucky.number },
    r.lucky.time && { icon: Clock, label: { en: 'Shubh time', hi: 'शुभ समय' }, value: `${fmtMinutes(r.lucky.time.start)} – ${fmtMinutes(r.lucky.time.end)}` },
    !compact && { icon: Compass, label: { en: 'Direction', hi: 'शुभ दिशा' }, value: t(r.lucky.direction) },
  ].filter(Boolean);
  return (
    <ul className={compact ? styles.chips : styles.luckyList}>
      {items.map(({ icon: Ico, label, value }) => (
        <li key={label.en}>
          <Ico size={compact ? 14 : 18} />
          <span>
            <small>{t(label)}</small>
            <strong>{value}</strong>
          </span>
        </li>
      ))}
    </ul>
  );
}

function DetailModal({ list, index, onIndex, onClose }) {
  const { t, lang } = useLang();
  const r = list[index];
  const short = (x) => (lang === 'hi' ? x.name.hi : x.sign.name);
  const step = (d) => onIndex((index + d + list.length) % list.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % list.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + list.length) % list.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, list.length, onClose, onIndex]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[`r${r.stars}`]}`}
        style={{ '--el': ELEMENTS[r.element].color }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rf-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.modalHead} key={r.slug}>
          <span className={`glyph ${styles.modalGlyph}`}>{r.glyph}</span>
          <div className={styles.names}>
            <h3 id="rf-title">
              {r.name.hi} <span>· {r.sign.name}</span>
            </h3>
            <small>
              {t({ en: 'Name letters', hi: 'नाम अक्षर' })}: {r.letters}
            </small>
            <div className={styles.houseRow}>
              <span className={styles.house}>
                <Moon size={13} /> {t(r.houseLabel)}
              </span>
              {r.chandrashtama && <span className={styles.ashtama}>{t({ en: 'Chandrashtama', hi: 'चंद्राष्टम' })}</span>}
            </div>
          </div>
          <div className={styles.rating}>
            <Stars n={r.stars} />
            <span className={styles.ratingPill}>{t(r.rating)}</span>
          </div>
          <button className={styles.close} onClick={onClose} aria-label={t({ en: 'Close', hi: 'बंद करें' })}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.modalBody} key={`b-${r.slug}`}>
          <p className={styles.modalTheme}>{t(r.theme)}</p>
          <div className={styles.detail}>
            <div className={styles.detailMain}>
              <p className={styles.detailOverview}>{t(r.overview)}</p>
              <div className={styles.areas}>
                {AREAS.map(({ key, icon: Ico, label }) => (
                  <div key={key} className={styles.area}>
                    <div className={styles.areaHead}>
                      <span className={styles.areaIcon}>
                        <Ico size={17} />
                      </span>
                      <strong>{t(label)}</strong>
                      <em>{r.scores[key]}%</em>
                    </div>
                    <div className={styles.meter}>
                      <span style={{ width: `${r.scores[key]}%` }} />
                    </div>
                    <p>{t(r[key])}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className={styles.detailSide}>
              <div className={styles.caution}>
                <ShieldAlert size={18} />
                <div>
                  <strong>{t({ en: 'Be careful', hi: 'सावधानी' })}</strong>
                  <p>{t(r.caution)}</p>
                </div>
              </div>
              <div className={styles.remedy}>
                <span className={styles.remedyTitle}>
                  <Sparkles size={16} /> {t({ en: "Today's remedy", hi: 'आज का उपाय' })}
                </span>
                <p className={styles.mantra}>{r.remedy.mantra}</p>
                {r.remedy.extra && <p className={styles.mantra}>{r.remedy.extra}</p>}
                <p className={styles.remedyNote}>
                  {t({ en: `Chant 108 times (rashi lord: ${r.lord.en}).`, hi: `108 बार जाप करें (राशि स्वामी: ${r.lord.hi})।` })} {t(r.remedy.act)}
                </p>
              </div>
              <LuckyChips r={r} />
            </aside>
          </div>
        </div>

        <footer className={styles.modalFoot}>
          <button className="btn btn-ghost btn-sm" onClick={() => step(-1)}>
            <ChevronLeft size={16} /> {short(list[(index - 1 + list.length) % list.length])}
          </button>
          <span>
            {index + 1} / {list.length}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={() => step(1)}>
            {short(list[(index + 1) % list.length])} <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default function DailyRashifal({ data, date }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(null);
  const list = useMemo(() => getDailyRashifal(data, date), [data, date]);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';
  const dateLabel = new Date(`${date}T12:00`).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const moon = localizeSign(data.moonSign, lang);
  const ashtama = list.find((r) => r.chandrashtama);
  const best = list.filter((r) => r.stars === 5);


  return (
    <section className={styles.wrap} id="rashifal">
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <span className={styles.eyebrow}>
            <Moon size={15} /> {dateLabel}
          </span>
          <h2>
            {t({ en: "Today's Rashifal", hi: 'आज का राशिफल' })} <span>{t({ en: 'for all 12 signs', hi: 'सभी 12 राशियों का' })}</span>
          </h2>
          <p>
            {t({
              en: `The Moon is in ${moon.name} today, in ${data.nakshatra.name.en} nakshatra. Each reading is based on the house the Moon transits from your rashi (Chandra gochar).`,
              hi: `आज चंद्रमा ${moon.name} राशि और ${data.nakshatra.name.hi} नक्षत्र में है। हर राशिफल आपकी राशि से चंद्रमा के गोचर भाव (चंद्र गोचर) पर आधारित है।`,
            })}
          </p>
          <div className={styles.bannerTags}>
            {best.length > 0 && (
              <span className={styles.tagGood}>
                ✦ {t({ en: 'Best today:', hi: 'आज सर्वश्रेष्ठ:' })} {best.map((r) => t(r.name).split(' (')[0]).join(', ')}
              </span>
            )}
            {ashtama && (
              <span className={styles.tagBad}>
                ⚠ {t({ en: 'Chandrashtama:', hi: 'चंद्राष्टम:' })} {t(ashtama.name).split(' (')[0]}
              </span>
            )}
          </div>
        </div>
        <div className={styles.moonOrb} aria-hidden="true">
          <span className="glyph">{data.moonSign.glyph}</span>
          <small>{t({ en: 'Moon sign', hi: 'चंद्र राशि' })}</small>
          <strong>{moon.name}</strong>
        </div>
      </div>

      <nav className={styles.picker} aria-label={t({ en: 'Jump to a rashi', hi: 'राशि चुनें' })}>
        {list.map((r) => (
          <button key={r.slug} onClick={() => setOpen(list.indexOf(r))} className={styles.pick} style={{ '--el': ELEMENTS[r.element].color }}>
            <span className={`glyph ${styles.pickGlyph}`}>{r.glyph}</span>
            <span className={styles.pickName}>{lang === 'hi' ? r.name.hi : r.sign.name}</span>
            <span className={`${styles.pickDot} ${styles[`r${r.stars}`]}`} />
          </button>
        ))}
      </nav>

      <div className={styles.grid}>
        {list.map((r, i) => {
          return (
            <article
              key={r.slug}
              id={`rashi-${r.slug}`}
              className={`${styles.card} ${styles[`r${r.stars}`]}`}
              style={{ '--el': ELEMENTS[r.element].color, animationDelay: `${i * 50}ms` }}
            >
              <header className={styles.cardHead}>
                <span className={`glyph ${styles.glyph}`}>{r.glyph}</span>
                <div className={styles.names}>
                  <h3>
                    {r.name.hi} <span>· {r.sign.name}</span>
                  </h3>
                  <small>
                    {t({ en: 'Name letters', hi: 'नाम अक्षर' })}: {r.letters}
                  </small>
                </div>
                <div className={styles.rating}>
                  <Stars n={r.stars} />
                  <span className={styles.ratingPill}>{t(r.rating)}</span>
                </div>
              </header>

              <div className={styles.houseRow}>
                <span className={styles.house}>
                  <Moon size={13} /> {t(r.houseLabel)}
                </span>
                {r.chandrashtama && <span className={styles.ashtama}>{t({ en: 'Chandrashtama', hi: 'चंद्राष्टम' })}</span>}
              </div>

              <p className={styles.theme}>{t(r.theme)}</p>

              <p className={styles.overview}>{t(r.overview)}</p>
              <LuckyChips r={r} compact />

              <button className={styles.more} onClick={() => setOpen(i)}>
                {t({ en: 'Read full rashifal', hi: 'पूरा राशिफल पढ़ें' })} <ChevronRight size={16} />
              </button>
            </article>
          );
        })}
      </div>

      {open != null && <DetailModal list={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}

      <div className={styles.footer}>
        <p>
          {t({
            en: 'Readings follow the Moon sign at sunrise for the selected date and city — change the date above to see another day. Know your rashi from your name’s first letter or your Moon sign in the kundli.',
            hi: 'राशिफल चुनी गई तिथि और शहर के सूर्योदय के समय की चंद्र राशि पर आधारित है — ऊपर तिथि बदलकर दूसरे दिन का राशिफल देखें। अपनी राशि नाम के पहले अक्षर या कुंडली की चंद्र राशि से जानें।',
          })}
        </p>
        <div className={styles.footerLinks}>
          <Link href="/birth-chart" className="btn btn-primary btn-sm">
            {t({ en: 'Find my Moon sign', hi: 'मेरी चंद्र राशि जानें' })}
          </Link>
          <Link href="/horoscope?period=weekly" className="btn btn-ghost btn-sm">
            {t({ en: 'Weekly & monthly horoscope', hi: 'साप्ताहिक एवं मासिक राशिफल' })}
          </Link>
        </div>
      </div>
    </section>
  );
}

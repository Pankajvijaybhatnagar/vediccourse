'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Radio, Search, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Icon from '@/components/Icon';
import AstrologerCard, { AstroAvatar, bookingRef } from '@/components/booking/AstrologerCard';
import { SKILLS, formatDateTime } from '@/components/booking/format';
import styles from './astrologers.module.css';

const PANEL_INTRO = {
  en: 'Our panel of experts brings together experienced guides and specialists in various Indian knowledge traditions. You can benefit from their knowledge and guidance across fields such as Jyotish, Shastra, Karmkand, Vastu, Tantra Vigyan, Palmistry and Counselling.',
  hi: 'हमारे विशेषज्ञ मंडल में विभिन्न भारतीय ज्ञान-विधाओं के अनुभवी एवं विषय-विशेषज्ञ मार्गदर्शक सम्मिलित हैं। ज्योतिष, शास्त्र, कर्मकांड, वास्तु, तंत्र-विज्ञान, हस्तरेखा तथा काउंसलिंग जैसे विविध क्षेत्रों में इनके ज्ञान एवं मार्गदर्शन का लाभ प्राप्त किया जा सकता है।',
};

/** Footer "Love / Marriage / Career / Financial astrologer" links (?focus=) map to the expertise that covers them. */
const FOCUS = {
  love: { label: { en: 'Love & relationships', hi: 'प्रेम एवं संबंध' }, skills: ['counseling', 'jyotish', 'tarot', 'prashna'] },
  marriage: { label: { en: 'Marriage & Kundli matching', hi: 'विवाह एवं कुंडली मिलान' }, skills: ['jyotish', 'karmkand', 'prashna'] },
  career: { label: { en: 'Career', hi: 'करियर' }, skills: ['jyotish', 'prashna', 'numerology', 'counseling'] },
  money: { label: { en: 'Money & finance', hi: 'धन एवं वित्त' }, skills: ['jyotish', 'vastu', 'numerology'] },
};

export function AstrologersWithFocus(props) {
  const params = useSearchParams();
  const focus = params.get('focus');
  return <AstrologersClient key={focus || 'all'} {...props} focus={FOCUS[focus] ? focus : null} />;
}

export default function AstrologersClient({ astrologers = [], live = [], focus = null }) {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [skill, setSkill] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [activeFocus, setActiveFocus] = useState(focus);

  // Only offer chips for expertise someone on the panel actually has.
  const skillChips = useMemo(() => {
    const present = new Set(astrologers.flatMap((a) => a.skills || []));
    return Object.keys(SKILLS).filter((k) => present.has(k));
  }, [astrologers]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const focusSkills = activeFocus ? FOCUS[activeFocus].skills : null;
    return astrologers.filter(
      (a) =>
        (skill === 'all' || a.skills?.includes(skill)) &&
        (!focusSkills || a.skills?.some((s) => focusSkills.includes(s))) &&
        (!onlineOnly || a.isOnline) &&
        (!q || a.name?.en?.toLowerCase().includes(q) || a.name?.hi?.includes(q) || a.title?.en?.toLowerCase().includes(q))
    );
  }, [astrologers, query, skill, onlineOnly, activeFocus]);

  const anyOnline = astrologers.some((a) => a.isOnline);
  const filtered = query || skill !== 'all' || onlineOnly || activeFocus;
  const reset = () => {
    setQuery('');
    setSkill('all');
    setOnlineOnly(false);
    setActiveFocus(null);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={`card ${styles.intro}`}>{t(PANEL_INTRO)}</p>

        {live.length > 0 && <LiveStrip sessions={live} />}

        <div className={styles.topics} role="tablist" aria-label={t({ en: 'Expertise', hi: 'विशेषज्ञता' })}>
          <button role="tab" aria-selected={skill === 'all'} className={styles.topic} onClick={() => setSkill('all')}>
            <Icon name="Sparkles" size={18} /> {t({ en: 'All', hi: 'सभी' })}
          </button>
          {skillChips.map((k) => (
            <button key={k} role="tab" aria-selected={skill === k} className={styles.topic} onClick={() => setSkill(k)}>
              {t(SKILLS[k])}
            </button>
          ))}
        </div>

        <div className={`card ${styles.filters}`}>
          <div className={styles.search}>
            <Search size={18} />
            <label htmlFor="astro-search" className="sr-only">
              {t({ en: 'Search expert', hi: 'विशेषज्ञ खोजें' })}
            </label>
            <input
              id="astro-search"
              type="search"
              className="input"
              placeholder={t({ en: 'Search by name or expertise…', hi: 'नाम या विशेषज्ञता से खोजें…' })}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {anyOnline && (
            <label className={styles.toggle}>
              <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} />
              <span className={styles.switch} aria-hidden="true" />
              {t({ en: 'Online now', hi: 'अभी ऑनलाइन' })}
            </label>
          )}
        </div>

        {activeFocus && (
          <p className={styles.focus}>
            {t({ en: 'Showing experts for', hi: 'इन विषयों के विशेषज्ञ' })}: <strong>{t(FOCUS[activeFocus].label)}</strong>
            <button type="button" onClick={() => setActiveFocus(null)} aria-label={t({ en: 'Show all experts', hi: 'सभी विशेषज्ञ दिखाएँ' })}>
              <X size={14} />
            </button>
          </p>
        )}

        <p className={styles.count} aria-live="polite">
          {t({ en: `${list.length} ${list.length === 1 ? 'expert' : 'experts'} found`, hi: `${list.length} विशेषज्ञ मिले` })}
        </p>

        {list.length ? (
          <div className={styles.grid}>
            {list.map((a) => (
              <AstrologerCard key={a.id} astro={a} />
            ))}
          </div>
        ) : (
          <div className={`card ${styles.empty}`}>
            <span aria-hidden="true">🔭</span>
            <p>
              {astrologers.length
                ? t({ en: 'No experts match these filters.', hi: 'इन फ़िल्टर से कोई विशेषज्ञ नहीं मिला।' })
                : t({ en: 'Our expert panel is being updated. Please check back soon, or book with any available astrologer.', hi: 'विशेषज्ञ मंडल अद्यतन हो रहा है। कृपया बाद में देखें, या किसी भी उपलब्ध ज्योतिषी के साथ बुक करें।' })}
            </p>
            {filtered ? (
              <button className="btn btn-primary" onClick={reset}>
                {t({ en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' })}
              </button>
            ) : (
              <Link href="/contact" className="btn btn-primary">
                {t({ en: 'Book a consultation', hi: 'परामर्श बुक करें' })}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function LiveStrip({ sessions }) {
  const { t, lang } = useLang();
  return (
    <section className={styles.live} aria-labelledby="live-title">
      <h2 id="live-title" className={styles.liveTitle}>
        <Radio size={18} /> {t({ en: 'Live & upcoming sessions', hi: 'लाइव एवं आगामी सत्र' })}
      </h2>
      <div className={styles.liveRow}>
        {sessions.map((s) => {
          const isLive = s.status === 'live';
          const a = s.astrologer;
          const content = (
            <>
              <span className={isLive ? styles.liveBadge : styles.soonBadge}>{isLive ? 'LIVE' : t({ en: 'Upcoming', hi: 'आगामी' })}</span>
              {a && <AstroAvatar astro={a} size={52} />}
              <strong>{t(s.topic)}</strong>
              {a && <span className={styles.liveName}>{t(a.name)}</span>}
              {!isLive && <span className={styles.liveTime}>{formatDateTime(s.startsAt, lang)}</span>}
            </>
          );
          return isLive && s.streamUrl ? (
            <a key={s.id} href={s.streamUrl} target="_blank" rel="noopener noreferrer" className={`${styles.liveCard} ${styles.liveNow}`}>
              {content}
            </a>
          ) : (
            <Link key={s.id} href={a ? `/contact?astro=${bookingRef(a)}&mode=video` : '/contact'} className={styles.liveCard}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

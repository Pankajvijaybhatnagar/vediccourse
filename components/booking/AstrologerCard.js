'use client';

import Link from 'next/link';
import { BadgeCheck, MessageCircle, PhoneCall, Star, Video } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { SKILLS } from './format';
import styles from './astro.module.css';

const initials = (name = '') =>
  name
    .replace(/^(Acharya|Pandit|Dr\.)\s+/g, '')
    .replace(/\s+Ji$/, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

/** Photo from the CMS (Cloudinary) when available, else tinted initials. */
export function AstroAvatar({ astro, size = 72 }) {
  const { t } = useLang();
  if (astro?.avatar?.url) {
    return (
      <span className={styles.avatarWrap} style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.photo} src={astro.avatar.url} alt={astro.avatar.alt || t(astro.name)} width={size} height={size} loading="lazy" />
        {astro.isOnline && <span className={styles.onlineDot} />}
      </span>
    );
  }
  return (
    <span className={styles.avatar} style={{ '--hue': astro?.hue ?? 30, width: size, height: size, fontSize: size * 0.34 }} aria-hidden="true">
      {initials(astro?.name?.en)}
      {astro?.isOnline && <span className={styles.onlineDot} />}
    </span>
  );
}

/** Links to booking use the numeric legacy id the rest of the site understands, falling back to the slug. */
export const bookingRef = (astro) => astro.legacyId ?? astro.slug ?? astro.id;

export default function AstrologerCard({ astro }) {
  const { t } = useLang();
  const ref = bookingRef(astro);
  const no = astro.legacyId ? String(astro.legacyId).padStart(2, '0') : null;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.left}>
          <AstroAvatar astro={astro} size={72} />
          {no && <span className={styles.no}>#{no}</span>}
        </div>
        <div className={styles.info}>
          <h3 title={t(astro.name)}>
            {t(astro.name)} <BadgeCheck size={16} className={styles.verified} aria-label={t({ en: 'Verified', hi: 'सत्यापित' })} />
          </h3>
          {astro.title && (
            <p className={styles.title}>
              <Star size={14} /> {t(astro.title)}
            </p>
          )}
          {astro.bio && <p className={styles.bio}>{t(astro.bio)}</p>}
          <p className={styles.meta}>
            {astro.isOnline && <span className={styles.online}>{t({ en: 'Online now', hi: 'अभी ऑनलाइन' })}</span>}
            {astro.experienceYears > 0 && <span>{t({ en: `${astro.experienceYears}+ yrs`, hi: `${astro.experienceYears}+ वर्ष` })}</span>}
            {astro.languages?.length > 0 && <span>{astro.languages.map((l) => ({ hi: 'हिंदी', en: 'English' })[l] || l).join(' · ')}</span>}
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.skills}>{(astro.skills || []).map((s) => (SKILLS[s] ? t(SKILLS[s]) : s)).join(' · ')}</span>
        <div className={styles.btns}>
          <Link href={`/contact?astro=${ref}&mode=chat`} className={styles.btn} aria-label={`${t({ en: 'Chat with', hi: 'चैट करें' })} ${t(astro.name)}`}>
            <MessageCircle size={15} /> {t({ en: 'CHAT', hi: 'चैट' })}
          </Link>
          <Link href={`/contact?astro=${ref}&mode=call`} className={styles.btn} aria-label={`${t({ en: 'Call', hi: 'कॉल करें' })} ${t(astro.name)}`}>
            <PhoneCall size={15} /> {t({ en: 'CALL', hi: 'कॉल' })}
          </Link>
          <Link href={`/contact?astro=${ref}&mode=video`} className={`${styles.btn} ${styles.btnIcon}`} aria-label={`${t({ en: 'Video call', hi: 'वीडियो कॉल' })} ${t(astro.name)}`}>
            <Video size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

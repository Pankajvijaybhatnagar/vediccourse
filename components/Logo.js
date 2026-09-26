import Link from 'next/link';
import { T } from '@/lib/i18n';
import styles from './Logo.module.css';

export default function Logo({ light = false }) {
  return (
    <Link href="/" className={`${styles.logo} ${light ? styles.light : ''}`} aria-label="VedicDhaam home">
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 48 48" width="46" height="46">
          <defs>
            <linearGradient id="vdSun" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffd65a" />
              <stop offset="1" stopColor="#e88a00" />
            </linearGradient>
          </defs>
          {/* Sun rays */}
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d="M24 1.5 L25.6 7 L22.4 7 Z"
              fill="#f6a609"
              transform={`rotate(${i * 22.5} 24 24)`}
              opacity={i % 2 ? 0.55 : 1}
            />
          ))}
          <circle cx="24" cy="24" r="15.5" fill="url(#vdSun)" />
          <circle cx="24" cy="24" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
        </svg>
        <span className={styles.om}>ॐ</span>
      </span>
      <span className={styles.text}>
        <span className={styles.name}>
          Vedic<span>Dhaam</span>
        </span>
        <span className={styles.tag}>
          <T en="Ancient Wisdom · Modern Guidance" hi="वैदिक ज्ञान · आधुनिक मार्गदर्शन" />
        </span>
      </span>
    </Link>
  );
}

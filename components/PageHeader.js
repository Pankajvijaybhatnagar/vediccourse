'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import styles from './PageHeader.module.css';

// Props accept plain strings or bilingual { en, hi } objects.
export default function PageHeader({ eyebrow, title, highlight, lead, crumb }) {
  const { t } = useLang();
  return (
    <header className={`${styles.header} page-top`}>
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.banner} mandala-bg`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">{t({ en: 'Home', hi: 'होम' })}</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{t(crumb || title)}</span>
          </nav>
          <span className="eyebrow fade-up">{t(eyebrow)}</span>
          <h1 className="fade-up" style={{ animationDelay: '80ms' }}>
            {t(title)} {highlight && <span className="gold-text">{t(highlight)}</span>}
          </h1>
          {lead && (
            <p className={`${styles.lead} fade-up`} style={{ animationDelay: '160ms' }}>
              {t(lead)}
            </p>
          )}
          <span className={styles.om} aria-hidden="true">
            ॐ
          </span>
        </div>
      </div>
    </header>
  );
}

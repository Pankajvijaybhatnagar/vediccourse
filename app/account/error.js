'use client';

import { AlertTriangle } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './account.module.css';

export default function AccountError({ retry }) {
  const { t } = useLang();
  return (
    <section className={`${styles.page} page-top`}>
      <div className="container">
        <div className={styles.gate} role="alert">
          <AlertTriangle size={40} aria-hidden="true" />
          <h1>{t({ en: 'Something went wrong', hi: 'कुछ गलत हो गया' })}</h1>
          <p className="muted">{t({ en: 'We could not load your account. Please try again.', hi: 'आपका खाता लोड नहीं हो सका। कृपया पुनः प्रयास करें।' })}</p>
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
          </button>
        </div>
      </div>
    </section>
  );
}

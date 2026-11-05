'use client';

import { useLang } from '@/lib/i18n';
import styles from './ManglikMeter.module.css';

/**
 * Shows the 3-step Manglik check (Lagna 40% → Moon +30% → Venus +30%) and the total.
 * @param {{ data: ReturnType<import('@/lib/manglik').manglikDosha>, compact?: boolean }} props
 */
export default function ManglikMeter({ data, compact = false }) {
  const { t } = useLang();
  const tone = data.level === 'poorna' ? styles.high : data.level === 'anshik' ? (data.percent >= 70 ? styles.mid : styles.low) : styles.none;

  return (
    <div className={`${styles.meter} ${compact ? styles.compact : ''}`}>
      <div className={styles.head}>
        <span className={`${styles.pill} ${tone}`}>{t(data.label)}</span>
      </div>
      <div
        className={styles.bar}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={data.percent}
        aria-label={t({ en: 'Manglik percentage', hi: 'मांगलिक प्रतिशत' })}
      >
        {data.steps.map((s) => (
          <span key={s.from} style={{ width: `${s.points}%` }} className={`${styles.seg} ${styles['seg_' + s.from]}`} />
        ))}
      </div>
      <ol className={styles.steps}>
        {data.steps.map((s, i) => (
          <li key={s.from} className={!s.checked ? styles.skip : s.hit ? styles.hit : styles.miss}>
            <span className={styles.stepNo}>{i + 1}</span>
            <span className={styles.stepText}>
              <strong>{t({ en: `From ${s.name.en}`, hi: `${s.name.hi} से` })}</strong>
              <small>
                {t({ en: `Mars in house ${s.house}`, hi: `मंगल ${s.house}वें भाव में` })}
                {!s.checked && ` · ${t({ en: 'not checked (Lagna negative)', hi: 'जाँच नहीं (लग्न से दोष नहीं)' })}`}
              </small>
            </span>
            <span className={styles.pts}>{s.checked ? (s.hit ? `+${s.points}%` : '0%') : '—'}</span>
          </li>
        ))}
      </ol>
      {!compact && (
        <p className={styles.rule}>
          {t({
            en: 'Rule: Mars in the 1st, 4th, 7th, 8th or 12th house from the Lagna makes a person 40% Manglik. Only then the Moon (+30%) and Venus (+30%) are checked; 100% is Poorna Manglik.',
            hi: 'नियम: लग्न से मंगल 1, 4, 7, 8 या 12वें भाव में हो तो व्यक्ति 40% मांगलिक है। तभी चंद्र (+30%) और शुक्र (+30%) से जाँच होती है; 100% पूर्ण मांगलिक है।',
          })}
        </p>
      )}
    </div>
  );
}

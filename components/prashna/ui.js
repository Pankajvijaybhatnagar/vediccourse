'use client';

import Link from 'next/link';
import { MessageCircleQuestion, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { CATEGORIES, METHODS, VERDICTS, getCategory } from '@/lib/prashna/categories';
import useQuestion from '@/lib/prashna/useQuestion';
import styles from './prashna.module.css';

/** Switch between Prashna methods. */
export function MethodTabs({ active }) {
  const { t } = useLang();
  return (
    <nav className={styles.methodTabs} aria-label={t({ en: 'Prashna methods', hi: 'प्रश्न की विधियाँ' })}>
      <Link href="/prashna" className={!active ? styles.tabOn : ''} aria-current={!active ? 'page' : undefined}>
        <span aria-hidden="true">🕉️</span> {t({ en: 'All methods', hi: 'सभी विधियाँ' })}
      </Link>
      {METHODS.map((m) => (
        <Link key={m.slug} href={`/prashna/${m.slug}`} className={active === m.slug ? styles.tabOn : ''} aria-current={active === m.slug ? 'page' : undefined}>
          <span aria-hidden="true">{m.icon}</span> {t(m.title)}
        </Link>
      ))}
    </nav>
  );
}

/** Question text + category, remembered across the method pages. */
export function QuestionBox({ compact = false, showCategory = true }) {
  const { t } = useLang();
  const q = useQuestion();
  return (
    <section className={`${styles.qbox} ${compact ? styles.qboxCompact : ''}`} aria-labelledby="prashna-q">
      <label id="prashna-q" htmlFor="prashna-q-input" className={styles.qLabel}>
        <MessageCircleQuestion size={20} /> {t({ en: 'Your question', hi: 'आपका प्रश्न' })}
      </label>
      <textarea
        id="prashna-q-input"
        className={`input ${styles.qInput}`}
        rows={compact ? 2 : 3}
        maxLength={300}
        value={q.text}
        onChange={(e) => q.setText(e.target.value)}
        placeholder={t({
          en: 'e.g. Will I get the new job I applied for?',
          hi: 'जैसे: क्या मुझे वह नई नौकरी मिलेगी जिसके लिए आवेदन किया है?',
        })}
      />
      {showCategory && (
        <>
          <p className={styles.qHint}>{t({ en: 'What is it about?', hi: 'प्रश्न किस विषय का है?' })}</p>
          <div className={styles.catGrid} role="radiogroup" aria-label={t({ en: 'Question topic', hi: 'प्रश्न का विषय' })}>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="radio"
                aria-checked={q.category === c.key}
                className={q.category === c.key ? styles.catOn : ''}
                onClick={() => q.setCategory(c.key)}
              >
                <span aria-hidden="true">{c.icon}</span> {t(c.label)}
              </button>
            ))}
          </div>
        </>
      )}
      <p className={styles.qNote}>
        {t({
          en: 'Ask one sincere question at a time, with a calm mind. Do not repeat the same question on the same day.',
          hi: 'शांत मन से एक बार में एक ही सच्चा प्रश्न पूछें। एक ही दिन में वही प्रश्न दोबारा न पूछें।',
        })}
      </p>
    </section>
  );
}

/** The final answer card used by every method. */
export function VerdictCard({ verdict, title, children, reasons, onReset }) {
  const { t } = useLang();
  const q = useQuestion();
  const v = VERDICTS[verdict] || VERDICTS.mixed;
  const cat = getCategory(q.category);
  return (
    <section className={`${styles.verdict} ${styles[`v_${v.tone}`]}`} aria-live="polite">
      <div className={styles.verdictHead}>
        <span className={styles.verdictIcon} aria-hidden="true">{v.icon}</span>
        <div>
          {title && <span className={styles.verdictKicker}>{t(title)}</span>}
          <strong className={styles.verdictLabel}>{t(v.label)}</strong>
        </div>
      </div>
      {(q.text || cat) && (
        <p className={styles.verdictQ}>
          <span>{cat.icon} {t(cat.label)}</span>
          {q.text && <q>{q.text}</q>}
        </p>
      )}
      {children}
      {reasons?.length > 0 && (
        <ul className={styles.reasons}>
          {reasons.map((r, i) => (
            <li key={i} className={r.good === true ? styles.good : r.good === false ? styles.bad : styles.neutral}>
              {t(r.text)}
            </li>
          ))}
        </ul>
      )}
      {onReset && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>
          <RotateCcw size={15} /> {t({ en: 'Ask again', hi: 'फिर से पूछें' })}
        </button>
      )}
    </section>
  );
}

export function Disclaimer() {
  const { t } = useLang();
  return (
    <p className={styles.disclaimer}>
      {t({
        en: 'Prashna is traditional spiritual guidance, not a certainty. For health, legal or money decisions, please also consult a qualified professional.',
        hi: 'प्रश्न शास्त्र पारम्परिक आध्यात्मिक मार्गदर्शन है, निश्चितता नहीं। स्वास्थ्य, क़ानूनी या आर्थिक निर्णयों के लिए योग्य विशेषज्ञ से भी परामर्श अवश्य लें।',
      })}
    </p>
  );
}

/** Small section heading inside method pages. */
export function StepHead({ n, children }) {
  return (
    <h2 className={styles.stepHead}>
      {n != null && <span>{n}</span>}
      {children}
    </h2>
  );
}

export { styles as prashnaStyles };

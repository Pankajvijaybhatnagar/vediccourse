'use client';

import { useState } from 'react';
import { lifePath, expression, soulUrge, personality, mulank, MEANINGS } from '@/lib/numerology';
import { useLang } from '@/lib/i18n';
import styles from './numerology.module.css';

const CORE = [
  { key: 'mulank', label: { en: 'Mulank', hi: 'मूलांक' }, sub: { en: 'Psychic number · your nature', hi: 'आपका स्वभाव' } },
  { key: 'lifePath', label: { en: 'Bhagyank (Life Path)', hi: 'भाग्यांक' }, sub: { en: 'Your destiny & life purpose', hi: 'भाग्य और जीवन उद्देश्य' } },
  { key: 'expression', label: { en: 'Name Number', hi: 'नामांक' }, sub: { en: 'Your natural talents', hi: 'आपकी प्रतिभाएँ' } },
  { key: 'soulUrge', label: { en: 'Soul Urge', hi: 'आत्मांक' }, sub: { en: "Your heart's desire", hi: 'हृदय की इच्छा' } },
  { key: 'personality', label: { en: 'Personality', hi: 'व्यक्तित्व अंक' }, sub: { en: 'How others see you', hi: 'दूसरे आपको कैसे देखते हैं' } },
];

export default function NumerologyClient() {
  const { t, lang } = useLang();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [active, setActive] = useState('mulank');

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/[a-z]/i.test(name)) next.name = { en: 'Please enter your full name in English letters.', hi: 'कृपया अपना पूरा नाम अंग्रेज़ी अक्षरों में लिखें।' };
    if (!date) next.date = { en: 'Please enter your birth date.', hi: 'कृपया जन्म तिथि दर्ज करें।' };
    setErrors(next);
    if (Object.keys(next).length) return;

    setResult({
      mulank: mulank(date),
      lifePath: lifePath(date),
      expression: expression(name),
      soulUrge: soulUrge(name) ?? expression(name),
      personality: personality(name) ?? expression(name),
    });
    setActive('mulank');
  };

  const current = result && MEANINGS[result[active]];

  return (
    <section className={styles.section}>
      <div className="container">
        <form className={`card card-glow ${styles.form}`} onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="num-name">{t({ en: 'Full name (in English letters)', hi: 'पूरा नाम (अंग्रेज़ी अक्षरों में)' })}</label>
            <input
              id="num-name"
              className={`input ${errors.name ? 'invalid' : ''}`}
              placeholder={t({ en: 'e.g. Priya Sharma', hi: 'जैसे: Priya Sharma' })}
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })); }}
            />
            {errors.name && <span className="error-text">{t(errors.name)}</span>}
          </div>
          <div className="field">
            <label htmlFor="num-date">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
            <input
              id="num-date"
              type="date"
              className={`input ${errors.date ? 'invalid' : ''}`}
              value={date}
              onChange={(e) => { setDate(e.target.value); setErrors((er) => ({ ...er, date: undefined })); }}
            />
            {errors.date && <span className="error-text">{t(errors.date)}</span>}
          </div>
          <button type="submit" className={`btn btn-primary btn-lg ${styles.submit}`}>
            ✦ {t({ en: 'Reveal My Numbers', hi: 'मेरे अंक देखें' })}
          </button>
        </form>

        {result && (
          <div className={styles.result}>
            <div className={styles.numbers} role="tablist" aria-label={t({ en: 'Core numbers', hi: 'मुख्य अंक' })}>
              {CORE.map((c, i) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={active === c.key}
                  className={`${styles.num} ${active === c.key ? styles.numActive : ''} fade-up`}
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => setActive(c.key)}
                >
                  <span className={styles.numValue}>{result[c.key]}</span>
                  <strong>{t(c.label)}</strong>
                  <small>{t(c.sub)}</small>
                </button>
              ))}
            </div>

            <article className={`card ${styles.detail} mandala-bg`} key={active + lang} role="tabpanel">
              <div className={`${styles.detailNum} gold-text`}>{result[active]}</div>
              <div>
                <span className="eyebrow" style={{ marginBottom: 6 }}>
                  {t(CORE.find((c) => c.key === active).label)}
                </span>
                <h2>{t(current.title)}</h2>
                <p className="muted">{t(current.text)}</p>
                <div className={styles.keywords}>
                  {current.keywords[lang].map((k) => (
                    <span key={k} className="pill">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

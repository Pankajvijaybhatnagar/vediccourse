'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ASTROLOGERS, SKILLS, PANEL_INTRO } from '@/lib/astrologers';
import { useLang } from '@/lib/i18n';
import { AstrologerCard } from '@/components/home/HomeClient';
import Icon from '@/components/Icon';
import styles from './astrologers.module.css';

export default function AstrologersClient() {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [skill, setSkill] = useState('all');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ASTROLOGERS.filter(
      (a) =>
        (skill === 'all' || a.skills.includes(skill)) &&
        (!q || a.name.en.toLowerCase().includes(q) || a.name.hi.includes(q))
    );
  }, [query, skill]);

  const reset = () => {
    setQuery('');
    setSkill('all');
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={`card ${styles.intro}`}>{t(PANEL_INTRO)}</p>

        <div className={styles.topics} role="tablist" aria-label={t({ en: 'Expertise', hi: 'विशेषज्ञता' })}>
          <button role="tab" aria-selected={skill === 'all'} className={styles.topic} onClick={() => setSkill('all')}>
            <Icon name="Sparkles" size={18} /> {t({ en: 'All', hi: 'सभी' })}
          </button>
          {Object.entries(SKILLS).map(([k, v]) => (
            <button key={k} role="tab" aria-selected={skill === k} className={styles.topic} onClick={() => setSkill(k)}>
              {t(v)}
            </button>
          ))}
        </div>

        <div className={`card ${styles.filters}`}>
          <div className={styles.search}>
            <Search size={18} />
            <label htmlFor="astro-search" className="sr-only">
              {t({ en: 'Search expert', hi: 'विशेषज्ञ खोजें' })}
            </label>
            <input id="astro-search" className="input" placeholder={t({ en: 'Search by name…', hi: 'नाम से खोजें…' })} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        <p className={styles.count}>
          {t({ en: `${list.length} experts found`, hi: `${list.length} विशेषज्ञ मिले` })}
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
            <p>{t({ en: 'No experts match these filters.', hi: 'इन फ़िल्टर से कोई विशेषज्ञ नहीं मिला।' })}</p>
            <button className="btn btn-primary" onClick={reset}>
              {t({ en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' })}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

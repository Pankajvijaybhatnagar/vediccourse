'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { ASTROLOGERS, SKILLS, LANGS } from '@/lib/astrologers';
import { CONSULT_TOPICS } from '@/lib/content';
import { useLang } from '@/lib/i18n';
import { AstrologerCard } from '@/components/home/HomeClient';
import Icon from '@/components/Icon';
import styles from './astrologers.module.css';

const SORTS = [
  { id: 'rating', label: { en: 'Top rated', hi: 'सर्वोच्च रेटिंग' } },
  { id: 'exp', label: { en: 'Most experienced', hi: 'सबसे अनुभवी' } },
  { id: 'price', label: { en: 'Price: low to high', hi: 'शुल्क: कम से अधिक' } },
  { id: 'orders', label: { en: 'Most consultations', hi: 'सर्वाधिक परामर्श' } },
];

export default function AstrologersClient() {
  const { t } = useLang();
  const params = useSearchParams();
  const initialFocus = CONSULT_TOPICS.some((c) => c.key === params.get('focus')) ? params.get('focus') : 'all';
  const [focus, setFocus] = useState(initialFocus);
  const [query, setQuery] = useState('');
  const [skill, setSkill] = useState('all');
  const [lang, setLangFilter] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sort, setSort] = useState('rating');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ASTROLOGERS.filter(
      (a) =>
        (focus === 'all' || a.focus.includes(focus)) &&
        (skill === 'all' || a.skills.includes(skill)) &&
        (lang === 'all' || a.langs.includes(lang)) &&
        (!onlineOnly || a.online) &&
        (!q || a.name.en.toLowerCase().includes(q) || a.name.hi.includes(q))
    );
    const key = { rating: (a) => -a.rating, exp: (a) => -a.exp, price: (a) => a.price, orders: (a) => -a.orders }[sort];
    return filtered.sort((a, b) => key(a) - key(b));
  }, [focus, query, skill, lang, onlineOnly, sort]);

  const reset = () => {
    setFocus('all');
    setQuery('');
    setSkill('all');
    setLangFilter('all');
    setOnlineOnly(false);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.topics} role="tablist" aria-label={t({ en: 'Consultation topic', hi: 'परामर्श विषय' })}>
          <button role="tab" aria-selected={focus === 'all'} className={styles.topic} onClick={() => setFocus('all')}>
            <Icon name="Sparkles" size={18} /> {t({ en: 'All', hi: 'सभी' })}
          </button>
          {CONSULT_TOPICS.map((c) => (
            <button key={c.key} role="tab" aria-selected={focus === c.key} className={styles.topic} onClick={() => setFocus(c.key)}>
              <Icon name={c.icon} size={18} /> {t(c.label)}
            </button>
          ))}
        </div>

        <div className={`card ${styles.filters}`}>
          <div className={styles.search}>
            <Search size={18} />
            <label htmlFor="astro-search" className="sr-only">
              {t({ en: 'Search astrologer', hi: 'ज्योतिषी खोजें' })}
            </label>
            <input id="astro-search" className="input" placeholder={t({ en: 'Search by name…', hi: 'नाम से खोजें…' })} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <label className="sr-only" htmlFor="astro-skill">
            {t({ en: 'Expertise', hi: 'विशेषज्ञता' })}
          </label>
          <select id="astro-skill" className="input" value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="all">{t({ en: 'All expertise', hi: 'सभी विशेषज्ञता' })}</option>
            {Object.entries(SKILLS).map(([k, v]) => (
              <option key={k} value={k}>
                {t(v)}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="astro-lang">
            {t({ en: 'Language', hi: 'भाषा' })}
          </label>
          <select id="astro-lang" className="input" value={lang} onChange={(e) => setLangFilter(e.target.value)}>
            <option value="all">{t({ en: 'All languages', hi: 'सभी भाषाएँ' })}</option>
            {Object.entries(LANGS).map(([k, v]) => (
              <option key={k} value={k}>
                {t(v)}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="astro-sort">
            {t({ en: 'Sort by', hi: 'क्रम' })}
          </label>
          <select id="astro-sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {t(s.label)}
              </option>
            ))}
          </select>
          <label className={styles.toggle}>
            <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} />
            <span className={styles.switch} aria-hidden="true" />
            {t({ en: 'Online now', hi: 'अभी ऑनलाइन' })}
          </label>
        </div>

        <p className={styles.count}>
          {t({ en: `${list.length} astrologers found`, hi: `${list.length} ज्योतिषी मिले` })}
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
            <p>{t({ en: 'No astrologers match these filters.', hi: 'इन फ़िल्टर से कोई ज्योतिषी नहीं मिला।' })}</p>
            <button className="btn btn-primary" onClick={reset}>
              {t({ en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' })}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

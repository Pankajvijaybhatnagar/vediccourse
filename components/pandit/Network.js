'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, UserCheck, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { LANGUAGES, SPECIALITIES } from '@/lib/pandit/catalog';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import PanditCard from './PanditCard';
import { Avatar, Empty, PageHead, useDate, styles as s } from './ui';

export default function Network() {
  const { t, lang } = useLang();
  const fmt = useDate();
  const { pandits, connections, me, respondConnection, panditById } = usePandit();
  const [q, setQ] = useState('');
  const [skill, setSkill] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  const [tab, setTab] = useState('discover');

  const cities = useMemo(() => [...new Set(pandits.map((p) => p.city))].sort(), [pandits]);
  const incoming = connections.filter((c) => c.to === ME && c.status === 'pending');
  const myConnections = connections.filter((c) => c.status === 'accepted' && (c.from === ME || c.to === ME)).map((c) => ({ c, p: panditById(c.from === ME ? c.to : c.from) })).filter((x) => x.p);

  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return pandits.filter(
      (p) =>
        (!skill || p.specialities.includes(skill)) &&
        (!city || p.city === city) &&
        (!language || p.languages.includes(language)) &&
        (!n || [p.name, p.nameHi, p.headline, p.city, p.bio].join(' ').toLowerCase().includes(n))
    );
  }, [pandits, q, skill, city, language]);

  const filtered = q || skill || city || language;

  return (
    <div className={`container ${s.shell}`}>
      <PageHead
        title={{ en: 'Pandit Network', hi: 'पंडित नेटवर्क' }}
        sub={{ en: 'Find pandits by speciality, city and language. Connect, message and share work.', hi: 'विशेषज्ञता, शहर और भाषा से पंडित खोजें। जुड़ें, संदेश भेजें और काम साझा करें।' }}
      />

      {me && (
        <div className="tabs" role="tablist" style={{ marginBottom: 20 }}>
          <button role="tab" className="tab" aria-selected={tab === 'discover'} onClick={() => setTab('discover')}>
            {t({ en: 'Discover', hi: 'खोजें' })}
          </button>
          <button role="tab" className="tab" aria-selected={tab === 'mine'} onClick={() => setTab('mine')}>
            {t({ en: 'My connections', hi: 'मेरे कनेक्शन' })} ({myConnections.length})
          </button>
          <button role="tab" className="tab" aria-selected={tab === 'requests'} onClick={() => setTab('requests')}>
            {t({ en: 'Requests', hi: 'अनुरोध' })} {incoming.length > 0 && `(${incoming.length})`}
          </button>
        </div>
      )}

      {tab === 'requests' && (
        <div className={s.panel}>
          {incoming.length ? (
            <ul className={s.list}>
              {incoming.map((c) => {
                const p = panditById(c.from);
                if (!p) return null;
                return (
                  <li key={c.id} className={s.item}>
                    <Avatar name={p.name} hue={p.hue} size={44} />
                    <div className={s.itemBody}>
                      <Link href={`/pandit-sangh/pandit/${p.id}`}>
                        <strong>{panditName(p, lang)}</strong>
                      </Link>
                      <small>
                        {p.headline} · {fmt(c.at)}
                      </small>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => respondConnection(c.id, true)}>
                      <UserCheck size={15} /> {t({ en: 'Accept', hi: 'स्वीकारें' })}
                    </button>
                    <button className={s.iconBtn} onClick={() => respondConnection(c.id, false)} aria-label={t({ en: 'Ignore', hi: 'अनदेखा करें' })}>
                      <X size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty icon="🤝" text={t({ en: 'No pending requests.', hi: 'कोई लंबित अनुरोध नहीं।' })} />
          )}
        </div>
      )}

      {tab === 'mine' &&
        (myConnections.length ? (
          <div className={s.cardsGrid}>
            {myConnections.map(({ p }) => (
              <PanditCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <Empty icon="🤝" text={t({ en: 'You have not connected with anyone yet.', hi: 'आप अभी किसी से नहीं जुड़े हैं।' })}>
            <button className="btn btn-primary" onClick={() => setTab('discover')}>
              {t({ en: 'Discover pandits', hi: 'पंडित खोजें' })}
            </button>
          </Empty>
        ))}

      {tab === 'discover' && (
        <>
          <div className={s.toolbar}>
            <div className={s.search}>
              <Search size={18} />
              <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ en: 'Search name, city, ritual…', hi: 'नाम, शहर, अनुष्ठान खोजें…' })} aria-label={t({ en: 'Search pandits', hi: 'पंडित खोजें' })} />
            </div>
            <select className="input" value={skill} onChange={(e) => setSkill(e.target.value)} aria-label={t({ en: 'Speciality', hi: 'विशेषज्ञता' })}>
              <option value="">{t({ en: 'All specialities', hi: 'सभी विशेषज्ञता' })}</option>
              {Object.entries(SPECIALITIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {t(v)}
                </option>
              ))}
            </select>
            <select className="input" value={city} onChange={(e) => setCity(e.target.value)} aria-label={t({ en: 'City', hi: 'शहर' })}>
              <option value="">{t({ en: 'All cities', hi: 'सभी शहर' })}</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select className="input" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label={t({ en: 'Language', hi: 'भाषा' })}>
              <option value="">{t({ en: 'Any language', hi: 'कोई भी भाषा' })}</option>
              {Object.entries(LANGUAGES).map(([k, v]) => (
                <option key={k} value={k}>
                  {t(v)}
                </option>
              ))}
            </select>
          </div>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            {t({ en: `${list.length} pandits`, hi: `${list.length} पंडित` })}
            {filtered && (
              <>
                {' · '}
                <button
                  className={s.linkBtn}
                  onClick={() => {
                    setQ('');
                    setSkill('');
                    setCity('');
                    setLanguage('');
                  }}
                >
                  {t({ en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' })}
                </button>
              </>
            )}
          </p>
          {list.length ? (
            <div className={s.cardsGrid}>
              {list.map((p) => (
                <PanditCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <Empty icon="🔍" text={t({ en: 'No pandit matches these filters.', hi: 'इन फ़िल्टर से कोई पंडित नहीं मिला।' })} />
          )}
        </>
      )}
    </div>
  );
}

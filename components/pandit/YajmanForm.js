'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Flame, GitBranch, Plus, Trash2, UserRound } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { GOTRAS, RASHIS, RELATIONS, TITHIS, TRADITIONS, VEDAS } from '@/lib/pandit/catalog';
import { usePandit } from '@/lib/pandit/store';
import { Empty, PageHead, RequireProfile, Shell, styles as s } from './ui';

const rid = () => Math.random().toString(36).slice(2, 9);

const BLANK = {
  name: '',
  phone: '',
  city: '',
  address: '',
  gotra: '',
  gotraOther: '',
  pravar: '',
  ved: '',
  shakha: '',
  kuldevi: '',
  kulPurohit: '',
  nativePlace: '',
  dob: '',
  birthTime: '',
  birthPlace: '',
  rashi: '',
  family: [],
  ancestors: [],
  traditions: [],
  notes: '',
};

const ANCESTOR_RELATIONS = ['father', 'mother', 'grandfather', 'grandmother', 'greatGrandfather', 'greatGrandmother', 'husband', 'wife', 'brother', 'son', 'other'];
const FAMILY_RELATIONS = ['wife', 'husband', 'son', 'daughter', 'father', 'mother', 'brother', 'other'];

export default function YajmanForm() {
  return (
    <Shell narrow>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

function Inner() {
  const { id } = useParams();
  const { t } = useLang();
  const router = useRouter();
  const { myYajmans, saveYajman } = usePandit();
  const existing = id ? myYajmans.find((y) => y.id === id) : null;
  const [f, setF] = useState(() => ({ ...BLANK, ...(existing || {}) }));
  const [error, setError] = useState('');

  if (id && !existing) return <Empty icon="🔍" text={t({ en: 'Yajman not found.', hi: 'यजमान नहीं मिला।' })} />;

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const setRow = (list, i, k, v) => setF((x) => ({ ...x, [list]: x[list].map((r, j) => (j === i ? { ...r, [k]: v } : r)) }));
  const addRow = (list, row) => setF((x) => ({ ...x, [list]: [...x[list], { id: rid(), ...row }] }));
  const delRow = (list, i) => setF((x) => ({ ...x, [list]: x[list].filter((_, j) => j !== i) }));
  const toggleTradition = (key) =>
    setF((x) => ({ ...x, traditions: x.traditions.some((tr) => tr.key === key) ? x.traditions.filter((tr) => tr.key !== key) : [...x.traditions, { key, lastDone: '', note: '' }] }));

  const gotra = GOTRAS[f.gotra];

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) {
      setError(t({ en: 'Please enter the yajman’s name', hi: 'कृपया यजमान का नाम लिखें' }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const newId = saveYajman({
      ...f,
      name: f.name.trim(),
      ancestors: f.ancestors.filter((a) => a.name.trim()),
      family: f.family.filter((m) => m.name.trim()),
    });
    router.push(`/pandit-sangh/yajman/${newId}`);
  };

  return (
    <>
      <PageHead
        back={{ href: existing ? `/pandit-sangh/yajman/${id}` : '/pandit-sangh/yajman', label: { en: 'Back', hi: 'वापस' } }}
        title={existing ? { en: `Edit: ${existing.name}`, hi: `संपादित करें: ${existing.name}` } : { en: 'Add a yajman', hi: 'नया यजमान जोड़ें' }}
        sub={{ en: 'Only the name is required. Fill the rest whenever the family shares it.', hi: 'केवल नाम आवश्यक है। बाकी जानकारी परिवार से मिलने पर कभी भी भरें।' }}
      />
      <form className={s.form} onSubmit={submit} noValidate>
        <section className={s.formSection}>
          <h3>
            <UserRound size={18} /> {t({ en: 'Yajman (head of family)', hi: 'यजमान (परिवार के मुखिया)' })}
          </h3>
          <p className={s.hint}>{t({ en: 'Contact details stay private to you.', hi: 'संपर्क विवरण केवल आप देख सकते हैं।' })}</p>
          <div className={s.fields}>
            <div className="field">
              <label htmlFor="y-name">{t({ en: 'Name *', hi: 'नाम *' })}</label>
              <input id="y-name" className={`input ${error ? 'invalid' : ''}`} value={f.name} onChange={set('name')} autoFocus={!existing} />
              {error && <span className="error-text">{error}</span>}
            </div>
            <div className="field">
              <label htmlFor="y-phone">{t({ en: 'Mobile / WhatsApp', hi: 'मोबाइल / व्हाट्सऐप' })}</label>
              <input id="y-phone" className="input" inputMode="tel" value={f.phone} onChange={set('phone')} placeholder="98XXXXXXXX" />
            </div>
            <div className="field">
              <label htmlFor="y-city">{t({ en: 'City', hi: 'शहर' })}</label>
              <input id="y-city" className="input" value={f.city} onChange={set('city')} />
            </div>
            <div className="field">
              <label htmlFor="y-addr">{t({ en: 'Address / locality', hi: 'पता / मोहल्ला' })}</label>
              <input id="y-addr" className="input" value={f.address} onChange={set('address')} />
            </div>
          </div>
        </section>

        <section className={s.formSection}>
          <h3>
            <GitBranch size={18} /> {t({ en: 'Gotra & kul', hi: 'गोत्र एवं कुल' })}
          </h3>
          <p className={s.hint}>{t({ en: 'Used for sankalp and to group families of the same gotra.', hi: 'संकल्प के लिए और एक ही गोत्र के परिवारों को समूहित करने के लिए।' })}</p>
          <div className={s.fields}>
            <div className="field">
              <label htmlFor="y-gotra">{t({ en: 'Gotra', hi: 'गोत्र' })}</label>
              <select id="y-gotra" className="input" value={f.gotra} onChange={set('gotra')}>
                <option value="">{t({ en: '— Select —', hi: '— चुनें —' })}</option>
                {Object.entries(GOTRAS).map(([k, g]) => (
                  <option key={k} value={k}>
                    {t(g.label)}
                  </option>
                ))}
              </select>
            </div>
            {f.gotra === 'other' ? (
              <div className="field">
                <label htmlFor="y-gotra2">{t({ en: 'Gotra name', hi: 'गोत्र का नाम' })}</label>
                <input id="y-gotra2" className="input" value={f.gotraOther} onChange={set('gotraOther')} />
              </div>
            ) : (
              <div className="field">
                <label htmlFor="y-pravar">{t({ en: 'Pravar', hi: 'प्रवर' })}</label>
                <input id="y-pravar" className="input" value={f.pravar} onChange={set('pravar')} placeholder={gotra?.pravar?.join(', ') || ''} />
                {gotra?.pravar?.length > 0 && !f.pravar && (
                  <small className="muted">{t({ en: 'Commonly cited pravar shown; confirm with the family.', hi: 'सामान्य प्रवर दिखाया है; परिवार से पुष्टि करें।' })}</small>
                )}
              </div>
            )}
            <div className="field">
              <label htmlFor="y-ved">{t({ en: 'Ved', hi: 'वेद' })}</label>
              <select id="y-ved" className="input" value={f.ved} onChange={set('ved')}>
                <option value="">{t({ en: '— Select —', hi: '— चुनें —' })}</option>
                {Object.entries(VEDAS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {t(v)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="y-shakha">{t({ en: 'Shakha / Sutra', hi: 'शाखा / सूत्र' })}</label>
              <input id="y-shakha" className="input" value={f.shakha} onChange={set('shakha')} />
            </div>
            <div className="field">
              <label htmlFor="y-kul">{t({ en: 'Kuldevi / Kuldevta', hi: 'कुलदेवी / कुलदेवता' })}</label>
              <input id="y-kul" className="input" value={f.kuldevi} onChange={set('kuldevi')} placeholder={t({ en: 'e.g. Maa Vindhyavasini', hi: 'जैसे: माँ विंध्यवासिनी' })} />
            </div>
            <div className="field">
              <label htmlFor="y-native">{t({ en: 'Native place (mool sthan)', hi: 'मूल स्थान' })}</label>
              <input id="y-native" className="input" value={f.nativePlace} onChange={set('nativePlace')} />
            </div>
            <div className={`field ${s.full}`}>
              <label htmlFor="y-purohit">{t({ en: 'Tirth purohit / kul purohit (if any)', hi: 'तीर्थ पुरोहित / कुल पुरोहित (यदि हों)' })}</label>
              <input id="y-purohit" className="input" value={f.kulPurohit} onChange={set('kulPurohit')} />
            </div>
          </div>
        </section>

        <section className={s.formSection}>
          <h3>✦ {t({ en: 'Birth details', hi: 'जन्म विवरण' })}</h3>
          <p className={s.hint}>{t({ en: 'Optional. Rashi adds a rashi-lord remedy.', hi: 'वैकल्पिक। राशि भरने पर राशि-स्वामी का उपाय जुड़ता है।' })}</p>
          <div className={s.fields}>
            <div className="field">
              <label htmlFor="y-dob">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
              <input id="y-dob" className="input" type="date" value={f.dob} onChange={set('dob')} />
            </div>
            <div className="field">
              <label htmlFor="y-tob">{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
              <input id="y-tob" className="input" type="time" value={f.birthTime} onChange={set('birthTime')} />
            </div>
            <div className="field">
              <label htmlFor="y-pob">{t({ en: 'Place of birth', hi: 'जन्म स्थान' })}</label>
              <input id="y-pob" className="input" value={f.birthPlace} onChange={set('birthPlace')} />
            </div>
            <div className="field">
              <label htmlFor="y-rashi">{t({ en: 'Rashi (moon sign)', hi: 'राशि (चंद्र राशि)' })}</label>
              <select id="y-rashi" className="input" value={f.rashi} onChange={set('rashi')}>
                <option value="">{t({ en: '— Not known —', hi: '— ज्ञात नहीं —' })}</option>
                {RASHIS.map((r, i) => (
                  <option key={r.en} value={String(i)}>
                    {t(r)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className={s.formSection}>
          <h3>👪 {t({ en: 'Family members', hi: 'परिवार के सदस्य' })}</h3>
          <p className={s.hint}>{t({ en: 'Living members of the household.', hi: 'घर के जीवित सदस्य।' })}</p>
          {f.family.map((m, i) => (
            <div key={m.id} className={s.rowEditor}>
              <input className={`input ${s.smallInput}`} value={m.name} onChange={(e) => setRow('family', i, 'name', e.target.value)} placeholder={t({ en: 'Name', hi: 'नाम' })} aria-label={t({ en: 'Name', hi: 'नाम' })} />
              <select className={`input ${s.smallInput}`} value={m.relation} onChange={(e) => setRow('family', i, 'relation', e.target.value)} aria-label={t({ en: 'Relation', hi: 'संबंध' })}>
                {FAMILY_RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {t(RELATIONS[r])}
                  </option>
                ))}
              </select>
              <input className={`input ${s.smallInput}`} type="date" value={m.dob || ''} onChange={(e) => setRow('family', i, 'dob', e.target.value)} aria-label={t({ en: 'Date of birth', hi: 'जन्म तिथि' })} />
              <button type="button" className={s.iconBtn} onClick={() => delRow('family', i)} aria-label={t({ en: 'Remove', hi: 'हटाएँ' })}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => addRow('family', { name: '', relation: 'wife', dob: '' })}>
            <Plus size={15} /> {t({ en: 'Add member', hi: 'सदस्य जोड़ें' })}
          </button>
        </section>

        <section className={s.formSection}>
          <h3>🪔 {t({ en: 'Ancestors (pitru) and their tithi', hi: 'पूर्वज (पितृ) एवं उनकी तिथि' })}</h3>
          <p className={s.hint}>
            {t({
              en: 'The tithi of passing decides the Pitru Paksha shraddh date. Reminders are generated from this.',
              hi: 'देहांत की तिथि से पितृ पक्ष में श्राद्ध की तारीख तय होती है। इसी से स्मरण-सूचना बनती है।',
            })}
          </p>
          {f.ancestors.map((a, i) => (
            <div key={a.id} className={s.rowEditor}>
              <input className={`input ${s.smallInput}`} value={a.name} onChange={(e) => setRow('ancestors', i, 'name', e.target.value)} placeholder={t({ en: 'Name (Late)', hi: 'नाम (स्वर्गीय)' })} aria-label={t({ en: 'Name', hi: 'नाम' })} />
              <select className={`input ${s.smallInput}`} value={a.relation} onChange={(e) => setRow('ancestors', i, 'relation', e.target.value)} aria-label={t({ en: 'Relation', hi: 'संबंध' })}>
                {ANCESTOR_RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {t(RELATIONS[r])}
                  </option>
                ))}
              </select>
              <select className={`input ${s.smallInput}`} value={a.tithi ?? ''} onChange={(e) => setRow('ancestors', i, 'tithi', e.target.value)} aria-label={t({ en: 'Tithi', hi: 'तिथि' })}>
                <option value="">{t({ en: 'Tithi not known', hi: 'तिथि ज्ञात नहीं' })}</option>
                <option value="0">{t({ en: 'Purnima', hi: 'पूर्णिमा' })}</option>
                {TITHIS.map((ti, k) => (
                  <option key={ti.en} value={String(k + 1)}>
                    {k === 14 ? t({ en: 'Amavasya', hi: 'अमावस्या' }) : t(ti)}
                  </option>
                ))}
              </select>
              <button type="button" className={s.iconBtn} onClick={() => delRow('ancestors', i)} aria-label={t({ en: 'Remove', hi: 'हटाएँ' })}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => addRow('ancestors', { name: '', relation: f.ancestors.length ? 'grandfather' : 'father', tithi: '' })}>
            <Plus size={15} /> {t({ en: 'Add ancestor', hi: 'पूर्वज जोड़ें' })}
          </button>
        </section>

        <section className={s.formSection}>
          <h3>
            <Flame size={18} /> {t({ en: 'Kul parampara — what the ancestors did', hi: 'कुल परंपरा — पूर्वज क्या करते आए हैं' })}
          </h3>
          <p className={s.hint}>
            {t({
              en: 'Tick every tradition the family follows. Add when it was last done so overdue ones are flagged.',
              hi: 'परिवार जिन परंपराओं का पालन करता है उन पर टिक करें। अंतिम बार कब हुआ, यह भरें ताकि छूटी परंपराएँ दिखें।',
            })}
          </p>
          <ul className={s.list}>
            {Object.entries(TRADITIONS).map(([key, def]) => {
              const tr = f.traditions.find((x) => x.key === key);
              const idx = f.traditions.findIndex((x) => x.key === key);
              return (
                <li key={key} className={s.item} style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <label className={s.check} style={{ flex: '1 1 260px' }}>
                    <input type="checkbox" checked={Boolean(tr)} onChange={() => toggleTradition(key)} />
                    <span>{t(def.label)}</span>
                  </label>
                  {tr && (
                    <div style={{ display: 'flex', gap: 8, flex: '1 1 320px', flexWrap: 'wrap' }}>
                      <input className={`input ${s.smallInput}`} style={{ flex: '0 0 160px' }} type="date" value={tr.lastDone ? tr.lastDone.slice(0, 10) : ''} onChange={(e) => setRow('traditions', idx, 'lastDone', e.target.value)} aria-label={t({ en: 'Last done on', hi: 'अंतिम बार' })} title={t({ en: 'Last done on', hi: 'अंतिम बार' })} />
                      <input className={`input ${s.smallInput}`} style={{ flex: 1, minWidth: 140 }} value={tr.note} onChange={(e) => setRow('traditions', idx, 'note', e.target.value)} placeholder={t({ en: 'Note (where, who did it…)', hi: 'टिप्पणी (कहाँ, किसने किया…)' })} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.formSection}>
          <h3>{t({ en: 'Notes', hi: 'टिप्पणी' })}</h3>
          <textarea className="input" rows={3} value={f.notes} onChange={set('notes')} style={{ marginTop: 8 }} />
        </section>

        <div className={s.formFoot}>
          <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
            {t({ en: 'Cancel', hi: 'रद्द करें' })}
          </button>
          <button type="submit" className="btn btn-primary">
            {t({ en: 'Save yajman', hi: 'यजमान सहेजें' })}
          </button>
        </div>
      </form>
    </>
  );
}

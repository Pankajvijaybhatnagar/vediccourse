'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { todayKey } from '@/lib/useStoredState';
import useJournal from './useJournal';
import JournalSyncBar from './JournalSyncBar';
import styles from './tools.module.css';

export const TRAPS = [
  { id: 'allnothing', name: { en: 'All-or-nothing', hi: 'सब या कुछ नहीं' } },
  { id: 'catastrophe', name: { en: 'Catastrophising', hi: 'सबसे बुरा सोचना' } },
  { id: 'mindread', name: { en: 'Mind reading', hi: 'दूसरों का मन पढ़ना' } },
  { id: 'fortune', name: { en: 'Fortune telling', hi: 'भविष्य का अनुमान' } },
  { id: 'label', name: { en: 'Labelling', hi: 'ठप्पा लगाना' } },
  { id: 'should', name: { en: '"Should" statements', hi: '"चाहिए" वाली सोच' } },
  { id: 'overgen', name: { en: 'Overgeneralising', hi: 'एक से सब पर निष्कर्ष' } },
  { id: 'filter', name: { en: 'Mental filter', hi: 'केवल नकारात्मक देखना' } },
  { id: 'personal', name: { en: 'Personalising', hi: 'सब अपने ऊपर लेना' } },
  { id: 'emotional', name: { en: 'Emotional reasoning', hi: 'भावना को तथ्य मानना' } },
];

const EMPTY = { situation: '', thought: '', emotion: '', before: 70, trap: '', evidenceFor: '', evidenceAgainst: '', balanced: '', after: 40 };
const TRAP_IDS = new Set(TRAPS.map((tr) => tr.id));

const pct = (v, def) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : def;
};

/** Form / local record → API payload (fields trimmed to the server's limits). */
const toData = (r) => ({
  situation: (r.situation || '').trim().slice(0, 2000) || '—',
  thought: (r.thought || '').trim().slice(0, 2000),
  emotion: (r.emotion || '').trim().slice(0, 200),
  before: pct(r.before, 70),
  trap: TRAP_IDS.has(r.trap) ? r.trap : '',
  evidenceFor: (r.evidenceFor || '').trim().slice(0, 2000),
  evidenceAgainst: (r.evidenceAgainst || '').trim().slice(0, 2000),
  balanced: (r.balanced || '').trim().slice(0, 2000),
  after: pct(r.after, 40),
});

const toEntries = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((r) => r?.thought?.trim())
    .map((r) => ({ date: String(r.date || '').slice(0, 10).match(/^\d{4}-\d{2}-\d{2}$/) ? String(r.date).slice(0, 10) : todayKey(), data: toData(r) }));

export default function ThoughtRecord() {
  const { t, lang } = useLang();
  const store = useJournal('thought', 'vedicdhaam-manobal-thoughts', [], toEntries);
  const { synced } = store;
  const entries = synced ? store.entries.map((e) => ({ ...e.data, id: e.id, date: e.date })) : store.local;
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'range' ? Number(e.target.value) : e.target.value }));

  const canSave = Boolean(form.thought.trim());

  const save = async (e) => {
    e.preventDefault();
    if (!canSave) return;
    if (synced) {
      setBusy(true);
      try {
        await store.save(todayKey(), toData(form));
      } catch {
        setBusy(false);
        return;
      }
      setBusy(false);
    } else {
      store.setLocal((list) => [{ ...form, id: Date.now(), date: new Date().toISOString() }, ...list].slice(0, 50));
    }
    setForm(EMPTY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const removeEntry = (id) => (synced ? store.remove(id) : store.setLocal((l) => l.filter((x) => x.id !== id)));
  const entryDate = (d) => new Date(String(d || '').length === 10 ? `${d}T12:00` : d || Date.now());

  const field = (k, label, placeholder, rows = 2) => (
    <div className="field">
      <label htmlFor={`tr-${k}`}>{t(label)}</label>
      <textarea id={`tr-${k}`} className="input" rows={rows} style={{ minHeight: 0 }} placeholder={t(placeholder)} value={form[k]} onChange={set(k)} />
    </div>
  );

  return (
    <div className={styles.tool}>
      <JournalSyncBar journal={store} />
      <form className={styles.formGrid} onSubmit={save}>
        {field('situation', { en: '1. Situation — what happened?', hi: '1. परिस्थिति — क्या हुआ?' }, { en: 'e.g. My friend did not reply to my message all day.', hi: 'जैसे: मित्र ने पूरे दिन मेरे संदेश का उत्तर नहीं दिया।' })}
        {field('thought', { en: '2. Automatic thought — what went through your mind?', hi: '2. स्वचालित विचार — मन में क्या आया?' }, { en: 'e.g. She is angry with me. Nobody likes me.', hi: 'जैसे: वह मुझसे नाराज़ है। मुझे कोई पसंद नहीं करता।' })}
        <div className={styles.row2}>
          <div className="field">
            <label htmlFor="tr-emotion">{t({ en: '3. Emotion', hi: '3. भावना' })}</label>
            <input id="tr-emotion" className="input" placeholder={t({ en: 'sad, anxious, angry…', hi: 'उदास, चिंतित, क्रोधित…' })} value={form.emotion} onChange={set('emotion')} />
          </div>
          <div className="field">
            <label htmlFor="tr-before">
              {t({ en: 'Intensity', hi: 'तीव्रता' })}: <b>{form.before}%</b>
            </label>
            <input id="tr-before" type="range" min="0" max="100" step="5" value={form.before} onChange={set('before')} className={styles.range} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="tr-trap">{t({ en: '4. Thinking trap (if any)', hi: '4. सोच का जाल (यदि कोई हो)' })}</label>
          <select id="tr-trap" className="input" value={form.trap} onChange={set('trap')}>
            <option value="">{t({ en: '— choose —', hi: '— चुनें —' })}</option>
            {TRAPS.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {t(tr.name)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row2}>
          {field('evidenceFor', { en: '5a. Evidence FOR the thought', hi: '5क. विचार के पक्ष में प्रमाण' }, { en: 'Facts only, not feelings', hi: 'केवल तथ्य, भावनाएँ नहीं' })}
          {field('evidenceAgainst', { en: '5b. Evidence AGAINST the thought', hi: '5ख. विचार के विपक्ष में प्रमाण' }, { en: 'e.g. She said she has exams this week.', hi: 'जैसे: उसने बताया था कि इस सप्ताह उसकी परीक्षा है।' })}
        </div>
        {field('balanced', { en: '6. Balanced thought — what would a wise friend say?', hi: '6. संतुलित विचार — एक समझदार मित्र क्या कहता?' }, { en: 'e.g. She is probably busy. I can check in tomorrow.', hi: 'जैसे: शायद वह व्यस्त है। मैं कल पूछ लूँगा/लूँगी।' })}
        <div className="field">
          <label htmlFor="tr-after">
            {t({ en: '7. Intensity now', hi: '7. अब तीव्रता' })}: <b>{form.after}%</b>
          </label>
          <input id="tr-after" type="range" min="0" max="100" step="5" value={form.after} onChange={set('after')} className={styles.range} />
        </div>
        <div className={styles.toolActions}>
          <button className="btn btn-primary" disabled={!canSave || busy}>
            {t({ en: 'Save to my journal', hi: 'डायरी में सहेजें' })}
          </button>
          {saved && (
            <span className={styles.savedMsg}>
              ✓ {synced ? t({ en: 'Saved to your account', hi: 'आपके खाते में सहेजा गया' }) : t({ en: 'Saved on this device', hi: 'इस उपकरण पर सहेजा गया' })}
            </span>
          )}
        </div>
      </form>

      {entries.length > 0 && (
        <div className={styles.history}>
          <h4>
            {synced
              ? t({ en: 'My recent entries (private, in my account)', hi: 'मेरी हाल की प्रविष्टियाँ (निजी, मेरे खाते में)' })
              : t({ en: 'My recent entries (private, on this device)', hi: 'मेरी हाल की प्रविष्टियाँ (निजी, केवल इस उपकरण पर)' })}
          </h4>
          {entries.slice(0, 5).map((en) => (
            <div key={en.id} className={styles.entry}>
              <div>
                <small>{entryDate(en.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short' })}</small>
                <p>
                  <s>{en.thought}</s>
                </p>
                <p>→ {en.balanced || '…'}</p>
                <small>
                  {en.emotion} {en.before}% → {en.after}%
                </small>
              </div>
              <button className={styles.iconBtn} aria-label={t({ en: 'Delete entry', hi: 'प्रविष्टि हटाएँ' })} onClick={() => removeEntry(en.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

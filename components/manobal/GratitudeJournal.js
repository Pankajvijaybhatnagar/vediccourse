'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { todayKey } from '@/lib/useStoredState';
import useJournal from './useJournal';
import JournalSyncBar from './JournalSyncBar';
import styles from './tools.module.css';

const cleanItems = (arr) => (Array.isArray(arr) ? arr : []).slice(0, 3).map((x) => String(x ?? '').trim().slice(0, 300));

/** Local { 'YYYY-MM-DD': [3 strings] } → API entries (empty days skipped). */
const toEntries = (journal) =>
  Object.entries(journal || {})
    .filter(([date, arr]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && cleanItems(arr).some(Boolean))
    .map(([date, arr]) => ({ date, data: { items: cleanItems(arr) } }));

const PROMPTS = [
  { en: 'Something small that made me smile today…', hi: 'आज किस छोटी-सी बात ने मुझे मुस्कुराया…' },
  { en: 'A person I am thankful for, and why…', hi: 'एक व्यक्ति जिसका मैं आभारी हूँ, और क्यों…' },
  { en: 'Something about myself I appreciate…', hi: 'अपने बारे में एक बात जिसकी मैं सराहना करता/करती हूँ…' },
];

export default function GratitudeJournal() {
  const { t, lang } = useLang();
  const store = useJournal('gratitude', 'vedicdhaam-manobal-gratitude', {}, toEntries);
  const { synced } = store;
  const journal = synced ? Object.fromEntries(store.entries.map((e) => [e.date, e.data.items])) : store.local;
  const loaded = store.ready;
  const today = todayKey();
  const [items, setItems] = useState(['', '', '']);
  const [savedMsg, setSavedMsg] = useState(false);

  // Load today's saved items once the store is ready (and again when switching device-only ↔ account).
  useEffect(() => {
    if (loaded) {
      const saved = journal[today];
      setItems(saved ? [0, 1, 2].map((i) => saved[i] ?? '') : ['', '', '']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, synced]);

  const save = async () => {
    if (!synced) {
      store.setLocal((j) => ({ ...j, [today]: items }));
      return;
    }
    const clean = cleanItems(items);
    if (!clean.some(Boolean)) return;
    const prev = journal[today] ? cleanItems(journal[today]) : null;
    if (prev && prev.join('\u0000') === clean.join('\u0000')) return; // unchanged; skip the request
    try {
      await store.save(today, { items: clean });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
    } catch {}
  };

  // Consecutive days with at least one entry, ending today or yesterday.
  const streak = (() => {
    let n = 0;
    const d = new Date();
    if (!journal[today]) d.setDate(d.getDate() - 1);
    for (;;) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!journal[k]?.some((x) => x.trim())) break;
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  })();

  const past = Object.entries(journal)
    .filter(([k]) => k !== today)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, 3);

  return (
    <div className={styles.tool}>
      <JournalSyncBar journal={store} />
      <div className={styles.streak}>
        🪔 {t({ en: `${streak}-day gratitude streak`, hi: `${streak} दिन से लगातार कृतज्ञता` })}
      </div>
      {PROMPTS.map((pr, i) => (
        <div key={i} className="field" style={{ marginBottom: 12 }}>
          <label htmlFor={`gr-${i}`}>
            {i + 1}. {t(pr)}
          </label>
          <input
            id={`gr-${i}`}
            className="input"
            maxLength={300}
            value={items[i]}
            onChange={(e) => setItems((arr) => arr.map((x, j) => (j === i ? e.target.value : x)))}
            onBlur={save}
          />
        </div>
      ))}
      <div className={styles.toolActions}>
        <button className="btn btn-primary" onClick={save} disabled={!items.some((x) => x.trim())}>
          {t({ en: 'Save today’s gratitude', hi: 'आज की कृतज्ञता सहेजें' })}
        </button>
        {savedMsg && <span className={styles.savedMsg}>✓ {t({ en: 'Saved to your account', hi: 'आपके खाते में सहेजा गया' })}</span>}
      </div>
      {past.length > 0 && (
        <div className={styles.history}>
          <h4>{t({ en: 'Earlier days', hi: 'पिछले दिन' })}</h4>
          {past.map(([k, arr]) => (
            <div key={k} className={styles.entry}>
              <div>
                <small>{new Date(`${k}T12:00`).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short' })}</small>
                {arr.filter((x) => x.trim()).map((x) => (
                  <p key={x}>🙏 {x}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

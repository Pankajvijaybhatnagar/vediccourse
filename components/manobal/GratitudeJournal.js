'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import useStoredState, { todayKey } from '@/lib/useStoredState';
import styles from './tools.module.css';

const PROMPTS = [
  { en: 'Something small that made me smile today…', hi: 'आज किस छोटी-सी बात ने मुझे मुस्कुराया…' },
  { en: 'A person I am thankful for, and why…', hi: 'एक व्यक्ति जिसका मैं आभारी हूँ, और क्यों…' },
  { en: 'Something about myself I appreciate…', hi: 'अपने बारे में एक बात जिसकी मैं सराहना करता/करती हूँ…' },
];

export default function GratitudeJournal() {
  const { t, lang } = useLang();
  const [journal, setJournal, loaded] = useStoredState('vedicdhaam-manobal-gratitude', {});
  const today = todayKey();
  const [items, setItems] = useState(['', '', '']);

  useEffect(() => {
    if (loaded && journal[today]) setItems(journal[today]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const save = () => setJournal((j) => ({ ...j, [today]: items }));

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

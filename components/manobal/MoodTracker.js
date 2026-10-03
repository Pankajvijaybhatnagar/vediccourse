'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { todayKey } from '@/lib/useStoredState';
import useJournal from './useJournal';
import JournalSyncBar from './JournalSyncBar';
import styles from './tools.module.css';

const MOODS = [
  { v: 1, emoji: '😢', label: { en: 'Very low', hi: 'बहुत उदास' }, color: '#8e9aaf' },
  { v: 2, emoji: '😔', label: { en: 'Low', hi: 'उदास' }, color: '#a8b4c8' },
  { v: 3, emoji: '😐', label: { en: 'Okay', hi: 'ठीक-ठाक' }, color: '#f2c14e' },
  { v: 4, emoji: '🙂', label: { en: 'Good', hi: 'अच्छा' }, color: '#7cc6a4' },
  { v: 5, emoji: '😄', label: { en: 'Great', hi: 'बहुत अच्छा' }, color: '#2a9d8f' },
];

const TAGS = [
  { id: 'sleep', label: { en: 'Slept well', hi: 'अच्छी नींद' } },
  { id: 'exercise', label: { en: 'Exercise/Yoga', hi: 'व्यायाम/योग' } },
  { id: 'study', label: { en: 'Study/Work', hi: 'पढ़ाई/काम' } },
  { id: 'family', label: { en: 'Family time', hi: 'परिवार के साथ' } },
  { id: 'friends', label: { en: 'Friends', hi: 'मित्र' } },
  { id: 'prayer', label: { en: 'Prayer/Meditation', hi: 'प्रार्थना/ध्यान' } },
  { id: 'screen', label: { en: 'Too much screen', hi: 'अधिक स्क्रीन' } },
  { id: 'stress', label: { en: 'Stressful day', hi: 'तनावपूर्ण दिन' } },
];

const TAG_IDS = new Set(TAGS.map((tg) => tg.id));
const EMPTY = { mood: 0, tags: [], note: '' };

/** Local { 'YYYY-MM-DD': { mood, tags, note } } → API entries (days without a mood are skipped). */
const toEntries = (log) =>
  Object.entries(log || {})
    .filter(([date, v]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && v?.mood >= 1 && v.mood <= 5)
    .map(([date, v]) => ({ date, data: clean(v) }));

const clean = (v) => ({
  mood: v.mood,
  tags: (v.tags || []).filter((x) => TAG_IDS.has(x)),
  ...(v.note?.trim() && { note: v.note.trim().slice(0, 300) }),
});

export default function MoodTracker() {
  const { t, lang } = useLang();
  const journal = useJournal('mood', 'vedicdhaam-manobal-mood', {}, toEntries);
  const { synced } = journal;
  const today = todayKey();

  const log = synced ? Object.fromEntries(journal.entries.map((e) => [e.date, e.data])) : journal.local;
  const savedToday = log[today];

  // Signed-in: edit today's entry as a draft; mood/tag clicks save at once, the note saves on blur.
  const [draft, setDraft] = useState(null);
  useEffect(() => {
    if (synced && journal.ready) setDraft(savedToday ? { ...EMPTY, ...savedToday } : null);
    // Re-seed only when today's saved entry changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synced, journal.ready, savedToday?.mood, savedToday?.note, (savedToday?.tags || []).join()]);

  const entry = { ...EMPTY, ...((synced ? draft || savedToday : savedToday) || {}) };

  const persist = (next) => {
    if (next.mood >= 1) journal.save(today, clean(next)).catch(() => {});
  };

  const update = (patch, { saveNow = true } = {}) => {
    if (!synced) {
      journal.setLocal((l) => ({ ...l, [today]: { ...EMPTY, ...(l[today] || {}), ...patch } }));
      return;
    }
    const next = { ...entry, ...patch };
    setDraft(next);
    if (saveNow) persist(next);
  };

  // Last 14 days for the chart.
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { k, d, mood: log[k]?.mood || 0 };
  });
  const logged = days.filter((d) => d.mood);
  const avg = logged.length ? logged.reduce((s, d) => s + d.mood, 0) / logged.length : 0;
  const lowStreak = (() => {
    let n = 0;
    for (let i = days.length - 1; i >= 0 && days[i].mood && days[i].mood <= 2; i--) n++;
    return n;
  })();

  return (
    <div className={styles.tool}>
      <JournalSyncBar journal={journal} />
      <h4 className={styles.toolTitle}>{t({ en: 'How are you feeling today?', hi: 'आज आप कैसा अनुभव कर रहे हैं?' })}</h4>
      <div className={styles.moods} role="radiogroup" aria-label={t({ en: 'Mood', hi: 'मनोदशा' })}>
        {MOODS.map((m) => (
          <button key={m.v} role="radio" aria-checked={entry.mood === m.v} className={entry.mood === m.v ? styles.moodOn : ''} onClick={() => update({ mood: m.v })}>
            <span>{m.emoji}</span>
            <small>{t(m.label)}</small>
          </button>
        ))}
      </div>

      <div className={styles.tags}>
        {TAGS.map((tg) => {
          const on = entry.tags.includes(tg.id);
          return (
            <button key={tg.id} aria-pressed={on} onClick={() => update({ tags: on ? entry.tags.filter((x) => x !== tg.id) : [...entry.tags, tg.id] })}>
              {t(tg.label)}
            </button>
          );
        })}
      </div>

      <div className={styles.row2} style={{ alignItems: 'end' }}>
        <div className="field">
          <label htmlFor="mood-note">{t({ en: 'One line about today (optional)', hi: 'आज के बारे में एक पंक्ति (वैकल्पिक)' })}</label>
          <input
            id="mood-note"
            className="input"
            maxLength={300}
            value={entry.note || ''}
            onChange={(e) => update({ note: e.target.value }, { saveNow: false })}
            onBlur={() => synced && draft && persist(draft)}
          />
        </div>
      </div>

      <div className={styles.chart} aria-label={t({ en: 'Mood over the last 14 days', hi: 'पिछले 14 दिनों की मनोदशा' })}>
        {days.map((d) => (
          <div key={d.k} className={styles.bar} title={`${d.d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short' })}: ${d.mood || '—'}`}>
            <span style={{ height: `${(d.mood / 5) * 100}%`, background: MOODS[d.mood - 1]?.color || 'transparent' }} />
            <small>{d.d.getDate()}</small>
          </div>
        ))}
      </div>
      <p className={styles.toolNote}>
        {logged.length
          ? t({ en: `Average over ${logged.length} logged days: ${avg.toFixed(1)} / 5`, hi: `${logged.length} दिनों का औसत: ${avg.toFixed(1)} / 5` })
          : t({ en: 'Log your mood daily to see your pattern here.', hi: 'प्रतिदिन मनोदशा दर्ज करें, यहाँ आपका पैटर्न दिखेगा।' })}
      </p>
      {lowStreak >= 5 && (
        <div className={styles.alert} role="alert">
          {t({
            en: `Your mood has been low for ${lowStreak} days in a row. This is a good time to talk to someone you trust or a professional. Tele-MANAS: 14416 (free, 24×7).`,
            hi: `पिछले ${lowStreak} दिनों से आपकी मनोदशा लगातार उदास है। किसी विश्वसनीय व्यक्ति या विशेषज्ञ से बात करने का यह उचित समय है। टेली-मानस: 14416 (निःशुल्क, 24×7)।`,
          })}
        </div>
      )}
    </div>
  );
}

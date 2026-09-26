'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import useStoredState, { todayKey } from '@/lib/useStoredState';
import styles from './tools.module.css';

const PRESETS = [
  { id: 'classic', focus: 25, rest: 5, label: { en: '25 / 5', hi: '25 / 5' } },
  { id: 'deep', focus: 50, rest: 10, label: { en: '50 / 10', hi: '50 / 10' } },
  { id: 'short', focus: 15, rest: 3, label: { en: '15 / 3', hi: '15 / 3' } },
];

function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.5);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.18);
      o.stop(ctx.currentTime + i * 0.18 + 0.55);
    });
  } catch {}
}

export default function FocusTimer() {
  const { t } = useLang();
  const [preset, setPreset] = useState(PRESETS[0]);
  const [mode, setMode] = useState('focus');
  const [left, setLeft] = useState(PRESETS[0].focus * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useStoredState('vedicdhaam-manobal-focus', {});
  const endAt = useRef(null);

  const total = (mode === 'focus' ? preset.focus : preset.rest) * 60;
  const todayCount = sessions[todayKey()] || 0;

  useEffect(() => {
    if (!running) return;
    endAt.current = Date.now() + left * 1000;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        clearInterval(id);
        chime();
        setRunning(false);
        if (mode === 'focus') setSessions((s) => ({ ...s, [todayKey()]: (s[todayKey()] || 0) + 1 }));
        const nextMode = mode === 'focus' ? 'rest' : 'focus';
        setMode(nextMode);
        setLeft((nextMode === 'focus' ? preset.focus : preset.rest) * 60);
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const choose = (p) => {
    setPreset(p);
    setMode('focus');
    setRunning(false);
    setLeft(p.focus * 60);
  };

  const r = 88;
  const circ = 2 * Math.PI * r;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div className={styles.tool}>
      <div className={styles.segment} role="group" aria-label={t({ en: 'Timer length', hi: 'समय अवधि' })}>
        {PRESETS.map((p) => (
          <button key={p.id} aria-pressed={preset.id === p.id} onClick={() => choose(p)}>
            {t(p.label)} {t({ en: 'min', hi: 'मिनट' })}
          </button>
        ))}
      </div>
      <div className={styles.timerWrap}>
        <svg viewBox="0 0 200 200" className={styles.timerSvg} aria-hidden="true">
          <circle cx="100" cy="100" r={r} fill="none" stroke="#eef3f1" strokeWidth="10" />
          <circle
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={mode === 'focus' ? '#f6a609' : '#2a9d8f'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (left / total)}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 0.3s linear' }}
          />
        </svg>
        <div className={styles.timerText} aria-live="polite">
          <small>{mode === 'focus' ? t({ en: 'Focus', hi: 'एकाग्र अध्ययन' }) : t({ en: 'Break', hi: 'विश्राम' })}</small>
          <strong>
            {mm}:{ss}
          </strong>
        </div>
      </div>
      <div className={styles.toolActions}>
        <button className="btn btn-primary" onClick={() => setRunning((x) => !x)}>
          {running ? <Pause size={18} /> : <Play size={18} />} {running ? t({ en: 'Pause', hi: 'रोकें' }) : t({ en: 'Start', hi: 'आरंभ करें' })}
        </button>
        <button className="btn btn-ghost" onClick={() => choose(preset)} aria-label={t({ en: 'Reset', hi: 'पुनः आरंभ' })}>
          <RotateCcw size={16} />
        </button>
        <button
          className="btn btn-ghost"
          aria-label={t({ en: 'Skip', hi: 'छोड़ें' })}
          onClick={() => {
            const nextMode = mode === 'focus' ? 'rest' : 'focus';
            setRunning(false);
            setMode(nextMode);
            setLeft((nextMode === 'focus' ? preset.focus : preset.rest) * 60);
          }}
        >
          <SkipForward size={16} />
        </button>
        <span className={styles.rounds}>
          {t({ en: 'Sessions today', hi: 'आज के सत्र' })}: <b>{todayCount}</b>
        </span>
      </div>
      <p className={styles.toolNote}>
        {t({
          en: 'Keep your phone in another room. In breaks, stand up, stretch, drink water and look far away — not at a screen.',
          hi: 'फ़ोन दूसरे कमरे में रखें। विश्राम में उठें, शरीर खींचें, पानी पिएँ और दूर देखें — स्क्रीन पर नहीं।',
        })}
      </p>
    </div>
  );
}

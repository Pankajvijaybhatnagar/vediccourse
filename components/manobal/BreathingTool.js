'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './tools.module.css';

const PATTERNS = {
  box: {
    name: { en: 'Box breathing', hi: 'बॉक्स श्वास' },
    note: { en: 'Equal counts. Great before exams or interviews.', hi: 'चारों चरण बराबर। परीक्षा या साक्षात्कार से पहले उत्तम।' },
    phases: [['in', 4], ['hold', 4], ['out', 4], ['rest', 4]],
  },
  '478': {
    name: { en: '4-7-8 relaxing', hi: '4-7-8 विश्राम श्वास' },
    note: { en: 'Long exhale switches on the body’s calming system. Helpful before sleep.', hi: 'लंबा निःश्वास शरीर की शांति प्रणाली को सक्रिय करता है। सोने से पहले सहायक।' },
    phases: [['in', 4], ['hold', 7], ['out', 8]],
  },
  calm: {
    name: { en: 'Calm 4-6', hi: 'शांत 4-6 श्वास' },
    note: { en: 'Simple and gentle. Use any time anxiety rises.', hi: 'सरल और सौम्य। जब भी घबराहट बढ़े, तब करें।' },
    phases: [['in', 4], ['out', 6]],
  },
  bhramari: {
    name: { en: 'Bhramari (humming bee)', hi: 'भ्रामरी प्राणायाम' },
    note: { en: 'Close your ears with thumbs and hum "mmm" while exhaling. Soothes a racing mind.', hi: 'अंगूठों से कान बंद करें और निःश्वास के साथ "म्म्म" की गुंजन करें। बेचैन मन को शांत करता है।' },
    phases: [['in', 4], ['hum', 8]],
  },
};

const LABEL = {
  in: { en: 'Breathe in', hi: 'श्वास लें' },
  hold: { en: 'Hold', hi: 'रोकें' },
  out: { en: 'Breathe out', hi: 'श्वास छोड़ें' },
  rest: { en: 'Rest', hi: 'ठहरें' },
  hum: { en: 'Hum out… mmm', hi: 'गुंजन करें… म्म्म' },
};

export default function BreathingTool({ initial = 'box' }) {
  const { t } = useLang();
  const [pattern, setPattern] = useState(initial);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef(null);

  const phases = PATTERNS[pattern].phases;
  const cycle = phases.reduce((sum, [, n]) => sum + n, 0);

  // Everything is derived from elapsed seconds, so one timer drives phase, countdown and rounds.
  const within = elapsed % cycle;
  const rounds = Math.floor(elapsed / cycle);
  let acc = 0;
  let phase = 0;
  for (let i = 0; i < phases.length; i++) {
    if (within < acc + phases[i][1]) {
      phase = i;
      break;
    }
    acc += phases[i][1];
  }
  const [kind, secs] = phases[phase];
  const count = acc + secs - within;

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer.current);
  }, [running]);

  // Circle expands on inhale, stays on hold, shrinks on exhale.
  const scale = !running ? 0.7 : kind === 'in' ? 1 : kind === 'hold' ? 1 : 0.62;

  return (
    <div className={styles.tool}>
      <div className={styles.segment} role="group" aria-label={t({ en: 'Breathing pattern', hi: 'श्वास विधि' })}>
        {Object.entries(PATTERNS).map(([id, p]) => (
          <button
            key={id}
            aria-pressed={pattern === id}
            onClick={() => {
              setPattern(id);
              reset();
            }}
          >
            {t(p.name)}
          </button>
        ))}
      </div>
      <p className={styles.toolNote}>{t(PATTERNS[pattern].note)}</p>

      <div className={styles.breathStage}>
        <div
          className={`${styles.breathCircle} ${styles[`breath_${kind}`]}`}
          style={{ transform: `scale(${scale})`, transitionDuration: running ? `${secs}s` : '0.6s' }}
          aria-hidden="true"
        />
        <div className={styles.breathText} aria-live="polite">
          <strong>{running ? t(LABEL[kind]) : t({ en: 'Ready', hi: 'तैयार' })}</strong>
          <span>{running ? count : '—'}</span>
        </div>
      </div>

      <div className={styles.toolActions}>
        <button className="btn btn-primary" onClick={() => setRunning((r) => !r)}>
          {running ? <Pause size={18} /> : <Play size={18} />} {running ? t({ en: 'Pause', hi: 'रोकें' }) : t({ en: 'Start', hi: 'आरंभ करें' })}
        </button>
        <button className="btn btn-ghost" onClick={() => reset()}>
          <RotateCcw size={16} /> {t({ en: 'Reset', hi: 'पुनः आरंभ' })}
        </button>
        <span className={styles.rounds}>
          {t({ en: 'Rounds', hi: 'चक्र' })}: <b>{rounds}</b>
        </span>
      </div>
      <p className={styles.caution}>
        {t({
          en: 'Breathe gently through the nose. If you feel dizzy, stop and breathe normally. Skip breath-holding if you are pregnant or have heart or lung conditions.',
          hi: 'नाक से धीरे-धीरे श्वास लें। चक्कर आए तो रुककर सामान्य श्वास लें। गर्भावस्था या हृदय/फेफड़ों के रोग में श्वास रोकने वाला चरण न करें।',
        })}
      </p>
    </div>
  );
}

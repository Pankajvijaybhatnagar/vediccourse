'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, PlayCircle } from 'lucide-react';
import styles from '../../karmkand.module.css';

const toHindiDigits = (n) => String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]);

export default function PoojaSteps({ name, steps }) {
  const [done, setDone] = useState(() => steps.map(() => false));
  const [focus, setFocus] = useState(null); // index of the step shown in पूजा मोड

  const toggle = (i) => setDone((d) => d.map((v, j) => (j === i ? !v : v)));

  const close = useCallback(() => setFocus(null), []);
  const go = useCallback(
    (dir) =>
      setFocus((f) => {
        const next = f + dir;
        if (dir > 0) setDone((d) => d.map((v, j) => (j === f ? true : v)));
        return next >= 0 && next < steps.length ? next : f;
      }),
    [steps.length]
  );

  // Keyboard navigation and scroll lock while पूजा मोड is open.
  useEffect(() => {
    if (focus === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [focus, close, go]);

  const completed = done.filter(Boolean).length;
  const step = focus !== null ? steps[focus] : null;

  return (
    <>
      <div className={styles.stepsHead}>
        <h2 className={styles.h2} style={{ margin: 0 }}>
          चरणबद्ध पूजा विधि
        </h2>
        <button className="btn btn-primary" onClick={() => setFocus(0)}>
          <PlayCircle size={18} /> पूजा मोड आरंभ करें
        </button>
      </div>
      <p className="muted" style={{ marginTop: -6 }}>
        पूजा करते समय &quot;पूजा मोड&quot; खोलें — हर चरण बड़े अक्षरों में एक-एक करके दिखेगा। चरण पूरा होने पर उसके अंक पर टैप करके चिह्नित करें। (
        {toHindiDigits(completed)}/{toHindiDigits(steps.length)} पूर्ण)
      </p>

      <ol className={styles.timeline}>
        {steps.map((s, i) => (
          <li key={s.title} className={`${styles.step} ${done[i] ? styles.stepDone : ''}`}>
            <button className={styles.stepNum} onClick={() => toggle(i)} aria-pressed={done[i]} aria-label={`चरण ${i + 1} ${done[i] ? 'पूर्ण' : 'पूर्ण चिह्नित करें'}`}>
              {done[i] ? '✓' : toHindiDigits(i + 1)}
            </button>
            <div className={styles.stepCard}>
              <h3>{s.title}</h3>
              <p>{s.detail}</p>
              {s.mantra && <div className={styles.stepMantra}>{s.mantra}</div>}
            </div>
          </li>
        ))}
      </ol>

      {step && (
        <div className={styles.focusOverlay} role="dialog" aria-modal="true" aria-label={`${name} — पूजा मोड`}>
          <div className={styles.focusBar}>
            <span style={{ width: `${((focus + 1) / steps.length) * 100}%` }} />
          </div>
          <div className={styles.focusTop}>
            <strong>{name}</strong>
            <button className={styles.focusClose} onClick={close} aria-label="पूजा मोड बंद करें">
              <X size={20} />
            </button>
          </div>
          <div className={styles.focusBody} key={focus}>
            <span className={styles.focusCount}>
              चरण {toHindiDigits(focus + 1)} / {toHindiDigits(steps.length)}
            </span>
            <h2 className="fade-up">{step.title}</h2>
            <p className="fade-up">{step.detail}</p>
            {step.mantra && <div className={`${styles.focusMantra} fade-up`}>{step.mantra}</div>}
          </div>
          <div className={styles.focusNav}>
            <button className="btn btn-ghost btn-lg" onClick={() => go(-1)} disabled={focus === 0}>
              <ChevronLeft size={20} /> पिछला
            </button>
            {focus < steps.length - 1 ? (
              <button className="btn btn-primary btn-lg" onClick={() => go(1)}>
                अगला चरण <ChevronRight size={20} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setDone(steps.map(() => true));
                  close();
                }}
              >
                🙏 पूजा सम्पन्न
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

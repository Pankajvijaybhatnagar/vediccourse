'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { CHAUPAIS, GRID, GRID_SIZE, RULES, readFromCell } from '@/lib/prashna/ramShalaka';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RamShalakaClient() {
  const { t } = useLang();
  const [start, setStart] = useState(null);
  const [shown, setShown] = useState(0); // how many of the 25 letters are revealed
  const resultRef = useRef(null);
  const reading = start == null ? null : readFromCell(start);
  const done = reading && shown >= 25;

  // Opened from the homepage yantra: /prashna/ram-shalaka?cell=37
  useEffect(() => {
    const c = Number(new URLSearchParams(window.location.search).get('cell'));
    if (Number.isInteger(c) && c >= 0 && c < GRID.length) pick(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (start == null || shown >= 25) return undefined;
    const id = setTimeout(() => setShown((n) => n + 1), 70);
    return () => clearTimeout(id);
  }, [start, shown]);

  useEffect(() => {
    if (done) resultRef.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }, [done]);

  function pick(i) {
    setStart(i);
    setShown(reducedMotion() ? 25 : 1);
  }

  const hit = new Set(reading ? reading.cells.slice(0, shown) : []);
  const c = reading?.chaupai;

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="ram-shalaka" />
      <QuestionBox compact />

      <div className={s.shalakaWrap}>
        <section className={s.yantra} aria-labelledby="yantra-title">
          <p id="yantra-title" className={s.yantraTitle}>
            ॥ श्रीराम शलाका प्रश्नावली ॥
          </p>
          <div className={s.sgrid} role="grid" aria-label={t({ en: '15 by 15 grid of 225 letters', hi: '225 अक्षरों का 15×15 यंत्र' })}>
            {Array.from({ length: GRID_SIZE }, (_, r) => (
              <div key={r} role="row" style={{ display: 'contents' }}>
                {GRID.slice(r * GRID_SIZE, (r + 1) * GRID_SIZE).map((letter, col) => {
                  const i = r * GRID_SIZE + col;
                  const cls = i === start ? s.cellStart : hit.has(i) ? s.cellHit : '';
                  return (
                    <button
                      key={i}
                      type="button"
                      role="gridcell"
                      className={`${s.cell} ${cls}`}
                      onClick={() => pick(i)}
                      disabled={reading && !done}
                      aria-label={`${t({ en: 'Row', hi: 'पंक्ति' })} ${r + 1}, ${t({ en: 'column', hi: 'स्तंभ' })} ${col + 1}: ${letter}`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <div className={s.panel}>
          <StepHead>{t({ en: 'How to ask', hi: 'प्रश्न करने की विधि' })}</StepHead>
          <ol className={s.ruleList}>
            {RULES.map((r) => (
              <li key={r.en}>{t(r)}</li>
            ))}
          </ol>
          <p className={s.lead} style={{ marginTop: 14 }}>
            {t({
              en: 'From the Gita Press Ramcharitmanas. The 225 cells hold the letters of 9 chaupais; whichever cell your finger falls on, every 9th letter spells one of them.',
              hi: 'गीता प्रेस की श्रीरामचरितमानस से। 225 कोष्ठों में 9 चौपाइयों के अक्षर हैं; अँगुली जिस भी कोष्ठ पर पड़े, हर नौवाँ अक्षर उन्हीं में से एक चौपाई बनाता है।',
            })}
          </p>
          {reading && (
            <div className={s.letters} aria-label={t({ en: 'Letters collected', hi: 'एकत्र अक्षर' })}>
              {reading.letters.slice(0, shown).map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {done && (
        <div ref={resultRef} style={{ scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
          <VerdictCard verdict={c.verdict} title={{ en: `Chaupai ${c.index + 1} of 9 · ${c.kand.en}`, hi: `चौपाई ${c.index + 1}/9 · ${c.kand.hi}` }} onReset={() => setStart(null)}>
            <div className={s.chaupai}>
              <p>{c.line1}</p>
              <p>{c.line2}</p>
              <small>— {t({ en: 'Shri Ramcharitmanas', hi: 'श्रीरामचरितमानस' })}, {t(c.kand)}</small>
            </div>
            <dl className={s.factList}>
              <div>
                <dt>{t({ en: 'Phal (answer)', hi: 'फल (उत्तर)' })}</dt>
                <dd>{t(c.phal)}</dd>
              </div>
              <div>
                <dt>{t({ en: 'Meaning', hi: 'अर्थ' })}</dt>
                <dd style={{ fontWeight: 500 }}>{t(c.meaning)}</dd>
              </div>
              <div>
                <dt>{t({ en: 'Context', hi: 'प्रसंग' })}</dt>
                <dd style={{ fontWeight: 500 }}>{t(c.context)}</dd>
              </div>
            </dl>
          </VerdictCard>
        </div>
      )}

      <section className={s.panel}>
        <StepHead>{t({ en: 'All 9 chaupais and their phal', hi: 'सभी 9 चौपाइयाँ और उनका फल' })}</StepHead>
        <div className={s.chaupaiList}>
          {CHAUPAIS.map((ch) => (
            <details key={ch.index}>
              <summary>
                {ch.index + 1}. {ch.line1} {ch.line2}
              </summary>
              <p>
                <span className={s.tag}>{t(ch.kand)}</span> {t(ch.meaning)}
              </p>
              <p>
                <strong>{t({ en: 'Phal:', hi: 'फल:' })}</strong> {t(ch.phal)}
              </p>
            </details>
          ))}
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}

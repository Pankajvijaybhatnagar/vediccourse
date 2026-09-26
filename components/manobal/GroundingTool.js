'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import styles from './tools.module.css';

const SENSES = [
  { n: 5, icon: '👀', label: { en: 'things you can SEE', hi: 'वस्तुएँ जो आप देख सकते हैं' }, hint: { en: 'e.g. a clock, a plant, the colour of the wall', hi: 'जैसे घड़ी, पौधा, दीवार का रंग' } },
  { n: 4, icon: '✋', label: { en: 'things you can TOUCH', hi: 'वस्तुएँ जिन्हें आप छू सकते हैं' }, hint: { en: 'e.g. your clothes, the chair, a cool glass', hi: 'जैसे अपने वस्त्र, कुर्सी, ठंडा गिलास' } },
  { n: 3, icon: '👂', label: { en: 'sounds you can HEAR', hi: 'ध्वनियाँ जो आप सुन सकते हैं' }, hint: { en: 'e.g. a fan, birds, traffic far away', hi: 'जैसे पंखा, पक्षी, दूर का यातायात' } },
  { n: 2, icon: '👃', label: { en: 'things you can SMELL', hi: 'गंध जो आप सूँघ सकते हैं' }, hint: { en: 'e.g. incense, soap, tea', hi: 'जैसे अगरबत्ती, साबुन, चाय' } },
  { n: 1, icon: '👅', label: { en: 'thing you can TASTE', hi: 'स्वाद जो आप अनुभव कर सकते हैं' }, hint: { en: 'e.g. mint, water, toothpaste', hi: 'जैसे पुदीना, पानी, टूथपेस्ट' } },
];

export default function GroundingTool() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(SENSES.map((s) => Array(s.n).fill('')));
  const done = step >= SENSES.length;

  const setAnswer = (i, j, v) => setAnswers((a) => a.map((row, ri) => (ri === i ? row.map((x, xj) => (xj === j ? v : x)) : row)));

  return (
    <div className={styles.tool}>
      <div className={styles.dots} aria-hidden="true">
        {SENSES.map((s, i) => (
          <span key={s.n} className={i < step ? styles.dotDone : i === step ? styles.dotNow : ''}>
            {s.n}
          </span>
        ))}
      </div>

      {!done ? (
        <div className={`${styles.groundCard} fade-up`} key={step}>
          <span className={styles.groundIcon}>{SENSES[step].icon}</span>
          <h3>
            {t({ en: 'Name', hi: 'बताइए' })} <b>{SENSES[step].n}</b> {t(SENSES[step].label)}
          </h3>
          <p className={styles.toolNote}>{t(SENSES[step].hint)}</p>
          <div className={styles.groundInputs}>
            {answers[step].map((v, j) => (
              <input
                key={j}
                className="input"
                value={v}
                aria-label={`${j + 1}`}
                placeholder={`${j + 1}.`}
                onChange={(e) => setAnswer(step, j, e.target.value)}
              />
            ))}
          </div>
          <div className={styles.toolActions}>
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                {t({ en: 'Back', hi: 'पीछे' })}
              </button>
            )}
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              {step === SENSES.length - 1 ? t({ en: 'Finish', hi: 'पूर्ण करें' }) : t({ en: 'Next', hi: 'आगे' })}
            </button>
          </div>
        </div>
      ) : (
        <div className={`${styles.groundCard} fade-up`}>
          <span className={styles.groundIcon}>🌿</span>
          <h3>{t({ en: 'Well done. You are here, in this moment.', hi: 'बहुत अच्छा। आप इस क्षण में, यहीं उपस्थित हैं।' })}</h3>
          <p className={styles.toolNote}>
            {t({
              en: 'Notice your breath and your feet on the ground. Anxiety rises like a wave and always falls again.',
              hi: 'अपनी श्वास और भूमि पर टिके पैरों को अनुभव करें। चिंता लहर की तरह उठती है और फिर अवश्य उतरती है।',
            })}
          </p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setStep(0);
              setAnswers(SENSES.map((s) => Array(s.n).fill('')));
            }}
          >
            {t({ en: 'Do it again', hi: 'फिर से करें' })}
          </button>
        </div>
      )}
    </div>
  );
}

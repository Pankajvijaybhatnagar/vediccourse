'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { TESTS, OPTIONS } from '@/lib/manobal/screening';
import HelpBanner from './HelpBanner';
import styles from './selfcheck.module.css';

const LEVEL_COLOR = { minimal: '#2a9d8f', mild: '#f2c14e', moderate: '#f39c12', severe: '#e0452f' };

export default function SelfCheck() {
  const { t } = useLang();
  const [testId, setTestId] = useState('gad7');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef(null);
  const test = TESTS[testId];

  const switchTest = (id) => {
    setTestId(id);
    setAnswers({});
    setSubmitted(false);
  };

  const complete = Object.keys(answers).length === test.items.length;
  const score = Object.values(answers).reduce((s, v) => s + v, 0);
  const band = test.bands.find((b) => score <= b.max);
  const max = test.items.length * 3;
  const risk = test.riskItem != null && (answers[test.riskItem] ?? 0) > 0;

  const submit = () => {
    setSubmitted(true);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div className={styles.wrap} ref={topRef}>
      <div className={styles.privacy}>
        <ShieldCheck size={18} />
        {t({
          en: 'Completely private — your answers stay in this browser tab and are never saved or sent anywhere.',
          hi: 'पूर्णतः गोपनीय — आपके उत्तर केवल इसी ब्राउज़र टैब में रहते हैं, कहीं सहेजे या भेजे नहीं जाते।',
        })}
      </div>

      <div className={styles.tabs} role="tablist">
        {Object.values(TESTS).map((x) => (
          <button key={x.id} role="tab" aria-selected={testId === x.id} onClick={() => switchTest(x.id)}>
            <span aria-hidden="true">{x.icon}</span> {t(x.name)}
          </button>
        ))}
      </div>

      {submitted && complete ? (
        <div className={`${styles.result} fade-up`}>
          {risk && (
            <div className={styles.urgent} role="alert">
              <strong>{t({ en: 'Your safety matters most.', hi: 'आपकी सुरक्षा सबसे महत्वपूर्ण है।' })}</strong>
              <p>
                {t({
                  en: 'You mentioned having thoughts of death or self-harm. Please talk to someone right now — call Tele-MANAS at 14416 (free, 24×7) or 112 in an emergency, and tell a trusted person near you. These feelings can get better with support.',
                  hi: 'आपने मृत्यु या स्वयं को हानि पहुँचाने के विचारों का उल्लेख किया है। कृपया अभी किसी से बात करें — टेली-मानस 14416 (निःशुल्क, 24×7) या आपातकाल में 112 पर कॉल करें, और पास के किसी विश्वसनीय व्यक्ति को बताएँ। सहायता से ये भावनाएँ अवश्य बेहतर होती हैं।',
                })}
              </p>
              <div className={styles.urgentBtns}>
                <a href="tel:14416" className="btn btn-primary">
                  📞 {t({ en: 'Call 14416', hi: '14416 पर कॉल करें' })}
                </a>
                <a href="tel:112" className="btn btn-ghost">
                  🚨 112
                </a>
              </div>
            </div>
          )}

          <div className={styles.scoreCard} style={{ '--c': LEVEL_COLOR[band.level] }}>
            <div className={styles.gauge}>
              <svg viewBox="0 0 120 70" aria-hidden="true">
                <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="#eef3f1" strokeWidth="12" strokeLinecap="round" />
                <path
                  d="M10 60 A50 50 0 0 1 110 60"
                  fill="none"
                  stroke="var(--c)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray={`${(score / max) * 100} 100`}
                />
              </svg>
              <strong>
                {score}
                <small>/{max}</small>
              </strong>
            </div>
            <div>
              <span className={styles.level}>{t(band.label)}</span>
              <p>{t(band.advice)}</p>
            </div>
          </div>

          <p className={styles.disclaimer}>
            {t({
              en: 'This is a screening, not a diagnosis. Only a qualified professional can diagnose anxiety or depression. Scores can change — you can retake this in two weeks to see how you are doing.',
              hi: 'यह केवल प्रारंभिक जाँच है, निदान नहीं। चिंता या अवसाद का निदान केवल योग्य विशेषज्ञ ही कर सकते हैं। अंक बदल सकते हैं — दो सप्ताह बाद फिर से जाँच कर सकते हैं।',
            })}
          </p>

          <div className={styles.next}>
            <Link href="/manobal/shwas-se-shanti" className="btn btn-ghost">
              🌬️ {t({ en: 'Try a breathing practice', hi: 'श्वास अभ्यास करें' })}
            </Link>
            <Link href={testId === 'gad7' ? '/manobal/chinta-se-mukti' : '/manobal/udasi-se-bahar'} className="btn btn-ghost">
              📖 {t({ en: 'Read the related chapter', hi: 'संबंधित अध्याय पढ़ें' })}
            </Link>
            <button className="btn btn-ghost" onClick={() => switchTest(testId)}>
              <RotateCcw size={16} /> {t({ en: 'Retake', hi: 'फिर से करें' })}
            </button>
          </div>
          <HelpBanner />
        </div>
      ) : (
        <>
          <p className={styles.intro}>{t(test.intro)}</p>
          <ol className={styles.items}>
            {test.items.map((item, i) => (
              <li key={i} className={answers[i] != null ? styles.answered : ''}>
                <p>{t(item)}</p>
                <div className={styles.options} role="radiogroup" aria-label={t(item)}>
                  {OPTIONS.map((o) => (
                    <button key={o.v} role="radio" aria-checked={answers[i] === o.v} onClick={() => setAnswers((a) => ({ ...a, [i]: o.v }))}>
                      {t(o.label)}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button className="btn btn-primary btn-lg" onClick={submit} disabled={!complete}>
            {t({ en: 'See my result', hi: 'मेरा परिणाम देखें' })}
          </button>
          <p className={styles.credit}>
            {t({
              en: 'Questionnaires: PHQ-9 and GAD-7, developed by Drs. Spitzer, Williams, Kroenke and colleagues.',
              hi: 'प्रश्नावली: PHQ-9 एवं GAD-7, डॉ. स्पिट्ज़र, विलियम्स, क्रोएंके और सहयोगियों द्वारा विकसित।',
            })}
          </p>
        </>
      )}
    </div>
  );
}

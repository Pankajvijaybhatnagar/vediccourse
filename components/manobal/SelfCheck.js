'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import HelpBanner from './HelpBanner';
import styles from './selfcheck.module.css';

const LEVEL_COLOR = { minimal: '#2a9d8f', mild: '#f2c14e', moderate: '#f39c12', severe: '#e0452f' };

/**
 * GAD-7 / PHQ-9 self-check. Questionnaires come from GET /manobal/self-check/tests (passed in from the
 * server page, or fetched here); answers are scored by POST /manobal/self-check/:test, which never stores them.
 */
export default function SelfCheck({ initialData = null }) {
  const { t } = useLang();
  const [data, setData] = useState(initialData); // { options, tests: [] }
  const [loadError, setLoadError] = useState('');
  const [testId, setTestId] = useState('gad7');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const topRef = useRef(null);

  const load = () => {
    setLoadError('');
    api('/manobal/self-check/tests', { auth: false })
      .then((res) => setData(res.data))
      .catch(() => setLoadError(t({ en: 'Could not load the questionnaire.', hi: 'प्रश्नावली लोड नहीं हो सकी।' })));
  };

  useEffect(() => {
    if (!data) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tests = data?.tests ?? [];
  const options = data?.options ?? [];
  const test = tests.find((x) => x.id === testId) ?? tests[0];

  const switchTest = (id) => {
    setTestId(id);
    setAnswers({});
    setResult(null);
    setSubmitError('');
  };

  const scrollTop = () => requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

  const complete = test ? Object.keys(answers).length === test.items.length : false;
  // Local safety check: shown even if the server can't be reached.
  const localRisk = test?.riskItem != null && (answers[test.riskItem] ?? 0) > 0;

  const submit = async () => {
    setBusy(true);
    setSubmitError('');
    try {
      const ordered = test.items.map((_, i) => answers[i]);
      const res = await api(`/manobal/self-check/${test.id}`, { method: 'POST', body: { answers: ordered }, auth: false });
      setResult(res.data);
    } catch {
      setSubmitError(
        t({
          en: 'We could not calculate your result right now. Please try again in a moment.',
          hi: 'इस समय परिणाम की गणना नहीं हो सकी। कृपया कुछ क्षण बाद पुनः प्रयास करें।',
        })
      );
    } finally {
      setBusy(false);
      scrollTop();
    }
  };

  const showUrgent = Boolean(result?.urgent) || (Boolean(submitError) && localRisk);

  const urgentBlock = (
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
  );

  return (
    <div className={styles.wrap} ref={topRef}>
      <div className={styles.privacy}>
        <ShieldCheck size={18} />
        {t({
          en: 'Completely private — your answers are only used to calculate your score and are never saved, stored or linked to you.',
          hi: 'पूर्णतः गोपनीय — आपके उत्तर केवल अंक की गणना के लिए उपयोग होते हैं, कभी सहेजे, संग्रहीत या आपसे जोड़े नहीं जाते।',
        })}
      </div>

      {!data ? (
        loadError ? (
          <div className={styles.loadState} role="alert">
            <p>{loadError}</p>
            <button type="button" className="btn btn-primary" onClick={load}>
              {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
            </button>
            <HelpBanner />
          </div>
        ) : (
          <p className={styles.loadState} aria-busy="true">
            {t({ en: 'Loading questionnaire…', hi: 'प्रश्नावली लोड हो रही है…' })}
          </p>
        )
      ) : (
        <>
          <div className={styles.tabs} role="tablist">
            {tests.map((x) => (
              <button key={x.id} role="tab" aria-selected={test?.id === x.id} onClick={() => switchTest(x.id)}>
                <span aria-hidden="true">{x.icon}</span> {t(x.name)}
              </button>
            ))}
          </div>

          {result ? (
            <div className={`${styles.result} fade-up`}>
              {showUrgent && urgentBlock}

              <div className={styles.scoreCard} style={{ '--c': LEVEL_COLOR[result.level] }}>
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
                      strokeDasharray={`${(result.score / result.max) * 100} 100`}
                    />
                  </svg>
                  <strong>
                    {result.score}
                    <small>/{result.max}</small>
                  </strong>
                </div>
                <div>
                  <span className={styles.level}>{t(result.label)}</span>
                  <p>{t(result.advice)}</p>
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
                <Link href={test.id === 'gad7' ? '/manobal/chinta-se-mukti' : '/manobal/udasi-se-bahar'} className="btn btn-ghost">
                  📖 {t({ en: 'Read the related chapter', hi: 'संबंधित अध्याय पढ़ें' })}
                </Link>
                <button className="btn btn-ghost" onClick={() => switchTest(test.id)}>
                  <RotateCcw size={16} /> {t({ en: 'Retake', hi: 'फिर से करें' })}
                </button>
              </div>
              <HelpBanner />
            </div>
          ) : (
            test && (
              <>
                {showUrgent && urgentBlock}
                <p className={styles.intro}>{t(test.intro)}</p>
                <ol className={styles.items}>
                  {test.items.map((item, i) => (
                    <li key={i} className={answers[i] != null ? styles.answered : ''}>
                      <p>{t(item)}</p>
                      <div className={styles.options} role="radiogroup" aria-label={t(item)}>
                        {options.map((o) => (
                          <button key={o.v} role="radio" aria-checked={answers[i] === o.v} onClick={() => setAnswers((a) => ({ ...a, [i]: o.v }))}>
                            {t(o.label)}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
                {submitError && (
                  <p className={styles.errorText} role="alert">
                    {submitError}
                  </p>
                )}
                <button className="btn btn-primary btn-lg" onClick={submit} disabled={!complete || busy}>
                  {busy ? t({ en: 'Calculating…', hi: 'गणना हो रही है…' }) : t({ en: 'See my result', hi: 'मेरा परिणाम देखें' })}
                </button>
                <p className={styles.credit}>
                  {t({
                    en: 'Questionnaires: PHQ-9 and GAD-7, developed by Drs. Spitzer, Williams, Kroenke and colleagues.',
                    hi: 'प्रश्नावली: PHQ-9 एवं GAD-7, डॉ. स्पिट्ज़र, विलियम्स, क्रोएंके और सहयोगियों द्वारा विकसित।',
                  })}
                </p>
              </>
            )
          )}
        </>
      )}
    </div>
  );
}

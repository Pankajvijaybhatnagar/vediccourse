'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import { SIGNS, localizeSign } from '@/lib/zodiac';
import BirthPlacePicker from '@/components/BirthPlacePicker';
import styles from './tools.module.css';

// Questions rarely change; share one request across every compass on the page.
let questionsPromise = null;
const loadQuestions = () => {
  questionsPromise ??= api('/manobal/career/questions', { auth: false })
    .then((res) => res.data)
    .catch((err) => {
      questionsPromise = null;
      throw err;
    });
  return questionsPromise;
};

/**
 * Career compass: interest profile (RIASEC) optionally blended with the 10th house of the birth chart.
 * Questions from GET /manobal/career/questions; scoring by POST /manobal/career/compass (nothing stored).
 */
export default function CareerCompass({ initialData = null }) {
  const { t, lang } = useLang();
  const [data, setData] = useState(initialData); // { riasec, questions, scale }
  const [loadError, setLoadError] = useState(false);
  const [answers, setAnswers] = useState({});
  const [birth, setBirth] = useState({ date: '', time: '' });
  const [place, setPlace] = useState(null); // { lat, lon, tz, name } from BirthPlacePicker
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  const load = () => {
    setLoadError(false);
    loadQuestions()
      .then(setData)
      .catch(() => setLoadError(true));
  };

  useEffect(() => {
    if (!data) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questions = data?.questions ?? [];
  const scale = data?.scale ?? [];
  const riasec = data?.riasec ?? {};
  const answered = Object.keys(answers).length;
  const complete = questions.length > 0 && answered === questions.length;
  const placeMissing = Boolean(birth.date) && !place;

  const compute = async () => {
    setBusy(true);
    setError('');
    try {
      const body = { answers: questions.map((_, i) => answers[i]) };
      if (birth.date && place) {
        body.birth = { date: birth.date, ...(birth.time && { time: birth.time }), lat: place.lat, lon: place.lon, tz: place.tz };
      }
      const res = await api('/manobal/career/compass', { method: 'POST', body, auth: false });
      setResult(res.data);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (err) {
      setError(
        err?.status === 429
          ? t({ en: 'Too many requests — please wait a minute and try again.', hi: 'बहुत अधिक अनुरोध — कृपया एक मिनट बाद पुनः प्रयास करें।' })
          : t({ en: 'We could not calculate your compass right now. Please try again.', hi: 'इस समय करियर कम्पास की गणना नहीं हो सकी। कृपया पुनः प्रयास करें।' })
      );
    } finally {
      setBusy(false);
    }
  };

  const topCodes = useMemo(() => result?.blended.slice(0, 3).map(([c]) => c) || [], [result]);
  const signName = (slug) => {
    const sign = SIGNS.find((s) => s.slug === slug);
    return sign ? localizeSign(sign, lang).name : slug;
  };
  const today = new Date().toISOString().slice(0, 10);

  if (!data) {
    return (
      <div className={styles.tool}>
        {loadError ? (
          <div className={styles.toolActions} role="alert">
            <p className={styles.toolNote} style={{ margin: 0 }}>
              {t({ en: 'Could not load the career compass.', hi: 'करियर कम्पास लोड नहीं हो सका।' })}
            </p>
            <button type="button" className="btn btn-primary btn-sm" onClick={load}>
              {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
            </button>
          </div>
        ) : (
          <p className={styles.toolNote} aria-busy="true">
            {t({ en: 'Loading…', hi: 'लोड हो रहा है…' })}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.tool}>
      {!result && (
        <>
          <div className={styles.quizHead}>
            <span>
              <Compass size={18} /> {t({ en: 'Part 1 — Your interests', hi: 'भाग 1 — आपकी रुचियाँ' })}
            </span>
            <span className={styles.rounds}>
              {answered}/{questions.length}
            </span>
          </div>
          <div className={styles.progressBar} aria-hidden="true">
            <span style={{ width: `${(answered / questions.length) * 100}%` }} />
          </div>
          <ol className={styles.quizList}>
            {questions.map((q, i) => (
              <li key={i}>
                <p>{t(q.text)}</p>
                <div className={styles.scale} role="radiogroup" aria-label={t(q.text)}>
                  {scale.map((s) => (
                    <button key={s.v} role="radio" aria-checked={answers[i] === s.v} onClick={() => setAnswers((a) => ({ ...a, [i]: s.v }))}>
                      {t(s.label)}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.quizHead} style={{ marginTop: 24 }}>
            <span>
              <Sparkles size={18} /> {t({ en: 'Part 2 — Your birth chart (optional)', hi: 'भाग 2 — आपकी जन्म कुंडली (वैकल्पिक)' })}
            </span>
          </div>
          <p className={styles.toolNote}>
            {t({
              en: 'Add your birth details to see what your 10th house (Karma Bhava) suggests. Birth time makes this far more accurate.',
              hi: 'अपना जन्म विवरण जोड़ें और देखें कि आपका दशम भाव (कर्म भाव) क्या संकेत देता है। जन्म समय से परिणाम कहीं अधिक सटीक होता है।',
            })}
          </p>
          <div className={styles.row3}>
            <div className="field">
              <label htmlFor="cc-date">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
              <input id="cc-date" type="date" className="input" max={today} value={birth.date} onChange={(e) => setBirth((b) => ({ ...b, date: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cc-time">{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
              <input id="cc-time" type="time" className="input" value={birth.time} onChange={(e) => setBirth((b) => ({ ...b, time: e.target.value }))} />
            </div>
          </div>
          {birth.date && (
            <div className={styles.placeField}>
              <span className={styles.placeLabel}>{t({ en: 'Place of birth', hi: 'जन्म स्थान' })}</span>
              <BirthPlacePicker onChange={setPlace} error={placeMissing} />
            </div>
          )}

          {error && (
            <p className={styles.errorText} role="alert">
              {error}
            </p>
          )}
          <div className={styles.toolActions}>
            <button className="btn btn-primary btn-lg" onClick={compute} disabled={!complete || placeMissing || busy}>
              <Compass size={18} /> {busy ? t({ en: 'Calculating…', hi: 'गणना हो रही है…' }) : t({ en: 'Show my career compass', hi: 'मेरा करियर कम्पास दिखाएँ' })}
            </button>
            {!complete && (
              <span className={styles.toolNote} style={{ margin: 0 }}>
                {t({ en: `Answer all ${questions.length} statements to continue.`, hi: `आगे बढ़ने के लिए सभी ${questions.length} कथनों का उत्तर दें।` })}
              </span>
            )}
            {complete && placeMissing && (
              <span className={styles.toolNote} style={{ margin: 0 }}>
                {t({ en: 'Choose your place of birth, or clear the date to skip Part 2.', hi: 'जन्म स्थान चुनें, या भाग 2 छोड़ने के लिए तिथि हटा दें।' })}
              </span>
            )}
          </div>
        </>
      )}

      {result && (
        <div ref={resultRef} className={`${styles.careerResult} fade-up`}>
          <h3 className={styles.resultTitle}>{t({ en: 'Your career compass', hi: 'आपका करियर कम्पास' })}</h3>

          <p className={styles.toolNote}>
            {result.astro
              ? t({ en: 'Bars show your interest scores. Highlighted rows are your best fit after adding your 10th-house indicators.', hi: 'पट्टियाँ आपकी रुचि के अंक दिखाती हैं। हाइलाइट की गई पंक्तियाँ दशम भाव के संकेत जोड़ने के बाद आपकी सर्वोत्तम दिशाएँ हैं।' })
              : t({ en: 'Bars show your interest scores. Highlighted rows are your strongest areas.', hi: 'पट्टियाँ आपकी रुचि के अंक दिखाती हैं। हाइलाइट की गई पंक्तियाँ आपके सबसे प्रबल क्षेत्र हैं।' })}
          </p>
          <div className={styles.riasecBars}>
            {result.ranked.map(([code, score]) => (
              <div key={code} className={`${styles.riasecRow} ${topCodes.includes(code) ? styles.riasecTop : ''}`}>
                <span>
                  {riasec[code]?.icon} {t(riasec[code]?.name)}
                </span>
                <div className="meter">
                  <span style={{ width: `${(score / result.max) * 100}%` }} />
                </div>
                <b>{score}/9</b>
              </div>
            ))}
          </div>

          {result.astro && (
            <div className={styles.astroBox}>
              <h4>🪐 {t({ en: 'What your 10th house (Karma Bhava) says', hi: 'आपका दशम भाव (कर्म भाव) क्या कहता है' })}</h4>
              <ul>
                <li>
                  {t({ en: '10th house sign', hi: 'दशम भाव की राशि' })}: <b>{signName(result.astro.tenthSign)}</b> · {t({ en: 'lord', hi: 'स्वामी' })}:{' '}
                  <b>{t(result.astro.lord.name)}</b>
                </li>
                <li>
                  {t({ en: `${t(result.astro.lord.name)} sits in house ${result.astro.lord.house}`, hi: `${t(result.astro.lord.name)} ${result.astro.lord.house}वें भाव में स्थित है` })} — {t(result.astro.lord.meaning)}
                </li>
                <li>
                  {t({ en: 'Fields linked to this lord', hi: 'इस स्वामी से जुड़े क्षेत्र' })}: {t(result.astro.lord.fields)}
                </li>
                {result.astro.inTenth.length > 0 ? (
                  result.astro.inTenth.map((pl) => (
                    <li key={pl.key}>
                      <b>{t(pl.name)}</b> {t({ en: 'in the 10th house', hi: 'दशम भाव में' })}: {t(pl.fields)}
                    </li>
                  ))
                ) : (
                  <li>{t({ en: 'No planet occupies the 10th house — its lord becomes the main guide.', hi: 'दशम भाव में कोई ग्रह नहीं है — इसलिए भाव का स्वामी ही मुख्य मार्गदर्शक है।' })}</li>
                )}
              </ul>
              {!result.astro.timeKnown && (
                <p className={styles.toolNote}>{t({ en: 'Birth time was not given, so noon was used; houses may shift.', hi: 'जन्म समय नहीं दिया गया, इसलिए दोपहर 12 बजे माना गया है; भाव बदल सकते हैं।' })}</p>
              )}
            </div>
          )}

          <h4 className={styles.toolTitle}>{t({ en: 'Best-fit directions to explore', hi: 'खोजने योग्य सर्वोत्तम दिशाएँ' })}</h4>
          <div className={styles.fitGrid}>
            {topCodes.map((code) => (
              <div key={code} className={styles.fitCard}>
                <strong>
                  {riasec[code]?.icon} {t(riasec[code]?.name)}
                </strong>
                <p>{t(riasec[code]?.desc)}</p>
                <div className={styles.tags}>
                  {(riasec[code]?.careers?.[lang] ?? riasec[code]?.careers?.en ?? []).map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.caution}>
            {t({
              en: 'Use this as a starting point for exploration, not a final verdict. Talk to teachers, try internships and short courses, and follow what genuinely excites you. A chart shows tendencies; your effort (कर्म) shapes the result.',
              hi: 'इसे खोज का आरंभ मानें, अंतिम निर्णय नहीं। शिक्षकों से बात करें, इंटर्नशिप और छोटे पाठ्यक्रम आज़माएँ, और जिसमें सच्ची रुचि हो उसे अपनाएँ। कुंडली प्रवृत्ति दिखाती है; परिणाम आपका कर्म बनाता है।',
            })}
          </p>
          <div className={styles.toolActions}>
            <Link href="/astrologers?focus=career" className="btn btn-primary">
              {t({ en: 'Discuss with a career astrologer', hi: 'करियर ज्योतिषी से चर्चा करें' })}
            </Link>
            <button className="btn btn-ghost" onClick={() => setResult(null)}>
              <RotateCcw size={16} /> {t({ en: 'Edit answers', hi: 'उत्तर बदलें' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

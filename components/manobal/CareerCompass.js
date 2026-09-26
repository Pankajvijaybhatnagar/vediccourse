'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { RIASEC, QUESTIONS, SCALE, GRAHA_CAREERS, SIGN_LORD, LORD_IN_HOUSE } from '@/lib/manobal/career';
import { buildKundli, GRAHAS } from '@/lib/kundli';
import { CITIES } from '@/lib/panchang';
import { SIGNS, localizeSign } from '@/lib/zodiac';
import styles from './tools.module.css';

export default function CareerCompass() {
  const { t, lang } = useLang();
  const [answers, setAnswers] = useState({});
  const [birth, setBirth] = useState({ date: '', time: '', city: 'delhi' });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const answered = Object.keys(answers).length;
  const complete = answered === QUESTIONS.length;

  const compute = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    QUESTIONS.forEach((q, i) => (scores[q.type] += answers[i] ?? 0));
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    let astro = null;
    if (birth.date) {
      const city = CITIES.find((c) => c.id === birth.city);
      const k = buildKundli({ date: birth.date, time: birth.time || '12:00', lat: city.lat, lon: city.lon, tz: city.tz });
      const lagnaIdx = SIGNS.indexOf(k.lagna.sign);
      const tenthIdx = (lagnaIdx + 9) % 12;
      const lordKey = SIGN_LORD[tenthIdx];
      const lord = k.planets.find((pl) => pl.key === lordKey);
      const inTenth = k.planets.filter((pl) => pl.house === 10);
      astro = { tenthSign: SIGNS[tenthIdx], lord, inTenth, timeKnown: !!birth.time };
      // Planets tied to the 10th house nudge the matching interest types.
      [lordKey, ...inTenth.map((pl) => pl.key)].forEach((key) => GRAHA_CAREERS[key].riasec.forEach((r, i) => (scores[r] += i === 0 ? 1.5 : 0.75)));
    }
    const blended = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    setResult({ ranked, blended, astro, max: 9 });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const grahaName = (key) => t(GRAHAS.find((g) => g.key === key).name);
  const topCodes = useMemo(() => result?.blended.slice(0, 3).map(([c]) => c) || [], [result]);

  return (
    <div className={styles.tool}>
      {!result && (
        <>
          <div className={styles.quizHead}>
            <span>
              <Compass size={18} /> {t({ en: 'Part 1 — Your interests', hi: 'भाग 1 — आपकी रुचियाँ' })}
            </span>
            <span className={styles.rounds}>
              {answered}/{QUESTIONS.length}
            </span>
          </div>
          <div className={styles.progressBar} aria-hidden="true">
            <span style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
          </div>
          <ol className={styles.quizList}>
            {QUESTIONS.map((q, i) => (
              <li key={i}>
                <p>{t(q.text)}</p>
                <div className={styles.scale} role="radiogroup" aria-label={t(q.text)}>
                  {SCALE.map((s) => (
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
              <input id="cc-date" type="date" className="input" value={birth.date} onChange={(e) => setBirth((b) => ({ ...b, date: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cc-time">{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
              <input id="cc-time" type="time" className="input" value={birth.time} onChange={(e) => setBirth((b) => ({ ...b, time: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cc-city">{t({ en: 'Place of birth', hi: 'जन्म स्थान' })}</label>
              <select id="cc-city" className="input" value={birth.city} onChange={(e) => setBirth((b) => ({ ...b, city: e.target.value }))}>
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(c.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.toolActions}>
            <button className="btn btn-primary btn-lg" onClick={compute} disabled={!complete}>
              <Compass size={18} /> {t({ en: 'Show my career compass', hi: 'मेरा करियर कम्पास दिखाएँ' })}
            </button>
            {!complete && (
              <span className={styles.toolNote} style={{ margin: 0 }}>
                {t({ en: `Answer all ${QUESTIONS.length} statements to continue.`, hi: `आगे बढ़ने के लिए सभी ${QUESTIONS.length} कथनों का उत्तर दें।` })}
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
                  {RIASEC[code].icon} {t(RIASEC[code].name)}
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
                  {t({ en: '10th house sign', hi: 'दशम भाव की राशि' })}: <b>{localizeSign(result.astro.tenthSign, lang).name}</b> · {t({ en: 'lord', hi: 'स्वामी' })}:{' '}
                  <b>{grahaName(result.astro.lord.key)}</b>
                </li>
                <li>
                  {t({ en: `${grahaName(result.astro.lord.key)} sits in house ${result.astro.lord.house}`, hi: `${grahaName(result.astro.lord.key)} ${result.astro.lord.house}वें भाव में स्थित है` })} — {t(LORD_IN_HOUSE[result.astro.lord.house])}
                </li>
                <li>
                  {t({ en: 'Fields linked to this lord', hi: 'इस स्वामी से जुड़े क्षेत्र' })}: {t(GRAHA_CAREERS[result.astro.lord.key].fields)}
                </li>
                {result.astro.inTenth.length > 0 ? (
                  result.astro.inTenth.map((pl) => (
                    <li key={pl.key}>
                      <b>{grahaName(pl.key)}</b> {t({ en: 'in the 10th house', hi: 'दशम भाव में' })}: {t(GRAHA_CAREERS[pl.key].fields)}
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
                  {RIASEC[code].icon} {t(RIASEC[code].name)}
                </strong>
                <p>{t(RIASEC[code].desc)}</p>
                <div className={styles.tags}>
                  {RIASEC[code].careers[lang].map((c) => (
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

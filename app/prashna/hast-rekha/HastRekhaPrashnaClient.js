'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, Camera, Hand, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import compressImage from '@/lib/compressImage';
import useQuestion from '@/lib/prashna/useQuestion';
import { FINGERS } from '@/lib/prashna/swarAnguli';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

// Which lines and mounts answer which kind of question (Samudrik Shastra).
const TOPIC_LINES = [
  { topic: { en: 'Marriage & love', hi: 'विवाह एवं प्रेम' }, lines: { en: 'Heart line, marriage lines (below the little finger), Venus mount', hi: 'हृदय रेखा, विवाह रेखाएँ (कनिष्ठा के नीचे), शुक्र पर्वत' } },
  { topic: { en: 'Job & career', hi: 'नौकरी एवं करियर' }, lines: { en: 'Fate line, Sun line, Saturn and Jupiter mounts', hi: 'भाग्य रेखा, सूर्य रेखा, शनि व गुरु पर्वत' } },
  { topic: { en: 'Money & business', hi: 'धन एवं व्यापार' }, lines: { en: 'Sun line, Mercury mount, fate line, money triangle', hi: 'सूर्य रेखा, बुध पर्वत, भाग्य रेखा, धन त्रिकोण' } },
  { topic: { en: 'Health', hi: 'स्वास्थ्य' }, lines: { en: 'Life line, health (Mercury) line, colour of the palm', hi: 'जीवन रेखा, स्वास्थ्य (बुध) रेखा, हथेली का रंग' } },
  { topic: { en: 'Education & exams', hi: 'शिक्षा एवं परीक्षा' }, lines: { en: 'Head line, Jupiter and Mercury mounts', hi: 'मस्तिष्क रेखा, गुरु व बुध पर्वत' } },
  { topic: { en: 'Children', hi: 'संतान' }, lines: { en: 'Fine vertical lines on the marriage line, Venus mount', hi: 'विवाह रेखा पर खड़ी सूक्ष्म रेखाएँ, शुक्र पर्वत' } },
  { topic: { en: 'Travel & foreign', hi: 'यात्रा एवं विदेश' }, lines: { en: 'Travel lines on the Moon mount, branches of the life line', hi: 'चंद्र पर्वत पर यात्रा रेखाएँ, जीवन रेखा की शाखाएँ' } },
  { topic: { en: 'Disputes & court', hi: 'विवाद एवं मुकदमा' }, lines: { en: 'Mars mounts, head line, Plain of Mars', hi: 'मंगल पर्वत, मस्तिष्क रेखा, मंगल क्षेत्र' } },
];

// Finger shapes for the Anguli Prashna hand (right hand, palm facing you).
const FINGER_SHAPES = {
  little: { x: 62, y: 96, w: 40, h: 120 },
  ring: { x: 104, y: 56, w: 42, h: 150 },
  middle: { x: 148, y: 44, w: 42, h: 160 },
  index: { x: 192, y: 68, w: 40, h: 140 },
};

function AnguliHand({ picked, onPick, t }) {
  return (
    <svg viewBox="0 0 300 380" className={s.hand} role="group" aria-label={t({ en: 'Hand — tap one finger', hi: 'हाथ — एक अंगुली चुनें' })}>
      <defs>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9c9" />
          <stop offset="1" stopColor="#f6cf98" />
        </linearGradient>
      </defs>
      <path d="M60 196 C58 150 76 150 120 150 L196 150 C232 150 244 170 244 214 C244 290 226 352 150 356 C82 352 62 300 60 196 Z" fill="url(#skinGrad)" stroke="#d9a868" strokeWidth="2" />
      {FINGERS.filter((f) => f.key !== 'thumb').map((f) => {
        const r = FINGER_SHAPES[f.key];
        return (
          <rect
            key={f.key}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            rx={r.w / 2}
            className={`${s.finger} ${picked === f.key ? s.fingerOn : ''}`}
            tabIndex={0}
            role="button"
            aria-label={t(f.name)}
            aria-pressed={picked === f.key}
            onClick={() => onPick(f.key)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onPick(f.key))}
          />
        );
      })}
      <rect
        x="226"
        y="198"
        width="46"
        height="120"
        rx="23"
        transform="rotate(-38 249 258)"
        className={`${s.finger} ${picked === 'thumb' ? s.fingerOn : ''}`}
        tabIndex={0}
        role="button"
        aria-label={t(FINGERS[0].name)}
        aria-pressed={picked === 'thumb'}
        onClick={() => onPick('thumb')}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onPick('thumb'))}
      />
    </svg>
  );
}

export default function HastRekhaPrashnaClient() {
  const { t } = useLang();
  const q = useQuestion();
  const [gender, setGender] = useState('male');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState(null);
  const [finger, setFinger] = useState(null);
  const fileRef = useRef(null);
  const hand = gender === 'female' ? 'left' : 'right';

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setAnswer(null);
    try {
      setPhoto(await compressImage(file));
    } catch {
      setError(t({ en: 'This photo could not be opened. Please try another.', hi: 'यह फ़ोटो खुल नहीं सकी। कृपया दूसरी फ़ोटो आज़माएँ।' }));
    }
  }

  async function ask() {
    if (!q.text.trim()) {
      setError(t({ en: 'Please write your question at the top first.', hi: 'कृपया पहले ऊपर अपना प्रश्न लिखें।' }));
      return;
    }
    if (!photo) {
      setError(t({ en: 'Please add a photo of your palm.', hi: 'कृपया हथेली की फ़ोटो जोड़ें।' }));
      return;
    }
    setLoading(true);
    setError('');
    setAnswer(null);
    try {
      const res = await fetch('/api/prashna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: photo.data, mediaType: photo.mediaType, gender, hand, question: q.text, category: q.category }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'failed');
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message && err.message !== 'failed' ? err.message : t({ en: 'Something went wrong. Please try again.', hi: 'कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।' }));
    } finally {
      setLoading(false);
    }
  }

  const fingerData = FINGERS.find((f) => f.key === finger);

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="hast-rekha" />
      <QuestionBox />

      {/* A. AI palm answer */}
      <section className={s.panel}>
        <StepHead n="A">{t({ en: 'Ask your palm (AI reading of your photo)', hi: 'अपनी हथेली से पूछें (फ़ोटो से AI उत्तर)' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'Upload a clear photo of your main hand. The answer is written for your exact question, from the lines and mounts that govern its topic.',
            hi: 'अपने मुख्य हाथ की साफ़ फ़ोटो अपलोड करें। उत्तर आपके प्रश्न के लिए, उसी विषय की रेखाओं और पर्वतों के आधार पर लिखा जाएगा।',
          })}
        </p>
        <div className={s.two}>
          <div>
            <p className={s.qHint}>{t({ en: 'Whose palm?', hi: 'किसकी हथेली?' })}</p>
            <div className={s.chips}>
              <button type="button" className={`${s.choice} ${gender === 'male' ? s.choiceOn : ''}`} onClick={() => setGender('male')}>
                ♂ {t({ en: 'Man · right hand', hi: 'पुरुष · दायाँ हाथ' })}
              </button>
              <button type="button" className={`${s.choice} ${gender === 'female' ? s.choiceOn : ''}`} onClick={() => setGender('female')}>
                ♀ {t({ en: 'Woman · left hand', hi: 'स्त्री · बायाँ हाथ' })}
              </button>
            </div>
            <ul className={s.ruleList} style={{ marginTop: 14 }}>
              <li>{t({ en: 'Open palm, fingers together, in daylight.', hi: 'खुली हथेली, अंगुलियाँ साथ, दिन की रोशनी में।' })}</li>
              <li>{t({ en: 'Fill the frame with the palm; avoid shadows and blur.', hi: 'फ़्रेम में पूरी हथेली हो; छाया और धुंधलापन न हो।' })}</li>
              <li>{t({ en: 'Your photo is used only to answer and is not stored.', hi: 'फ़ोटो केवल उत्तर हेतु उपयोग होती है, सहेजी नहीं जाती।' })}</li>
            </ul>
          </div>
          <div>
            <label className={s.photoBox}>
              {photo ? (
                <img src={photo.dataUrl} alt={t({ en: 'Your palm photo', hi: 'आपकी हथेली की फ़ोटो' })} />
              ) : (
                <>
                  <Camera size={36} />
                  <strong>{t({ en: `Take or upload a photo of the ${hand} hand`, hi: `${hand === 'left' ? 'बाएँ' : 'दाएँ'} हाथ की फ़ोटो लें या अपलोड करें` })}</strong>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} className="sr-only" />
            </label>
          </div>
        </div>
        {error && (
          <p className={s.error} role="alert" style={{ marginTop: 14 }}>
            <AlertTriangle size={18} /> {error}
          </p>
        )}
        <div className={s.actions}>
          <button type="button" className="btn btn-primary btn-lg" onClick={ask} disabled={loading}>
            {loading ? <span className={s.spinner} aria-hidden="true" /> : <Sparkles size={18} />}
            {loading ? t({ en: 'Reading your palm…', hi: 'हथेली पढ़ी जा रही है…' }) : t({ en: 'Get the answer', hi: 'उत्तर पाएँ' })}
          </button>
          {photo && !loading && (
            <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
              <Camera size={16} /> {t({ en: 'Change photo', hi: 'फ़ोटो बदलें' })}
            </button>
          )}
        </div>
      </section>

      {answer && !answer.is_palm && (
        <p className={s.error} role="alert">
          <AlertTriangle size={18} /> {t(answer.problem) || t({ en: 'Please upload a clear photo of an open palm.', hi: 'कृपया खुली हथेली की साफ़ फ़ोटो अपलोड करें।' })}
        </p>
      )}
      {answer?.is_palm && (
        <VerdictCard verdict={answer.verdict} title={{ en: 'Hast Rekha Prashna', hi: 'हस्त रेखा प्रश्न' }} onReset={() => setAnswer(null)}>
          <p style={{ margin: 0, lineHeight: 1.7 }}>{t(answer.answer)}</p>
          {answer.signs.length > 0 && (
            <div className={s.subGrid}>
              {answer.signs.map((sg, i) => (
                <div key={i} className={s.subCard}>
                  <h3>✋ {t(sg.feature)}</h3>
                  <p>{t(sg.meaning)}</p>
                </div>
              ))}
            </div>
          )}
          <dl className={s.factList}>
            {(answer.timing.en || answer.timing.hi) && (
              <div>
                <dt>{t({ en: 'Timing', hi: 'समय संकेत' })}</dt>
                <dd style={{ fontWeight: 500 }}>{t(answer.timing)}</dd>
              </div>
            )}
            {answer.upay.length > 0 && (
              <div>
                <dt>{t({ en: 'Upay (remedies)', hi: 'उपाय' })}</dt>
                <dd style={{ fontWeight: 500 }}>
                  {answer.upay.map((u, i) => (
                    <span key={i} style={{ display: 'block' }}>• {t(u)}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </VerdictCard>
      )}

      {/* B. Anguli Prashna */}
      <section className={s.panel}>
        <StepHead n="B">{t({ en: 'Anguli Prashna — no photo needed', hi: 'अंगुली प्रश्न — फ़ोटो की आवश्यकता नहीं' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'A folk method of Samudrik tradition: think of your question, close your eyes and touch one finger of your other hand without choosing. Then tap that finger below. Each finger belongs to a planet.',
            hi: 'सामुद्रिक परम्परा की लोक-विधि: प्रश्न सोचें, आँखें बंद करें और बिना चुने दूसरे हाथ की किसी एक अंगुली को छुएँ। फिर नीचे वही अंगुली चुनें। हर अंगुली एक ग्रह की है।',
          })}
        </p>
        <div className={s.two}>
          <AnguliHand picked={finger} onPick={setFinger} t={t} />
          <div>
            <div className={s.chips} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {FINGERS.map((f) => (
                <button key={f.key} type="button" className={`${s.choice} ${finger === f.key ? s.choiceOn : ''}`} onClick={() => setFinger(f.key)}>
                  <Hand size={16} /> {t(f.name)} · <small style={{ fontWeight: 600 }}>{t(f.planet)}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {fingerData && (
        <VerdictCard verdict={fingerData.verdict} title={{ en: `Anguli Prashna · ${fingerData.name.en}`, hi: `अंगुली प्रश्न · ${fingerData.name.hi}` }} onReset={() => setFinger(null)}>
          <p style={{ margin: 0, lineHeight: 1.7 }}>{t(fingerData.text)}</p>
          <dl className={s.factList}>
            <div>
              <dt>{t({ en: 'Planet', hi: 'ग्रह' })}</dt>
              <dd>{t(fingerData.planet)}</dd>
            </div>
            <div>
              <dt>{t({ en: 'Upay', hi: 'उपाय' })}</dt>
              <dd style={{ fontWeight: 500 }}>{t(fingerData.upay)}</dd>
            </div>
          </dl>
        </VerdictCard>
      )}

      {/* C. Reference */}
      <section className={s.panel}>
        <StepHead n="C">{t({ en: 'Which lines answer which question', hi: 'किस प्रश्न का उत्तर कौन-सी रेखा देती है' })}</StepHead>
        <div className={s.tableScroll}>
          <table className={s.typeTable}>
            <thead>
              <tr>
                <th>{t({ en: 'Question about', hi: 'प्रश्न का विषय' })}</th>
                <th>{t({ en: 'Look at', hi: 'क्या देखें' })}</th>
              </tr>
            </thead>
            <tbody>
              {TOPIC_LINES.map((r) => (
                <tr key={r.topic.en}>
                  <td>
                    <strong>{t(r.topic)}</strong>
                  </td>
                  <td>{t(r.lines)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.qNote}>
          {t({ en: 'Want a full reading of every line and mount?', hi: 'सभी रेखाओं और पर्वतों का पूरा विश्लेषण चाहिए?' })}{' '}
          <a href="/palmistry" style={{ color: 'var(--saffron-deep)', fontWeight: 700 }}>
            {t({ en: 'Open AI Palmistry →', hi: 'AI हस्त रेखा खोलें →' })}
          </a>
        </p>
      </section>
      <Disclaimer />
    </div>
  );
}

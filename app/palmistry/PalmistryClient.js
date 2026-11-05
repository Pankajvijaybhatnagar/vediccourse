'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Camera, Hand, Sparkles, Upload } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './palmistry.module.css';

const LINES = [
  ['life', { en: 'Life line', hi: 'जीवन रेखा' }],
  ['head', { en: 'Head line', hi: 'मस्तिष्क रेखा' }],
  ['heart', { en: 'Heart line', hi: 'हृदय रेखा' }],
  ['fate', { en: 'Fate line', hi: 'भाग्य रेखा' }],
  ['sun', { en: 'Sun line', hi: 'सूर्य रेखा' }],
  ['marriage', { en: 'Marriage line', hi: 'विवाह रेखा' }],
  ['health', { en: 'Health (Mercury) line', hi: 'स्वास्थ्य (बुध) रेखा' }],
];

const SHAPES = {
  earth: { en: 'Earth hand', hi: 'पृथ्वी हस्त' },
  air: { en: 'Air hand', hi: 'वायु हस्त' },
  fire: { en: 'Fire hand', hi: 'अग्नि हस्त' },
  water: { en: 'Water hand', hi: 'जल हस्त' },
  unclear: { en: 'Unclear', hi: 'अस्पष्ट' },
};

const PROMINENCE = {
  prominent: { en: 'Prominent', hi: 'उभरा हुआ' },
  normal: { en: 'Normal', hi: 'सामान्य' },
  flat: { en: 'Flat', hi: 'दबा हुआ' },
  unclear: { en: 'Unclear', hi: 'अस्पष्ट' },
};

const HAND = { left: { en: 'Left hand', hi: 'बायाँ हाथ' }, right: { en: 'Right hand', hi: 'दायाँ हाथ' } };
const mainHand = (gender) => (gender === 'female' ? 'left' : 'right');

// Shrink the photo in the browser: phone photos are often 5–12 MB, the API takes 5 MB max,
// and ~1600px keeps the lines sharp enough to read.
function compress(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      resolve({ dataUrl, data: dataUrl.split(',')[1], mediaType: 'image/jpeg' });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable'));
    };
    img.src = url;
  });
}

export default function PalmistryClient() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [hand, setHand] = useState('right');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const fileRef = useRef(null);
  const resultRef = useRef(null);

  // Pre-fill from Kundli Milan links: /palmistry?gender=female&name=Priya
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const g = q.get('gender');
    if (g === 'male' || g === 'female') {
      setGender(g);
      setHand(mainHand(g));
    }
    if (q.get('name')) setName(q.get('name').slice(0, 60));
  }, []);

  const pickGender = (g) => {
    setGender(g);
    setHand(mainHand(g));
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) {
      setError(t({ en: 'Please choose a photo (JPG or PNG).', hi: 'कृपया फ़ोटो (JPG या PNG) चुनें।' }));
      return;
    }
    try {
      setPhoto(await compress(file));
      setReport(null);
    } catch {
      setError(t({ en: 'This photo could not be opened. Please try another one.', hi: 'यह फ़ोटो खुल नहीं सकी, कृपया दूसरी फ़ोटो चुनें।' }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!photo) {
      setError(t({ en: 'Please upload a photo of your palm.', hi: 'कृपया अपनी हथेली की फ़ोटो अपलोड करें।' }));
      return;
    }
    setError('');
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/palmistry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: photo.data, mediaType: photo.mediaType, gender, hand, name }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'failed');
      setReport(json.report);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (err) {
      setError(err.message && err.message !== 'failed' ? err.message : t({ en: 'Palm reading failed. Please try again.', hi: 'हस्त रेखा विश्लेषण नहीं हो सका, कृपया पुनः प्रयास करें।' }));
    } finally {
      setLoading(false);
    }
  };

  const r = report;
  const main = mainHand(gender);

  return (
    <section className={styles.section}>
      <div className="container">
        <form className={`card card-glow ${styles.form}`} onSubmit={submit} noValidate>
          <div className={styles.cols}>
            <div className={styles.details}>
              <div className="field">
                <label htmlFor="palm-name">{t({ en: 'Name (optional)', hi: 'नाम (वैकल्पिक)' })}</label>
                <input id="palm-name" className="input" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder={t({ en: 'e.g. Priya Sharma', hi: 'जैसे: प्रिया शर्मा' })} />
              </div>

              <div className="field">
                <span className={styles.label}>{t({ en: 'Whose palm?', hi: 'किसकी हथेली?' })}</span>
                <div className={styles.toggle} role="radiogroup">
                  {[
                    ['male', { en: '♂ Male / Boy', hi: '♂ पुरुष / वर' }],
                    ['female', { en: '♀ Female / Girl', hi: '♀ स्त्री / कन्या' }],
                  ].map(([g, label]) => (
                    <button type="button" key={g} role="radio" aria-checked={gender === g} className={gender === g ? styles.on : ''} onClick={() => pickGender(g)}>
                      {t(label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.whichHand}>
                <Hand size={22} className={main === 'left' ? styles.flip : ''} />
                <p>
                  <strong>{t({ en: `Show the ${main.toUpperCase()} hand`, hi: main === 'left' ? 'बायाँ हाथ दिखाएँ' : 'दायाँ हाथ दिखाएँ' })}</strong>
                  {t({
                    en: ' In Samudrik Shastra a man’s right hand and a woman’s left hand are read as the main hand: it shows what is unfolding in this life.',
                    hi: ' सामुद्रिक शास्त्र के अनुसार पुरुष का दायाँ और स्त्री का बायाँ हाथ मुख्य माना जाता है, जो इस जीवन में चल रहे भाग्य को दर्शाता है।',
                  })}
                </p>
              </div>

              <div className="field">
                <span className={styles.label}>{t({ en: 'Hand in the photo', hi: 'फ़ोटो में कौन-सा हाथ' })}</span>
                <div className={styles.toggle} role="radiogroup">
                  {['right', 'left'].map((h) => (
                    <button type="button" key={h} role="radio" aria-checked={hand === h} className={hand === h ? styles.on : ''} onClick={() => setHand(h)}>
                      {t(HAND[h])}
                      {h === main && <small> · {t({ en: 'main', hi: 'मुख्य' })}</small>}
                    </button>
                  ))}
                </div>
              </div>

              <ul className={styles.tips}>
                <li>{t({ en: 'Open the palm fully, fingers slightly apart.', hi: 'हथेली पूरी खोलें, उंगलियाँ थोड़ी अलग रखें।' })}</li>
                <li>{t({ en: 'Use daylight or bright light, no flash glare.', hi: 'दिन की रोशनी या तेज़ रोशनी में लें, फ़्लैश की चमक न हो।' })}</li>
                <li>{t({ en: 'Whole palm and wrist in the frame, in focus.', hi: 'पूरी हथेली और कलाई फ़्रेम में और साफ़ हो।' })}</li>
              </ul>
            </div>

            <div className={styles.uploadCol}>
              <button type="button" className={`${styles.drop} ${photo ? styles.hasPhoto : ''}`} onClick={() => fileRef.current?.click()}>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.dataUrl} alt={t({ en: 'Your palm photo', hi: 'आपकी हथेली की फ़ोटो' })} />
                ) : (
                  <span className={styles.dropInner}>
                    <Upload size={34} />
                    <strong>{t({ en: 'Upload palm photo', hi: 'हथेली की फ़ोटो अपलोड करें' })}</strong>
                    <small>{t({ en: 'Tap to take a photo or choose from gallery', hi: 'फ़ोटो खींचने या गैलरी से चुनने के लिए टैप करें' })}</small>
                  </span>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={onFile} />
              {photo && (
                <button type="button" className={styles.change} onClick={() => fileRef.current?.click()}>
                  <Camera size={16} /> {t({ en: 'Change photo', hi: 'फ़ोटो बदलें' })}
                </button>
              )}
            </div>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              <AlertTriangle size={18} /> {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> {t({ en: 'Reading your palm… (up to a minute)', hi: 'हस्त रेखा पढ़ी जा रही है… (एक मिनट तक)' })}
              </>
            ) : (
              <>
                <Sparkles size={18} /> {t({ en: 'Read my palm with AI', hi: 'AI से हस्त रेखा पढ़ें' })}
              </>
            )}
          </button>
        </form>

        {r && (
          <div ref={resultRef} className={styles.result}>
            {!r.is_palm ? (
              <div className={`card ${styles.notPalm}`}>
                <AlertTriangle size={22} />
                <div>
                  <h3>{t({ en: 'We couldn’t read this photo', hi: 'यह फ़ोटो पढ़ी नहीं जा सकी' })}</h3>
                  <p>{t(r.problem)}</p>
                </div>
              </div>
            ) : (
              <>
                <div className={`card card-glow ${styles.summary} fade-up`}>
                  <span className="eyebrow">{t({ en: 'Hast Rekha reading', hi: 'हस्त रेखा विश्लेषण' })}</span>
                  <h2>
                    {name.trim() ? `${name.trim()} · ` : ''}
                    {t(HAND[hand])}
                  </h2>
                  <p>{t(r.summary)}</p>
                  <div className={styles.chips}>
                    <span>
                      {t({ en: 'Hand type', hi: 'हस्त प्रकार' })}: <strong>{t(SHAPES[r.hand_shape.type] || SHAPES.unclear)}</strong>
                    </span>
                    <span>
                      {t({ en: 'Photo quality', hi: 'फ़ोटो गुणवत्ता' })}: <strong>{r.photo_quality}</strong>
                    </span>
                  </div>
                  {(r.photo_quality === 'poor' || (r.hand_detected !== 'unclear' && r.hand_detected !== hand)) && (
                    <p className={styles.warn}>
                      <AlertTriangle size={16} />
                      {r.hand_detected !== 'unclear' && r.hand_detected !== hand
                        ? t({ en: `The photo looks like the ${r.hand_detected} hand, not the ${hand}. You may want to check and re-upload.`, hi: `फ़ोटो ${r.hand_detected === 'left' ? 'बाएँ' : 'दाएँ'} हाथ की लगती है। कृपया जाँच कर दोबारा अपलोड करें।` })
                        : (r.problem?.en && t(r.problem)) || t({ en: 'The photo is unclear, so some details may be missed.', hi: 'फ़ोटो साफ़ नहीं है, इसलिए कुछ विवरण छूट सकते हैं।' })}
                    </p>
                  )}
                </div>

                <div className={`card ${styles.block} fade-up`}>
                  <h3>{t({ en: 'Hand shape', hi: 'हाथ की बनावट' })}</h3>
                  <p className={styles.obs}>{t(r.hand_shape.description)}</p>
                  <p>{t(r.hand_shape.meaning)}</p>
                </div>

                <div className={styles.lineGrid}>
                  {LINES.map(([key, label]) => {
                    const l = r.lines[key];
                    return (
                      <div key={key} className={`card ${styles.lineCard} ${l.seen ? '' : styles.unseen} fade-up`}>
                        <h4>
                          {t(label)}
                          {!l.seen && <em>{t({ en: 'not clear', hi: 'स्पष्ट नहीं' })}</em>}
                        </h4>
                        <p className={styles.obs}>{t(l.description)}</p>
                        <p>{t(l.meaning)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.twoCol}>
                  <div className={`card ${styles.block} fade-up`}>
                    <h3>{t({ en: 'Mounts (Parvat)', hi: 'पर्वत' })}</h3>
                    <ul className={styles.mounts}>
                      {r.mounts.map((m) => (
                        <li key={m.name.en}>
                          <div>
                            <strong>{t(m.name)}</strong>
                            <span className={styles[`p_${m.prominence}`]}>{t(PROMINENCE[m.prominence] || PROMINENCE.unclear)}</span>
                          </div>
                          <p>{t(m.meaning)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`card ${styles.block} fade-up`}>
                    <h3>{t({ en: 'Special signs', hi: 'विशेष चिह्न' })}</h3>
                    {r.special_signs.length === 0 ? (
                      <p className={styles.obs}>{t({ en: 'No distinct special signs were visible in this photo.', hi: 'इस फ़ोटो में कोई विशेष चिह्न स्पष्ट नहीं दिखा।' })}</p>
                    ) : (
                      <ul className={styles.signs}>
                        {r.special_signs.map((s, i) => (
                          <li key={i}>
                            <strong>{t(s.sign)}</strong> <small>({t(s.location)})</small>
                            <p>{t(s.meaning)}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className={`card ${styles.block} fade-up`}>
                  <h3>{t({ en: 'Life areas', hi: 'जीवन के क्षेत्र' })}</h3>
                  <div className={styles.areas}>
                    {r.life_areas.map((a) => (
                      <div key={a.title.en}>
                        <strong>{t(a.title)}</strong>
                        <p>{t(a.text)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.threeCol}>
                  {[
                    ['strengths', { en: 'Strengths', hi: 'शक्तियाँ' }, styles.good],
                    ['cautions', { en: 'Things to watch', hi: 'सावधानियाँ' }, styles.caution],
                    ['remedies', { en: 'Remedies (Upay)', hi: 'उपाय' }, styles.remedy],
                  ].map(([key, label, cls]) => (
                    <div key={key} className={`card ${styles.block} ${cls} fade-up`}>
                      <h3>{t(label)}</h3>
                      <ul>
                        {r[key].map((x, i) => (
                          <li key={i}>{t(x)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className={styles.disclaimer}>
                  {t({
                    en: 'This AI reading is based on traditional palmistry and is meant for guidance and reflection only. It is not medical, legal or financial advice. Your photo is sent for analysis and is not stored on our site.',
                    hi: 'यह AI विश्लेषण पारंपरिक हस्त रेखा शास्त्र पर आधारित है और केवल मार्गदर्शन के लिए है। यह चिकित्सा, कानूनी या वित्तीय सलाह नहीं है। आपकी फ़ोटो केवल विश्लेषण के लिए भेजी जाती है, हमारी साइट पर संग्रहीत नहीं होती।',
                  })}
                </p>

                <div className={styles.cta}>
                  <div>
                    <strong>{t({ en: 'Want a deeper reading?', hi: 'और गहराई से जानना चाहते हैं?' })}</strong>
                    <span>{t({ en: 'An astrologer can read both hands together with your kundli.', hi: 'ज्योतिषी आपकी कुंडली के साथ दोनों हाथों का विश्लेषण कर सकते हैं।' })}</span>
                  </div>
                  <Link href="/astrologers" className="btn btn-primary">
                    {t({ en: 'Talk to Astrologer', hi: 'ज्योतिषी से बात करें' })}
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

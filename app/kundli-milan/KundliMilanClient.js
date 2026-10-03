'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import { localizeSign } from '@/lib/zodiac';
import { buildKundli, GRAHAS } from '@/lib/kundli';
import { CITIES } from '@/lib/panchang';
import { kundliMilan, KOOTA_INFO } from '@/lib/milan';
import { useLang } from '@/lib/i18n';
import BirthPlacePicker from '@/components/BirthPlacePicker';
import styles from './milan.module.css';

const ABROAD = CITIES.filter((c) => c.tz !== 5.5);
const EMPTY = { name: '', date: '', time: '', country: 'india', city: ABROAD[0].id, lat: '', lon: '', tz: '5.5' };

const fmtDeg = (d) => `${Math.floor(d)}° ${String(Math.floor((d % 1) * 60)).padStart(2, '0')}′`;
const fmtPts = (n) => (Number.isInteger(n) ? n : n.toFixed(1));

function validate(form, indiaPlace) {
  const e = {};
  if (!form.name.trim()) e.name = { en: 'Please enter the name.', hi: 'कृपया नाम दर्ज करें।' };
  if (!form.date) e.date = { en: 'Please enter the birth date.', hi: 'कृपया जन्म तिथि दर्ज करें।' };
  else if (+form.date.slice(0, 4) < 1900 || +form.date.slice(0, 4) > 2050) e.date = { en: 'Please enter a year between 1900 and 2050.', hi: 'कृपया 1900 से 2050 के बीच का वर्ष दर्ज करें।' };
  else if (new Date(form.date) > new Date()) e.date = { en: 'Birth date cannot be in the future.', hi: 'जन्म तिथि भविष्य की नहीं हो सकती।' };
  if (!form.time) e.time = { en: 'Birth time is needed for an accurate Nakshatra and Manglik check.', hi: 'सटीक नक्षत्र और मांगलिक जाँच के लिए जन्म समय आवश्यक है।' };

  let place;
  if (form.country === 'india') {
    place = indiaPlace;
    if (!place) e.place = { en: 'Please select the birth state and district.', hi: 'कृपया जन्म का राज्य और ज़िला चुनें।' };
  } else if (form.city === 'other') {
    const lat = parseFloat(form.lat);
    const lon = parseFloat(form.lon);
    if (!(Math.abs(lat) <= 66)) e.lat = { en: 'Latitude must be between -66 and 66.', hi: 'अक्षांश -66 से 66 के बीच हो।' };
    if (!(Math.abs(lon) <= 180)) e.lon = { en: 'Longitude must be between -180 and 180.', hi: 'देशांतर -180 से 180 के बीच हो।' };
    place = { lat, lon, tz: parseFloat(form.tz) || 0, name: { en: `${lat}, ${lon}`, hi: `${lat}, ${lon}` } };
  } else {
    place = CITIES.find((c) => c.id === form.city);
  }
  return { errors: e, place };
}

function PersonForm({ role, form, setForm, errors, setErrors, onIndiaPlace }) {
  const { t } = useLang();
  const id = (k) => `${role}-${k}`;
  const isBoy = role === 'boy';
  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  return (
    <fieldset className={`${styles.person} ${isBoy ? styles.boy : styles.girl}`}>
      <legend>
        <span className={styles.roleIcon} aria-hidden="true">{isBoy ? '♂' : '♀'}</span>
        {isBoy ? t({ en: "Boy's details (Var)", hi: 'वर का विवरण' }) : t({ en: "Girl's details (Kanya)", hi: 'कन्या का विवरण' })}
      </legend>
      <div className={styles.fields}>
        <div className={`field ${styles.full}`}>
          <label htmlFor={id('name')}>{t({ en: 'Full name', hi: 'पूरा नाम' })}</label>
          <input id={id('name')} className={`input ${errors.name ? 'invalid' : ''}`} value={form.name} onChange={update('name')} placeholder={isBoy ? t({ en: 'e.g. Rohan Verma', hi: 'जैसे: रोहन वर्मा' }) : t({ en: 'e.g. Priya Sharma', hi: 'जैसे: प्रिया शर्मा' })} />
          {errors.name && <span className="error-text">{t(errors.name)}</span>}
        </div>
        <div className="field">
          <label htmlFor={id('date')}>{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
          <input id={id('date')} type="date" className={`input ${errors.date ? 'invalid' : ''}`} value={form.date} onChange={update('date')} />
          {errors.date && <span className="error-text">{t(errors.date)}</span>}
        </div>
        <div className="field">
          <label htmlFor={id('time')}>{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
          <input id={id('time')} type="time" className={`input ${errors.time ? 'invalid' : ''}`} value={form.time} onChange={update('time')} />
          {errors.time && <span className="error-text">{t(errors.time)}</span>}
        </div>
        <div className={`field ${styles.full}`}>
          <label htmlFor={id('country')}>{t({ en: 'Place of birth', hi: 'जन्म स्थान' })}</label>
          <select id={id('country')} className="input" value={form.country} onChange={update('country')}>
            <option value="india">{t({ en: 'India', hi: 'भारत' })}</option>
            <option value="abroad">{t({ en: 'Outside India', hi: 'भारत के बाहर' })}</option>
          </select>
        </div>
        {form.country === 'india' ? (
          <BirthPlacePicker idPrefix={`${role}-bp`} onChange={onIndiaPlace} error={errors.place} />
        ) : (
          <div className={`field ${styles.full}`}>
            <label htmlFor={id('city')}>{t({ en: 'City', hi: 'शहर' })}</label>
            <select id={id('city')} className="input" value={form.city} onChange={update('city')}>
              {ABROAD.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
              <option value="other">{t({ en: 'Other (enter coordinates)', hi: 'अन्य (निर्देशांक दर्ज करें)' })}</option>
            </select>
          </div>
        )}
        {form.country === 'abroad' && form.city === 'other' && (
          <>
            <div className="field">
              <label htmlFor={id('lat')}>{t({ en: 'Latitude (N +)', hi: 'अक्षांश (उत्तर +)' })}</label>
              <input id={id('lat')} inputMode="decimal" className={`input ${errors.lat ? 'invalid' : ''}`} placeholder="51.50" value={form.lat} onChange={update('lat')} />
              {errors.lat && <span className="error-text">{t(errors.lat)}</span>}
            </div>
            <div className="field">
              <label htmlFor={id('lon')}>{t({ en: 'Longitude (E +)', hi: 'देशांतर (पूर्व +)' })}</label>
              <input id={id('lon')} inputMode="decimal" className={`input ${errors.lon ? 'invalid' : ''}`} placeholder="-0.12" value={form.lon} onChange={update('lon')} />
              {errors.lon && <span className="error-text">{t(errors.lon)}</span>}
            </div>
            <div className={`field ${styles.full}`}>
              <label htmlFor={id('tz')}>{t({ en: 'UTC offset at birth (hours)', hi: 'जन्म के समय UTC अंतर (घंटे)' })}</label>
              <input id={id('tz')} inputMode="decimal" className="input" placeholder="0" value={form.tz} onChange={update('tz')} />
            </div>
          </>
        )}
      </div>
    </fieldset>
  );
}

function GunaRing({ value }) {
  const { t } = useLang();
  const [display, setDisplay] = useState(0);
  const r = 88;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const k = Math.min((now - start) / 1400, 1);
      setDisplay((1 - Math.pow(1 - k, 3)) * value);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="milanGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd65a" />
            <stop offset="0.6" stopColor="#f6a609" />
            <stop offset="1" stopColor="#ef4b3f" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} fill="none" stroke="#f5ecd6" strokeWidth="12" />
        <circle cx="100" cy="100" r={r} fill="none" stroke="url(#milanGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (circ * display) / 36} transform="rotate(-90 100 100)" />
        <line x1="100" y1="4" x2="100" y2="20" stroke="#8b1e1e" strokeWidth="2" transform={`rotate(${(18 / 36) * 360} 100 100)`} />
      </svg>
      <div className={styles.ringValue}>
        <strong className="gold-text">{fmtPts(Math.round(display * 2) / 2)}</strong>
        <span>{t({ en: 'of 36 gunas', hi: '36 में से गुण' })}</span>
      </div>
    </div>
  );
}

function MoonCard({ role, name, info, kundli }) {
  const { t, lang } = useLang();
  const rashi = localizeSign(info.rashi, lang);
  const lagna = localizeSign(kundli.lagna.sign, lang);
  const lord = GRAHAS.find((g) => g.key === info.lord).name;
  return (
    <div className={`card ${styles.moonCard} ${role === 'boy' ? styles.boy : styles.girl}`}>
      <span className={styles.moonRole}>{role === 'boy' ? t({ en: 'Boy · Var', hi: 'वर' }) : t({ en: 'Girl · Kanya', hi: 'कन्या' })}</span>
      <h3>{name}</h3>
      <dl>
        <div>
          <dt>{t({ en: 'Rashi (Moon sign)', hi: 'राशि (चंद्र)' })}</dt>
          <dd>
            <span className="glyph">{rashi.glyph}</span> {rashi.name}
          </dd>
        </div>
        <div>
          <dt>{t({ en: 'Nakshatra', hi: 'नक्षत्र' })}</dt>
          <dd>
            {t(info.nakshatra)} · {t({ en: 'Pada', hi: 'चरण' })} {info.pada}
          </dd>
        </div>
        <div>
          <dt>{t({ en: 'Moon position', hi: 'चंद्र स्पष्ट' })}</dt>
          <dd>{fmtDeg(info.lon % 30)}</dd>
        </div>
        <div>
          <dt>{t({ en: 'Rashi lord', hi: 'राशि स्वामी' })}</dt>
          <dd>{t(lord)}</dd>
        </div>
        <div>
          <dt>{t({ en: 'Lagna', hi: 'लग्न' })}</dt>
          <dd>{lagna.name}</dd>
        </div>
      </dl>
    </div>
  );
}

const houseLabel = (n, t) => t({ en: `${n}${['th', 'st', 'nd', 'rd'][n % 10 > 3 || [11, 12, 13].includes(n) ? 0 : n % 10]}`, hi: `${n}वें` });

function ManglikPerson({ label, data }) {
  const { t, lang } = useLang();
  const sign = localizeSign(data.marsSign, lang);
  const status = !data.present ? 'none' : data.effective ? 'yes' : 'cancelled';
  return (
    <div className={`${styles.mPerson} ${styles['m_' + status]}`}>
      <strong>{t(label)}</strong>
      <span className={styles.mStatus}>
        {status === 'none' && t({ en: 'Not Manglik', hi: 'मांगलिक नहीं' })}
        {status === 'yes' && (data.strength === 'full' ? t({ en: 'Manglik', hi: 'मांगलिक' }) : t({ en: 'Manglik (partial)', hi: 'आंशिक मांगलिक' }))}
        {status === 'cancelled' && t({ en: 'Manglik — cancelled', hi: 'मांगलिक — परिहार' })}
      </span>
      <ul>
        <li>{t({ en: `Mars in ${sign.name}`, hi: `मंगल ${sign.name} राशि में` })}</li>
        <li>{t({ en: `${houseLabel(data.fromLagna, t)} house from Lagna`, hi: `लग्न से ${data.fromLagna}वें भाव में` })}</li>
        <li>{t({ en: `${houseLabel(data.fromMoon, t)} house from Moon`, hi: `चंद्र से ${data.fromMoon}वें भाव में` })}</li>
        {data.cancel.map((c) => (
          <li key={c.en} className={styles.mCancel}>
            ✓ {t(c)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KundliMilanClient() {
  const { t, lang } = useLang();
  const [boy, setBoy] = useState(EMPTY);
  const [girl, setGirl] = useState(EMPTY);
  const [boyErr, setBoyErr] = useState({});
  const [girlErr, setGirlErr] = useState({});
  const [boyPlace, setBoyPlace] = useState(null);
  const [girlPlace, setGirlPlace] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const onBoyPlace = useCallback((pl) => {
    setBoyPlace(pl);
    if (pl) setBoyErr((e) => ({ ...e, place: undefined }));
  }, []);
  const onGirlPlace = useCallback((pl) => {
    setGirlPlace(pl);
    if (pl) setGirlErr((e) => ({ ...e, place: undefined }));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const b = validate(boy, boyPlace);
    const g = validate(girl, girlPlace);
    setBoyErr(b.errors);
    setGirlErr(g.errors);
    if (Object.keys(b.errors).length || Object.keys(g.errors).length) return;

    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const kb = buildKundli({ date: boy.date, time: boy.time, lat: b.place.lat, lon: b.place.lon, tz: b.place.tz });
      const kg = buildKundli({ date: girl.date, time: girl.time, lat: g.place.lat, lon: g.place.lon, tz: g.place.tz });
      setResult({ milan: kundliMilan(kb, kg), kb, kg, boyName: boy.name.trim(), girlName: girl.name.trim() });
      setLoading(false);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }, 600);
  };

  const m = result?.milan;
  const val = (v) => (v?.slug ? localizeSign(v, lang).name : t(v));

  return (
    <section className={styles.section}>
      <div className="container">
        <form className={`card card-glow ${styles.form}`} onSubmit={submit} noValidate>
          <div className={styles.people}>
            <PersonForm role="boy" form={boy} setForm={setBoy} errors={boyErr} setErrors={setBoyErr} onIndiaPlace={onBoyPlace} />
            <PersonForm role="girl" form={girl} setForm={setGirl} errors={girlErr} setErrors={setGirlErr} onIndiaPlace={onGirlPlace} />
          </div>
          <p className={styles.hint}>
            {t({
              en: 'Guna Milan is based on the Moon’s exact Nakshatra, which changes roughly every 24 hours, so enter the birth time as accurately as possible.',
              hi: 'गुण मिलान चंद्रमा के सटीक नक्षत्र पर आधारित है, जो लगभग हर 24 घंटे में बदलता है, इसलिए जन्म समय यथासंभव सही भरें।',
            })}
          </p>
          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> {t({ en: 'Matching both kundlis…', hi: 'दोनों कुंडलियों का मिलान हो रहा है…' })}
              </>
            ) : (
              `✦ ${t({ en: 'Match Kundli (Guna Milan)', hi: 'कुंडली मिलान करें (गुण मिलान)' })}`
            )}
          </button>
        </form>

        {m && (
          <div ref={resultRef} className={styles.result}>
            <div className={`${styles.summary} ${styles['tone_' + m.verdict.tone]} fade-up`}>
              <GunaRing value={m.total} />
              <div className={styles.summaryText}>
                <span className="eyebrow">{t({ en: 'Ashtakoot Guna Milan', hi: 'अष्टकूट गुण मिलान' })}</span>
                <p className={styles.couple}>
                  {result.boyName} <span className={styles.heart}>♥</span> {result.girlName}
                </p>
                <h2>{t(m.verdict.title)}</h2>
                <p>{t(m.verdict.text)}</p>
                <span className={`${styles.badge} ${m.recommended ? styles.badgeGood : styles.badgeWarn}`}>
                  {m.recommended ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  {m.recommended
                    ? t({ en: 'Recommended: gunas ≥ 18, no major dosha, Manglik compatible', hi: 'अनुशंसित: गुण ≥ 18, कोई प्रमुख दोष नहीं, मांगलिक अनुकूल' })
                    : t({ en: 'Needs attention: see the doshas and Manglik check below', hi: 'ध्यान दें: नीचे दिए दोष और मांगलिक जाँच देखें' })}
                </span>
              </div>
            </div>

            {m.nearEdge && (
              <div className={`${styles.notice} fade-up`}>
                <AlertTriangle size={18} />
                <span>
                  {t({
                    en: 'The Moon is very close to a Nakshatra or Rashi boundary in at least one chart. A birth-time error of even 20–30 minutes could change the result, so please double-check the birth time.',
                    hi: 'कम से कम एक कुंडली में चंद्रमा नक्षत्र या राशि की सीमा के बहुत निकट है। जन्म समय में 20–30 मिनट की त्रुटि भी परिणाम बदल सकती है, कृपया जन्म समय दोबारा जाँचें।',
                  })}
                </span>
              </div>
            )}

            <div className={styles.moonGrid}>
              <MoonCard role="boy" name={result.boyName} info={m.boy} kundli={result.kb} />
              <MoonCard role="girl" name={result.girlName} info={m.girl} kundli={result.kg} />
            </div>

            <div className={`card ${styles.tableCard} fade-up`}>
              <h3>{t({ en: 'Ashtakoot table (8 kootas)', hi: 'अष्टकूट सारणी (8 कूट)' })}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t({ en: 'Koota', hi: 'कूट' })}</th>
                      <th>{t({ en: 'Boy', hi: 'वर' })}</th>
                      <th>{t({ en: 'Girl', hi: 'कन्या' })}</th>
                      <th>{t({ en: 'Max', hi: 'अधिकतम' })}</th>
                      <th>{t({ en: 'Obtained', hi: 'प्राप्त' })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {m.kootas.map((k) => {
                      const info = KOOTA_INFO[k.key];
                      const ratio = k.score / k.max;
                      return (
                        <tr key={k.key}>
                          <td>
                            <strong>{t(info.name)}</strong>
                            <small>{t(info.area)}</small>
                          </td>
                          <td>{val(k.boy)}</td>
                          <td>{val(k.girl)}</td>
                          <td>{k.max}</td>
                          <td>
                            <span className={`${styles.pts} ${ratio >= 0.75 ? styles.ptsGood : ratio > 0 ? styles.ptsMid : styles.ptsBad}`}>{fmtPts(k.score)}</span>
                            <span className={styles.bar}>
                              <span style={{ width: `${ratio * 100}%` }} />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>{t({ en: 'Total gunas', hi: 'कुल गुण' })}</td>
                      <td>36</td>
                      <td>
                        <strong className="gold-text">{fmtPts(m.total)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className={styles.tableNote}>
                {t({
                  en: `Bhakoot: ${m.kootas[6].pair.en}. Graha Maitri: boy's lord sees the girl's as ${m.kootas[4].relation.boyToGirl.en.toLowerCase()}, girl's lord sees the boy's as ${m.kootas[4].relation.girlToBoy.en.toLowerCase()}.`,
                  hi: `भकूट: ${m.kootas[6].pair.hi}। ग्रह मैत्री: वर का राशि स्वामी कन्या के स्वामी को ${m.kootas[4].relation.boyToGirl.hi} और कन्या का स्वामी वर के स्वामी को ${m.kootas[4].relation.girlToBoy.hi} मानता है।`,
                })}
              </p>
            </div>

            <div className={styles.twoCol}>
              <div className={`card fade-up ${styles.doshaCard}`}>
                <h3>{t({ en: 'Doshas & exceptions', hi: 'दोष एवं परिहार' })}</h3>
                {m.doshas.length === 0 ? (
                  <p className={styles.allClear}>
                    <ShieldCheck size={20} /> {t({ en: 'No Nadi, Bhakoot, Gana or Vedha dosha.', hi: 'कोई नाड़ी, भकूट, गण या वेध दोष नहीं है।' })}
                  </p>
                ) : (
                  <ul className={styles.doshaList}>
                    {m.doshas.map((d) => (
                      <li key={d.key} className={d.cancelled ? styles.dCancelled : styles.dActive}>
                        <div className={styles.dHead}>
                          {d.cancelled ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                          <strong>{t(d.name)}</strong>
                          <em>{d.cancelled ? t({ en: 'Cancelled', hi: 'परिहार हुआ' }) : t({ en: 'Present', hi: 'उपस्थित' })}</em>
                        </div>
                        <p>{t(d.text)}</p>
                        {d.cancel.length > 0 && (
                          <ul>
                            {d.cancel.map((c) => (
                              <li key={c.en}>✓ {t(c)}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={`card fade-up ${styles.manglikCard}`}>
                <h3>{t({ en: 'Manglik (Mangal) dosha', hi: 'मांगलिक (मंगल) दोष' })}</h3>
                <div className={styles.mGrid}>
                  <ManglikPerson label={{ en: `Boy · ${result.boyName}`, hi: `वर · ${result.boyName}` }} data={m.manglik.boy} />
                  <ManglikPerson label={{ en: `Girl · ${result.girlName}`, hi: `कन्या · ${result.girlName}` }} data={m.manglik.girl} />
                </div>
                <p className={`${styles.mVerdict} ${m.manglik.status === 'ok' ? styles.mOk : styles.mBad}`}>
                  {m.manglik.status === 'ok' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  <span>{t(m.manglik.text)}</span>
                </p>
                <p className={styles.small}>
                  {t({
                    en: 'Checked from both Lagna and Moon. Mars in the 1st, 2nd, 4th, 7th, 8th or 12th house forms Mangal dosha.',
                    hi: 'लग्न और चंद्र दोनों से जाँचा गया। मंगल 1, 2, 4, 7, 8 या 12वें भाव में हो तो मंगल दोष बनता है।',
                  })}
                </p>
              </div>
            </div>

            <div className={`card fade-up ${styles.explain}`}>
              <h3>{t({ en: 'What each koota means', hi: 'प्रत्येक कूट का अर्थ' })}</h3>
              <div className={styles.explainGrid}>
                {m.kootas.map((k) => (
                  <div key={k.key}>
                    <strong>
                      {t(KOOTA_INFO[k.key].name)} <small>({k.max})</small>
                    </strong>
                    <p>{t(KOOTA_INFO[k.key].about)}</p>
                  </div>
                ))}
              </div>
              <p className={styles.method}>
                {t({
                  en: 'Method: sidereal Moon (Lahiri ayanamsa) computed with the full Meeus lunar theory; standard North Indian Ashtakoot tables. Scores follow the classical rules; regional traditions differ slightly on a few exceptions.',
                  hi: 'पद्धति: निरयन चंद्र (लाहिड़ी अयनांश), पूर्ण मीयस चंद्र सिद्धांत से गणना; उत्तर भारतीय अष्टकूट की मानक सारणियाँ। अंक शास्त्रीय नियमों के अनुसार हैं; कुछ परिहारों पर क्षेत्रीय परंपराओं में थोड़ा अंतर हो सकता है।',
                })}
              </p>
            </div>

            <div className={`${styles.cta} fade-up`}>
              <div>
                <strong>{t({ en: 'Discuss this match with an expert', hi: 'इस मिलान पर विशेषज्ञ से चर्चा करें' })}</strong>
                <span>{t({ en: 'A full reading also looks at the 7th house, Navamsa, dashas and remedies for any dosha.', hi: 'विस्तृत विश्लेषण में सप्तम भाव, नवांश, दशा और दोषों के उपाय भी देखे जाते हैं।' })}</span>
              </div>
              <Link href="/astrologers?focus=marriage" className="btn btn-primary">
                {t({ en: 'Talk to Astrologer', hi: 'ज्योतिषी से बात करें' })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

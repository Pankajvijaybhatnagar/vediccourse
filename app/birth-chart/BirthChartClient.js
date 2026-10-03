'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookmarkPlus, Check, MapPin, UserRound } from 'lucide-react';
import { SIGNS, localizeSign } from '@/lib/zodiac';
import { GRAHAS } from '@/lib/kundli';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import BirthPlacePicker from '@/components/BirthPlacePicker';
import useApiQuery from '@/components/astro/useApiQuery';
import { ErrorState, Loading } from '@/components/astro/States';
import Phaladesh from './Phaladesh';
import { chartFromApi, placePayload } from './kundliAdapter';
import styles from './birthchart.module.css';

// House label anchors for the North Indian diamond chart (400×400).
const HOUSES = {
  1: [200, 100], 2: [100, 42], 3: [42, 100], 4: [100, 200], 5: [42, 300], 6: [100, 358],
  7: [200, 300], 8: [300, 358], 9: [358, 300], 10: [300, 200], 11: [358, 100], 12: [300, 42],
};
// Where each house's sign number sits (toward the chart centre).
const SIGN_NUM = {
  1: [200, 170], 2: [100, 80], 3: [80, 100], 4: [170, 200], 5: [80, 300], 6: [100, 320],
  7: [200, 230], 8: [300, 320], 9: [320, 300], 10: [230, 200], 11: [320, 100], 12: [300, 80],
};

function NorthIndianChart({ kundli }) {
  const { t } = useLang();
  const lagnaIdx = SIGNS.indexOf(kundli.lagna.sign);
  const byHouse = {};
  kundli.planets.forEach((pl) => (byHouse[pl.house] ||= []).push(pl));

  return (
    <svg viewBox="-4 -4 408 408" className={styles.chart} role="img" aria-label={t({ en: 'Lagna chart', hi: 'लग्न कुंडली' })}>
      <rect x="0" y="0" width="400" height="400" rx="6" fill="#fffaf0" stroke="#c9a66b" strokeWidth="2" />
      <path d="M0 0 L400 400 M400 0 L0 400" stroke="#c9a66b" strokeWidth="1.5" />
      <path d="M200 0 L400 200 L200 400 L0 200 Z" fill="none" stroke="#c9a66b" strokeWidth="1.5" />
      <path d="M200 0 L300 100 L200 200 L100 100 Z" fill="rgba(255,194,26,0.14)" />
      {Object.entries(SIGN_NUM).map(([house, [x, y]]) => (
        <text key={house} x={x} y={y} textAnchor="middle" dominantBaseline="central" className={styles.signNum}>
          {((lagnaIdx + Number(house) - 1) % 12) + 1}
        </text>
      ))}
      <text x="200" y="130" textAnchor="middle" className={styles.ascLabel}>
        {t({ en: 'Asc', hi: 'लग्न' })}
      </text>
      {Object.entries(HOUSES).map(([house, [x, y]]) => {
        const list = byHouse[house] || [];
        const lines = [];
        for (let i = 0; i < list.length; i += 3) lines.push(list.slice(i, i + 3));
        return (
          <text key={house} x={x} y={y - (lines.length - 1) * 9} textAnchor="middle" className={styles.planetText}>
            {lines.map((row, i) => (
              <tspan key={i} x={x} dy={i === 0 ? 0 : 18}>
                {row.map((pl) => `${t(pl.abbr)}${pl.retro ? '*' : ''}`).join(' ')}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

const fmtDeg = (d) => `${Math.floor(d)}° ${String(Math.floor((d % 1) * 60)).padStart(2, '0')}′`;
const scrollTo = (ref) => requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

/** Display name for a saved or picked place ({en,hi} object or plain string). */
const placeLabel = (place, t) => (!place?.name ? '' : typeof place.name === 'string' ? place.name : t(place.name));

export default function BirthChartClient() {
  const { t, lang } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const savedId = params.get('saved');
  const { user, ready, openSignIn } = useAuth();

  const [form, setForm] = useState({ name: '', date: '', time: '06:00', country: 'india', city: '', lat: '', lon: '', tz: '5.5' });
  const [indiaPlace, setIndiaPlace] = useState(null);
  const [savedPlace, setSavedPlace] = useState(null); // place of a loaded saved profile, until the user changes it
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null); // { kundli, name, place, date, time, savedId, numbers }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [save, setSave] = useState({ state: 'idle', error: null });
  const [savedList, setSavedList] = useState(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const loadedSavedId = useRef(null); // the saved profile currently on screen (skip refetching it)
  const resultRef = useRef(null);
  const formRef = useRef(null);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';

  // Cities outside India come from the API (Indian places use the State → District → Village picker).
  const cities = useApiQuery('/panchang/cities');
  const abroad = useMemo(() => (cities.data ?? []).filter((c) => c.tz !== 5.5), [cities.data]);
  useEffect(() => {
    if (abroad.length && !form.city) setForm((f) => ({ ...f, city: abroad[0].id }));
  }, [abroad, form.city]);

  const onIndiaPlace = useCallback((p) => {
    setIndiaPlace(p);
    if (p) setErrors((er) => ({ ...er, place: undefined }));
  }, []);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  /* -------------------------- saved profiles -------------------------- */

  const loadSavedList = useCallback(() => {
    api('/kundli?limit=50&sort=-createdAt')
      .then((res) => setSavedList(res.data))
      .catch(() => setSavedList([]));
  }, []);

  useEffect(() => {
    if (ready && user) loadSavedList();
    if (ready && !user) setSavedList(null);
  }, [ready, user, loadSavedList]);

  const numbersFor = (date) =>
    api('/numerology/calculate', { method: 'POST', body: { dob: date }, auth: false })
      .then((res) => res.data)
      .catch(() => null);

  // /birth-chart?saved=<id>: open a saved profile (stored input + freshly computed chart).
  useEffect(() => {
    if (!savedId || !ready) return;
    if (!user) {
      openSignIn();
      return;
    }
    if (loadedSavedId.current === savedId) return;
    let alive = true;
    setLoading(true);
    setError(null);
    api(`/kundli/${savedId}`)
      .then(async ({ data }) => {
        const { kundli: doc, chart } = data;
        const numbers = await numbersFor(doc.birth.date);
        if (!alive) return;
        const place = { ...doc.birth.place, name: doc.birth.place?.name || '' };
        setForm((f) => ({ ...f, name: doc.name, date: doc.birth.date, time: doc.birth.time || '12:00' }));
        setSavedPlace(place);
        setResult({ kundli: chartFromApi(chart), name: doc.name, place, date: doc.birth.date, time: doc.birth.time || '12:00', savedId: doc.id, numbers });
        setSave({ state: 'saved', error: null });
        loadedSavedId.current = doc.id;
        scrollTo(resultRef);
      })
      .catch((err) => alive && setError(err))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedId, ready, user, loadAttempt]);

  /* ------------------------------ generate ----------------------------- */

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = { en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' };
    if (!form.date) next.date = { en: 'Please enter your birth date.', hi: 'कृपया जन्म तिथि दर्ज करें।' };
    else if (new Date(form.date) > new Date()) next.date = { en: 'Birth date cannot be in the future.', hi: 'जन्म तिथि भविष्य की नहीं हो सकती।' };
    else if (+form.date.slice(0, 4) < 1900 || +form.date.slice(0, 4) > 2050) next.date = { en: 'Please enter a year between 1900 and 2050.', hi: 'कृपया 1900 से 2050 के बीच का वर्ष दर्ज करें।' };
    let place;
    if (savedPlace) {
      place = savedPlace;
    } else if (form.country === 'india') {
      place = indiaPlace;
      if (!place) next.place = { en: 'Please select your birth state and district.', hi: 'कृपया जन्म का राज्य और ज़िला चुनें।' };
    } else if (form.city === 'other') {
      const lat = parseFloat(form.lat);
      const lon = parseFloat(form.lon);
      const tz = parseFloat(form.tz);
      if (!(Math.abs(lat) <= 66)) next.lat = { en: 'Latitude must be between -66 and 66.', hi: 'अक्षांश -66 से 66 के बीच हो।' };
      if (!(Math.abs(lon) <= 180)) next.lon = { en: 'Longitude must be between -180 and 180.', hi: 'देशांतर -180 से 180 के बीच हो।' };
      if (!(tz >= -12 && tz <= 14)) next.tz = { en: 'UTC offset must be between -12 and 14.', hi: 'UTC अंतर -12 से 14 के बीच हो।' };
      place = { lat, lon, tz, name: { en: `${lat}, ${lon}`, hi: `${lat}, ${lon}` } };
    } else {
      place = abroad.find((c) => c.id === form.city);
      if (!place) next.place = { en: 'Please choose a city.', hi: 'कृपया शहर चुनें।' };
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSave({ state: 'idle', error: null });
    try {
      const body = { name: form.name.trim(), date: form.date, time: form.time || undefined, place: placePayload(place) };
      const [{ data }, numbers] = await Promise.all([api('/kundli/generate', { method: 'POST', body, auth: false }), numbersFor(form.date)]);
      setResult({ kundli: chartFromApi(data.chart), name: form.name.trim(), place, date: form.date, time: form.time, savedId: null, numbers });
      loadedSavedId.current = null;
      if (savedId) router.replace('/birth-chart', { scroll: false }); // inputs changed: no longer the saved profile as-is
      scrollTo(resultRef);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const doSave = async () => {
    if (!result) return;
    setSave({ state: 'saving', error: null });
    try {
      const { data } = await api('/kundli', {
        method: 'POST',
        body: { name: result.name, date: result.date, ...(result.time && { time: result.time }), place: placePayload(result.place) },
      });
      setResult((r) => (r ? { ...r, savedId: data.id } : r));
      setSave({ state: 'saved', error: null });
      loadedSavedId.current = data.id;
      loadSavedList();
      router.replace(`/birth-chart?saved=${data.id}`, { scroll: false });
    } catch (err) {
      setSave({ state: 'idle', error: err });
    }
  };

  const onSave = () => (user ? doSave() : openSignIn({ onSuccess: () => doSave() }));

  const openSaved = (id) => {
    router.replace(`/birth-chart?saved=${id}`, { scroll: false });
  };

  const changePlace = () => {
    setSavedPlace(null);
    setForm((f) => ({ ...f, country: 'india' }));
  };

  const k = result?.kundli;
  const L = (sign) => localizeSign(sign, lang);
  const grahaName = (key) => t(GRAHAS.find((g) => g.key === key)?.name ?? { en: key, hi: key });
  const nums = result?.numbers;

  return (
    <section className={styles.section}>
      <div className="container">
        {user && savedList?.length > 0 && (
          <div className={`card ${styles.form}`} style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 10px', fontWeight: 700 }}>
              <UserRound size={16} aria-hidden="true" style={{ verticalAlign: '-3px' }} /> {t({ en: 'My saved kundlis', hi: 'मेरी सहेजी कुंडलियाँ' })}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {savedList.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`btn btn-sm ${s.id === (result?.savedId ?? savedId) ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => openSaved(s.id)}
                  aria-pressed={s.id === (result?.savedId ?? savedId)}
                >
                  {s.name} · {s.birth?.date}
                </button>
              ))}
              <Link href="/account?tab=kundli" className="btn btn-sm btn-ghost">
                {t({ en: 'Manage →', hi: 'प्रबंधित करें →' })}
              </Link>
            </div>
          </div>
        )}

        <form ref={formRef} className={`card card-glow ${styles.form}`} onSubmit={submit} noValidate>
          <div className={styles.fields}>
            <div className={`field ${styles.full}`}>
              <label htmlFor="bc-name">{t({ en: 'Full name', hi: 'पूरा नाम' })}</label>
              <input id="bc-name" className={`input ${errors.name ? 'invalid' : ''}`} placeholder={t({ en: 'e.g. Aarav Sharma', hi: 'जैसे: आरव शर्मा' })} value={form.name} onChange={update('name')} maxLength={80} />
              {errors.name && <span className="error-text">{t(errors.name)}</span>}
            </div>
            <div className="field">
              <label htmlFor="bc-date">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
              <input id="bc-date" type="date" className={`input ${errors.date ? 'invalid' : ''}`} value={form.date} onChange={update('date')} />
              {errors.date && <span className="error-text">{t(errors.date)}</span>}
            </div>
            <div className="field">
              <label htmlFor="bc-time">{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
              <input id="bc-time" type="time" className="input" value={form.time} onChange={update('time')} />
            </div>

            {savedPlace ? (
              <div className={`field ${styles.full}`}>
                <label>{t({ en: 'Place of birth (Janam Sthan)', hi: 'जन्म स्थान' })}</label>
                <p className="input" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                  <MapPin size={16} aria-hidden="true" />
                  <span style={{ flex: 1 }}>{placeLabel(savedPlace, t) || `${savedPlace.lat?.toFixed(2)}, ${savedPlace.lon?.toFixed(2)}`}</span>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={changePlace}>
                    {t({ en: 'Change', hi: 'बदलें' })}
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className={`field ${styles.full}`}>
                  <label htmlFor="bc-country">{t({ en: 'Place of birth (Janam Sthan)', hi: 'जन्म स्थान' })}</label>
                  <select id="bc-country" className="input" value={form.country} onChange={update('country')}>
                    <option value="india">{t({ en: 'India', hi: 'भारत' })}</option>
                    <option value="abroad">{t({ en: 'Outside India', hi: 'भारत के बाहर' })}</option>
                  </select>
                </div>
                {form.country === 'india' ? (
                  <BirthPlacePicker onChange={onIndiaPlace} error={errors.place} />
                ) : (
                  <div className={`field ${styles.full}`}>
                    <label htmlFor="bc-city">{t({ en: 'City', hi: 'शहर' })}</label>
                    <select id="bc-city" className={`input ${errors.place ? 'invalid' : ''}`} value={form.city} onChange={update('city')} disabled={cities.loading && !abroad.length}>
                      {cities.loading && !abroad.length && <option value="">{t({ en: 'Loading cities…', hi: 'शहर लोड हो रहे हैं…' })}</option>}
                      {abroad.map((c) => (
                        <option key={c.id} value={c.id}>
                          {t(c.name)}
                        </option>
                      ))}
                      <option value="other">{t({ en: 'Other (enter coordinates)', hi: 'अन्य (निर्देशांक दर्ज करें)' })}</option>
                    </select>
                    {cities.error && <ErrorState error={cities.error} onRetry={cities.retry} compact />}
                    {errors.place && <span className="error-text">{t(errors.place)}</span>}
                  </div>
                )}
                {form.country === 'abroad' && form.city === 'other' && (
                  <>
                    <div className="field">
                      <label htmlFor="bc-lat">{t({ en: 'Latitude (N +)', hi: 'अक्षांश (उत्तर +)' })}</label>
                      <input id="bc-lat" inputMode="decimal" className={`input ${errors.lat ? 'invalid' : ''}`} placeholder="26.85" value={form.lat} onChange={update('lat')} />
                      {errors.lat && <span className="error-text">{t(errors.lat)}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="bc-lon">{t({ en: 'Longitude (E +)', hi: 'देशांतर (पूर्व +)' })}</label>
                      <input id="bc-lon" inputMode="decimal" className={`input ${errors.lon ? 'invalid' : ''}`} placeholder="80.95" value={form.lon} onChange={update('lon')} />
                      {errors.lon && <span className="error-text">{t(errors.lon)}</span>}
                    </div>
                    <div className={`field ${styles.full}`}>
                      <label htmlFor="bc-tz">{t({ en: 'UTC offset (hours)', hi: 'UTC अंतर (घंटे)' })}</label>
                      <input id="bc-tz" inputMode="decimal" className={`input ${errors.tz ? 'invalid' : ''}`} placeholder="5.5" value={form.tz} onChange={update('tz')} />
                      {errors.tz && <span className="error-text">{t(errors.tz)}</span>}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <p className={styles.hint}>
            {t({
              en: "Don't know your exact birth time? Your Rashi and Nakshatra will still be accurate, but the Lagna needs the correct time.",
              hi: 'सही जन्म समय नहीं पता? राशि और नक्षत्र फिर भी सही रहेंगे, पर लग्न के लिए सही समय आवश्यक है।',
            })}
          </p>
          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading} aria-busy={loading}>
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> {t({ en: 'Calculating planetary positions…', hi: 'ग्रह स्थिति की गणना हो रही है…' })}
              </>
            ) : (
              `✦ ${t({ en: 'Generate Free Kundli', hi: 'मुफ़्त कुंडली बनाएँ' })}`
            )}
          </button>
          {error && (
            <div style={{ marginTop: 16 }}>
              <ErrorState error={error} onRetry={error.status === 404 ? undefined : savedId && !result ? () => setLoadAttempt((n) => n + 1) : () => formRef.current?.requestSubmit()} />
            </div>
          )}
        </form>

        {loading && savedId && !result && <Loading />}

        {k && (
          <div ref={resultRef} className={styles.result}>
            <div className={`${styles.summary} fade-up`}>
              <div>
                <span className="eyebrow">{t({ en: 'Janam Kundli', hi: 'जन्म कुंडली' })}</span>
                <h2>{result.name}</h2>
                <p className="muted">
                  {new Date(`${result.date}T00:00`).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })} · {result.time} · {placeLabel(result.place, t)}
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                  {result.savedId ? (
                    <Link href="/account?tab=kundli" className="btn btn-ghost btn-sm">
                      <Check size={15} aria-hidden="true" /> {t({ en: 'Saved to my account', hi: 'मेरे खाते में सहेजी गई' })}
                    </Link>
                  ) : (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={onSave} disabled={save.state === 'saving'} aria-busy={save.state === 'saving'}>
                      <BookmarkPlus size={15} aria-hidden="true" />{' '}
                      {save.state === 'saving'
                        ? t({ en: 'Saving…', hi: 'सहेजा जा रहा है…' })
                        : user
                          ? t({ en: 'Save to my account', hi: 'मेरे खाते में सहेजें' })
                          : t({ en: 'Sign in to save', hi: 'सहेजने के लिए साइन इन करें' })}
                    </button>
                  )}
                </div>
                {save.error && <ErrorState error={save.error} onRetry={onSave} compact />}
              </div>
              <div className={styles.keyFacts}>
                {[
                  [{ en: 'Lagna (Ascendant)', hi: 'लग्न' }, L(k.lagna.sign).name, k.lagna.sign.glyph],
                  [{ en: 'Rashi (Moon sign)', hi: 'राशि (चंद्र)' }, L(k.rashi).name, k.rashi.glyph],
                  [{ en: 'Nakshatra', hi: 'नक्षत्र' }, `${t(k.nakshatra.name)} (${t({ en: 'Pada', hi: 'चरण' })} ${k.nakshatra.pada})`, '✶'],
                  [{ en: 'Sun sign (Western)', hi: 'सूर्य राशि (पाश्चात्य)' }, L(k.westernSun).name, k.westernSun.glyph],
                ].map(([label, value, glyph]) => (
                  <div key={label.en} className={styles.keyFact}>
                    <span className={`glyph ${styles.keyGlyph}`}>{glyph}</span>
                    <span>
                      <small>{t(label)}</small>
                      <strong>{value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.grid}>
              <div className={`card ${styles.chartCard} fade-up`}>
                <h3>{t({ en: 'Lagna Chart (D1)', hi: 'लग्न कुंडली (D1)' })}</h3>
                <NorthIndianChart kundli={k} />
                <p className={styles.chartNote}>{t({ en: 'North Indian style · Numbers show the rashi in each house · * retrograde', hi: 'उत्तर भारतीय शैली · अंक प्रत्येक भाव की राशि दर्शाते हैं · * वक्री' })}</p>
              </div>

              <div className={`card ${styles.tableCard} fade-up`} style={{ animationDelay: '120ms' }}>
                <h3>{t({ en: 'Planetary Positions', hi: 'ग्रह स्थिति' })}</h3>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>{t({ en: 'Graha', hi: 'ग्रह' })}</th>
                        <th>{t({ en: 'Rashi', hi: 'राशि' })}</th>
                        <th>{t({ en: 'Degree', hi: 'अंश' })}</th>
                        <th>{t({ en: 'Nakshatra', hi: 'नक्षत्र' })}</th>
                        <th>{t({ en: 'House', hi: 'भाव' })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.lagnaRow}>
                        <td>{t({ en: 'Lagna', hi: 'लग्न' })}</td>
                        <td>{L(k.lagna.sign).name}</td>
                        <td>{fmtDeg(k.lagna.degree)}</td>
                        <td>{t(k.lagna.nakshatra.name)}</td>
                        <td>1</td>
                      </tr>
                      {k.planets.map((pl) => (
                        <tr key={pl.key}>
                          <td>
                            {t(pl.name)} {pl.retro && <span className={styles.retro}>{t({ en: 'R', hi: 'व' })}</span>}
                          </td>
                          <td>{L(pl.sign).name}</td>
                          <td>{fmtDeg(pl.degree)}</td>
                          <td>
                            {t(pl.nakshatra.name)} <small>({pl.nakshatra.pada})</small>
                          </td>
                          <td>{pl.house}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.chartNote}>
                  {t({ en: 'Sidereal zodiac, Lahiri ayanamsa', hi: 'निरयन राशिचक्र, लाहिड़ी अयनांश' })} {k.ayanamsa.toFixed(2)}°
                </p>
              </div>
            </div>

            <div className={styles.grid3}>
              <div className={`card fade-up ${styles.dasha}`}>
                <h3>{t({ en: 'Vimshottari Mahadasha', hi: 'विंशोत्तरी महादशा' })}</h3>
                <ol>
                  {k.dashas.map((ds) => {
                    const current = ds === k.currentDasha;
                    return (
                      <li key={ds.lord} className={current ? styles.dashaNow : ''}>
                        <strong>{grahaName(ds.lord)}</strong>
                        <span>
                          {ds.start.getFullYear()} – {ds.end.getFullYear()}
                        </span>
                        {current && <em>{t({ en: 'Running', hi: 'वर्तमान' })}</em>}
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className={`card fade-up ${styles.manglik} ${k.manglik ? styles.isManglik : styles.notManglik}`}>
                <h3>{t({ en: 'Manglik Dosha', hi: 'मांगलिक दोष' })}</h3>
                <span className={styles.bigStatus}>{k.manglik ? t({ en: 'Manglik', hi: 'मांगलिक' }) : t({ en: 'Not Manglik', hi: 'मांगलिक नहीं' })}</span>
                <p>
                  {t({ en: `Mars is in house ${k.marsHouse} from the Lagna.`, hi: `मंगल लग्न से ${k.marsHouse}वें भाव में है।` })}{' '}
                  {k.manglik
                    ? t({ en: 'Consult an astrologer for remedies and matching guidance before marriage.', hi: 'विवाह से पहले उपाय और मिलान के लिए ज्योतिषी से परामर्श लें।' })
                    : t({ en: 'No Mangal Dosha from the Lagna.', hi: 'लग्न से मंगल दोष नहीं है।' })}
                </p>
              </div>

              <div className={`card fade-up ${styles.extra}`}>
                <h3>{t({ en: 'Birth Moon & Numbers', hi: 'जन्म चंद्र और अंक' })}</h3>
                <div className={styles.phase}>
                  <span className={styles.phaseIcon}>{k.phase.icon}</span>
                  <span>
                    <strong>{t(k.phase.name)}</strong>
                    <small>{t(k.phase.meaning)}</small>
                  </span>
                </div>
                {nums ? (
                  <>
                    <div className={styles.nums}>
                      <Link href="/numerology">
                        <b className="gold-text">{nums.mulank?.number ?? '—'}</b>
                        <small>{t({ en: 'Mulank', hi: 'मूलांक' })}</small>
                      </Link>
                      <Link href="/numerology">
                        <b className="gold-text">{nums.lifePath?.number ?? '—'}</b>
                        <small>{t({ en: 'Bhagyank', hi: 'भाग्यांक' })}</small>
                      </Link>
                    </div>
                    {nums.lifePath?.meaning && <p className={styles.small}>{t(nums.lifePath.meaning.title)}</p>}
                  </>
                ) : (
                  <p className={styles.small}>
                    <Link href="/numerology">{t({ en: 'See your numbers →', hi: 'अपने अंक देखें →' })}</Link>
                  </p>
                )}
              </div>
            </div>

            <Phaladesh kundli={k} />

            <div className={`${styles.cta} fade-up`}>
              <div>
                <strong>{t({ en: 'Get your Kundli read by an expert', hi: 'विशेषज्ञ से अपनी कुंडली का विश्लेषण कराएँ' })}</strong>
                <span>{t({ en: 'Detailed predictions, remedies and dasha analysis. First consultation FREE.', hi: 'विस्तृत भविष्यफल, उपाय और दशा विश्लेषण। पहला परामर्श मुफ़्त।' })}</span>
              </div>
              <Link href="/astrologers" className="btn btn-primary">
                {t({ en: 'Talk to Astrologer', hi: 'ज्योतिषी से बात करें' })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

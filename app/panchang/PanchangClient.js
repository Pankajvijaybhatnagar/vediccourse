'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Sunrise, Sunset, MapPin } from 'lucide-react';
import { getPanchang, fmtMinutes, CITIES } from '@/lib/panchang';
import { localizeSign } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import styles from './panchang.module.css';

const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function PanchangClient() {
  const { t, lang } = useLang();
  const [date, setDate] = useState('');
  const [cityId, setCityId] = useState('delhi');
  const [nowMins, setNowMins] = useState(null);
  const city = CITIES.find((c) => c.id === cityId);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';

  // Resolve "today" in the browser to avoid a server/client date mismatch.
  useEffect(() => {
    const now = new Date();
    setDate(toIso(now));
    setNowMins(now.getHours() * 60 + now.getMinutes());
  }, []);

  const data = useMemo(() => (date ? getPanchang(date, city) : null), [date, city]);
  const isToday = date && nowMins !== null && date === toIso(new Date());

  const shift = (days) => {
    const d = new Date(`${date}T12:00`);
    d.setDate(d.getDate() + days);
    setDate(toIso(d));
  };

  const range = (w) => `${fmtMinutes(w.start)} – ${fmtMinutes(w.end)}`;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`card ${styles.controls}`}>
          <div className={styles.dateNav}>
            <button onClick={() => shift(-1)} aria-label={t({ en: 'Previous day', hi: 'पिछला दिन' })} disabled={!date}>
              <ChevronLeft size={20} />
            </button>
            <label className="sr-only" htmlFor="pc-date">
              {t({ en: 'Date', hi: 'तिथि' })}
            </label>
            <input id="pc-date" type="date" className="input" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} min="1900-01-01" max="2100-12-31" />
            <button onClick={() => shift(1)} aria-label={t({ en: 'Next day', hi: 'अगला दिन' })} disabled={!date}>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={styles.cityPick}>
            <MapPin size={18} />
            <label className="sr-only" htmlFor="pc-city">
              {t({ en: 'City', hi: 'शहर' })}
            </label>
            <select id="pc-city" className="input" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data && (
          <>
            <div className={`${styles.hero} fade-up`} key={date + cityId}>
              <div className={styles.heroDate}>
                <span className={styles.heroDay}>{new Date(`${date}T12:00`).getDate()}</span>
                <span>
                  <strong>{new Date(`${date}T12:00`).toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</strong>
                  <small>{t(data.vaara)}</small>
                </span>
              </div>
              <div className={styles.heroTithi}>
                <small>{t(data.tithi.paksha)}</small>
                <strong>{t(data.tithi.name)}</strong>
                <div className={styles.tithiBar} aria-hidden="true">
                  <span style={{ width: `${Math.round(data.tithi.progress * 100)}%` }} />
                </div>
              </div>
              <div className={styles.sun}>
                <span>
                  <Sunrise size={22} />
                  <small>{t({ en: 'Sunrise', hi: 'सूर्योदय' })}</small>
                  <strong>{fmtMinutes(data.sunrise)}</strong>
                </span>
                <span>
                  <Sunset size={22} />
                  <small>{t({ en: 'Sunset', hi: 'सूर्यास्त' })}</small>
                  <strong>{fmtMinutes(data.sunset)}</strong>
                </span>
              </div>
            </div>

            <div className={styles.fiveLimbs}>
              {[
                [{ en: 'Tithi', hi: 'तिथि' }, `${t(data.tithi.name)}`, t(data.tithi.paksha)],
                [{ en: 'Nakshatra', hi: 'नक्षत्र' }, t(data.nakshatra.name), `${t({ en: 'Pada', hi: 'चरण' })} ${data.nakshatra.pada}`],
                [{ en: 'Yoga', hi: 'योग' }, t(data.yoga), ''],
                [{ en: 'Karana', hi: 'करण' }, t(data.karana), ''],
                [{ en: 'Vaar', hi: 'वार' }, t(data.vaara), ''],
              ].map(([label, value, sub], i) => (
                <div key={label.en} className={`${styles.limb} fade-up`} style={{ animationDelay: `${i * 70}ms` }}>
                  <span className={styles.limbNum}>{i + 1}</span>
                  <small>{t(label)}</small>
                  <strong>{value}</strong>
                  {sub && <em>{sub}</em>}
                </div>
              ))}
            </div>

            <div className={styles.twoCol}>
              <div className={`card ${styles.muhurat}`} id="muhurat">
                <h3>{t({ en: 'Auspicious & Inauspicious Timings', hi: 'शुभ और अशुभ समय' })}</h3>
                <ul>
                  <li className={styles.good}>
                    <span>{t({ en: 'Abhijit Muhurat', hi: 'अभिजित मुहूर्त' })}</span>
                    <strong>{range(data.abhijit)}</strong>
                  </li>
                  <li className={styles.bad}>
                    <span>{t({ en: 'Rahu Kaal', hi: 'राहु काल' })}</span>
                    <strong>{range(data.rahu)}</strong>
                  </li>
                  <li className={styles.bad}>
                    <span>{t({ en: 'Yamaganda', hi: 'यमगण्ड' })}</span>
                    <strong>{range(data.yamaganda)}</strong>
                  </li>
                  <li className={styles.bad}>
                    <span>{t({ en: 'Gulika Kaal', hi: 'गुलिक काल' })}</span>
                    <strong>{range(data.gulika)}</strong>
                  </li>
                </ul>
              </div>
              <div className={`card ${styles.muhurat}`}>
                <h3>{t({ en: 'Sun & Moon', hi: 'सूर्य और चंद्र' })}</h3>
                <ul>
                  <li>
                    <span>{t({ en: 'Moon sign (Chandra Rashi)', hi: 'चंद्र राशि' })}</span>
                    <strong>
                      <span className="glyph">{data.moonSign.glyph}</span> {localizeSign(data.moonSign, lang).name}
                    </strong>
                  </li>
                  <li>
                    <span>{t({ en: 'Sun sign (Surya Rashi)', hi: 'सूर्य राशि' })}</span>
                    <strong>
                      <span className="glyph">{data.sunSign.glyph}</span> {localizeSign(data.sunSign, lang).name}
                    </strong>
                  </li>
                  <li>
                    <span>{t({ en: 'Day length', hi: 'दिनमान' })}</span>
                    <strong>
                      {Math.floor((data.sunset - data.sunrise) / 60)}h {Math.round((data.sunset - data.sunrise) % 60)}m
                    </strong>
                  </li>
                  <li>
                    <span>{t({ en: 'Ayanamsa (Lahiri)', hi: 'अयनांश (लाहिड़ी)' })}</span>
                    <strong>{data.ayanamsa.toFixed(2)}°</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.chogWrap} id="choghadiya">
              {[
                { title: { en: 'Day Choghadiya', hi: 'दिन का चौघड़िया' }, list: data.dayChoghadiya, offset: 0 },
                { title: { en: 'Night Choghadiya', hi: 'रात का चौघड़िया' }, list: data.nightChoghadiya, offset: 0 },
              ].map((block) => (
                <div key={block.title.en} className="card">
                  <h3>{t(block.title)}</h3>
                  <ul className={styles.chog}>
                    {block.list.map((c, i) => {
                      const live = isToday && nowMins >= c.start && nowMins < c.end;
                      return (
                        <li key={i} className={`${styles[c.tone]} ${live ? styles.live : ''}`}>
                          <strong>{t(c.name)}</strong>
                          <span>
                            {fmtMinutes(c.start)} – {fmtMinutes(c.end)}
                          </span>
                          {live && <em>{t({ en: 'Now', hi: 'अभी' })}</em>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <p className={styles.note}>
              {t({
                en: 'Tithi, Nakshatra, Yoga and Karana are shown as they stand at local sunrise. Timings are calculated astronomically and may differ by a few minutes from printed almanacs.',
                hi: 'तिथि, नक्षत्र, योग और करण स्थानीय सूर्योदय के समय के अनुसार दिखाए गए हैं। समय खगोलीय गणना से निकाले गए हैं और छपे पंचांग से कुछ मिनट भिन्न हो सकते हैं।',
              })}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

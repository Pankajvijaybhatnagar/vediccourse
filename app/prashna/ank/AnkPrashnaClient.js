'use client';

import { useRef, useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { CITIES } from '@/lib/panchang';
import useCity from '@/lib/useCity';
import useQuestion from '@/lib/prashna/useQuestion';
import { verdictFromScore } from '@/lib/prashna/categories';
import { analyzePrashna, castNow, withLagna, SIGN_NAME } from '@/lib/prashna/kundliPrashna';
import { natureOf, taraFrom } from '@/lib/prashna/nakshatra';
import NorthIndianChart from '@/components/NorthIndianChart';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

const PADA = 360 / 108; // 3°20′ — one navamsha / nakshatra pada

export default function AnkPrashnaClient() {
  const { t } = useLang();
  const { cityId, city, setCityId } = useCity();
  const q = useQuestion();
  const [num, setNum] = useState('');
  const [res, setRes] = useState(null);
  const resultRef = useRef(null);

  function read(nRaw) {
    const n = Number(nRaw);
    if (!Number.isInteger(n) || n < 1 || n > 108) return;
    setNum(String(n));
    const now = castNow(city);
    const lagnaLon = (n - 1) * PADA + PADA / 2;
    const kundli = withLagna(now.kundli, lagnaLon);
    const a = analyzePrashna(kundli, q.category);
    const nak = Math.floor((n - 1) / 4);
    const pada = ((n - 1) % 4) + 1;
    const navamshaSign = (n - 1) % 12;
    const nature = natureOf(nak);
    const tara = taraFrom(now.kundli.nakshatra.index, nak);
    const reasons = [
      { good: nature.score > 0 ? true : nature.score < 0 ? false : null, text: { en: `Number ${n} falls in ${kundli.lagna.nakshatra.name.en} pada ${pada} — ${nature.name.en}. ${nature.text.en}`, hi: `अंक ${n} ${kundli.lagna.nakshatra.name.hi} नक्षत्र के ${pada}वें चरण में आता है — ${nature.name.hi}। ${nature.text.hi}` } },
      { good: tara.score > 0 ? true : tara.score < 0 ? false : null, text: { en: `${tara.name.en} tara from today's Moon: ${tara.text.en}`, hi: `आज के चंद्रमा से ${tara.name.hi} तारा: ${tara.text.hi}` } },
      ...a.reasons,
    ];
    const score = a.score + nature.score + tara.score;
    setRes({ n, kundli, a, nak, pada, navamshaSign, score, verdict: verdictFromScore(score, { yes: 7, likely: 2, mixed: -1 }), reasons, time: now.time, date: now.date });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="ank" />
      <QuestionBox />

      <section className={s.panel}>
        <StepHead n={1}>{t({ en: 'Think of a number from 1 to 108', hi: '1 से 108 तक कोई अंक सोचें' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'With your question in mind, let a number come up by itself — do not pick your "lucky" number. The 108 numbers are the 108 padas (quarters) of the 27 nakshatras; your number fixes the Prashna Lagna and today\'s planets are read from it.',
            hi: 'प्रश्न मन में रखकर कोई अंक स्वयं मन में आने दें — अपना "शुभ अंक" न चुनें। 108 अंक 27 नक्षत्रों के 108 चरण हैं; आपका अंक प्रश्न लग्न तय करता है और आज के ग्रह वहीं से पढ़े जाते हैं।',
          })}
        </p>
        <div className={s.formRow}>
          <div className="field">
            <label htmlFor="ank-n">{t({ en: 'Your number', hi: 'आपका अंक' })}</label>
            <input id="ank-n" type="number" min={1} max={108} inputMode="numeric" className="input" value={num} onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && read(num)} />
          </div>
          <div className="field">
            <label htmlFor="ank-city">{t({ en: 'City', hi: 'शहर' })}</label>
            <select id="ank-city" className="input" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => read(num)} disabled={!(Number(num) >= 1 && Number(num) <= 108)}>
            <Sparkles size={16} /> {t({ en: 'Get the answer', hi: 'उत्तर पाएँ' })}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => read(1 + Math.floor(Math.random() * 108))}>
            <Shuffle size={16} /> {t({ en: 'Let fate choose', hi: 'भाग्य पर छोड़ें' })}
          </button>
        </div>
        <p className={s.qHint}>{t({ en: 'Or tap a number:', hi: 'या कोई अंक दबाएँ:' })}</p>
        <div className={s.numGrid}>
          {Array.from({ length: 108 }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" className={`${s.num} ${res?.n === n ? s.numOn : ''}`} onClick={() => read(n)}>
              {n}
            </button>
          ))}
        </div>
      </section>

      {res && (
        <div ref={resultRef} className={s.wrap} style={{ paddingBottom: 0, scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
          <VerdictCard verdict={res.verdict} title={{ en: `Ank ${res.n} · score ${res.score}`, hi: `अंक ${res.n} · अंक-बल ${res.score}` }} reasons={res.reasons} onReset={() => setRes(null)}>
            <dl className={s.factList}>
              <div>
                <dt>{t({ en: 'Prashna Lagna', hi: 'प्रश्न लग्न' })}</dt>
                <dd>{t(SIGN_NAME[res.a.lagnaSign])}</dd>
              </div>
              <div>
                <dt>{t({ en: 'Nakshatra · pada', hi: 'नक्षत्र · चरण' })}</dt>
                <dd>
                  {t(res.kundli.lagna.nakshatra.name)} · {res.pada}
                </dd>
              </div>
              <div>
                <dt>{t({ en: 'Navamsha', hi: 'नवांश' })}</dt>
                <dd>{t(SIGN_NAME[res.navamshaSign])}</dd>
              </div>
              <div>
                <dt>{t({ en: 'Timing', hi: 'समय संकेत' })}</dt>
                <dd style={{ fontWeight: 500 }}>{t(res.a.timing)}</dd>
              </div>
              {res.a.extra.map((x) => (
                <div key={x.title.en}>
                  <dt>{t(x.title)}</dt>
                  <dd style={{ fontWeight: 500 }}>{t(x.text)}</dd>
                </div>
              ))}
            </dl>
          </VerdictCard>
          <section className={s.panel}>
            <StepHead n={2}>{t({ en: 'Chart from your number', hi: 'आपके अंक से बनी कुंडली' })}</StepHead>
            <div className={s.chartBox}>
              <NorthIndianChart kundli={res.kundli} label={t({ en: 'Ank Prashna chart', hi: 'अंक प्रश्न कुंडली' })} />
            </div>
            <p className={s.qNote} style={{ textAlign: 'center' }}>
              {t({ en: 'Planets as of', hi: 'ग्रह स्थिति' })} {res.date} {res.time} · {t(city.name)}
            </p>
          </section>
        </div>
      )}

      <section className={s.panel}>
        <StepHead>{t({ en: 'How Ank Prashna works', hi: 'अंक प्रश्न कैसे काम करता है' })}</StepHead>
        <ol className={s.ruleList}>
          <li>{t({ en: 'The zodiac of 360° has 27 nakshatras × 4 padas = 108 padas of 3°20′ each. Number 1 = Ashwini pada 1 (Aries), number 108 = Revati pada 4 (Pisces).', hi: '360° के राशिचक्र में 27 नक्षत्र × 4 चरण = 108 चरण हैं, प्रत्येक 3°20′ का। अंक 1 = अश्विनी प्रथम चरण (मेष), अंक 108 = रेवती चतुर्थ चरण (मीन)।' })}</li>
          <li>{t({ en: 'The sign containing that pada becomes the Prashna Lagna; every planet is placed in houses from it using its position right now.', hi: 'जिस राशि में वह चरण है वही प्रश्न लग्न बनती है; सभी ग्रह अपनी वर्तमान स्थिति से उसी लग्न से भावों में रखे जाते हैं।' })}</li>
          <li>{t({ en: 'The chart is then judged like a Prashna Kundali (Lagna lord, karyesh, Moon), plus the nature of the nakshatra and its tara from today\'s Moon.', hi: 'फिर कुंडली का विचार प्रश्न कुंडली की तरह (लग्नेश, कार्येश, चंद्रमा) होता है, साथ ही नक्षत्र का स्वभाव और आज के चंद्रमा से उसका तारा।' })}</li>
          <li>{t({ en: 'This is close to the Krishnamurti Paddhati (KP) number method, which uses 1–249; 1–108 is the classical navamsha form.', hi: 'यह कृष्णमूर्ति पद्धति (KP) की अंक विधि जैसा है, जिसमें 1–249 अंक होते हैं; 1–108 उसका शास्त्रीय नवांश रूप है।' })}</li>
        </ol>
      </section>
      <Disclaimer />
    </div>
  );
}

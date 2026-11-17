'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { CITIES } from '@/lib/panchang';
import { buildKundli, GRAHAS } from '@/lib/kundli';
import useCity from '@/lib/useCity';
import useQuestion from '@/lib/prashna/useQuestion';
import { getCategory } from '@/lib/prashna/categories';
import { analyzePrashna, nowInZone, SIGN_NAME, HOUSE_MEANING } from '@/lib/prashna/kundliPrashna';
import NorthIndianChart from '@/components/NorthIndianChart';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';
import { SIGNS } from '@/lib/zodiac';

const gName = (key) => GRAHAS.find((g) => g.key === key).name;

const PRINCIPLES = [
  { title: { en: 'Lagna = you', hi: 'लग्न = प्रश्नकर्ता' }, text: { en: 'The rising sign at the moment of asking and its lord stand for the person asking.', hi: 'प्रश्न के क्षण उदित राशि और उसका स्वामी प्रश्नकर्ता का प्रतिनिधि है।' } },
  { title: { en: 'Karya bhava = the matter', hi: 'कार्य भाव = विषय' }, text: { en: 'Each question has its house: 7th marriage, 10th job, 5th children & exams, 4th home, 6th disputes, 11th gains.', hi: 'हर प्रश्न का अपना भाव: 7वाँ विवाह, 10वाँ नौकरी, 5वाँ संतान व परीक्षा, 4था घर, 6ठा विवाद, 11वाँ लाभ।' } },
  { title: { en: 'Ithasala = meeting', hi: 'इत्थशाल = मिलन' }, text: { en: 'When the Lagna lord and the lord of the matter are together, exchange signs or aspect each other, the work is done.', hi: 'लग्नेश और कार्येश साथ हों, राशि परिवर्तन हो या परस्पर दृष्टि हो तो कार्य सिद्ध होता है।' } },
  { title: { en: 'Moon = the mind', hi: 'चंद्र = मन' }, text: { en: 'A strong, waxing Moon away from the 6th, 8th and 12th houses supports the question.', hi: 'बलवान, शुक्ल पक्ष का चंद्रमा, जो 6, 8, 12वें भाव में न हो, प्रश्न को बल देता है।' } },
  { title: { en: 'Kendra & trikona', hi: 'केंद्र एवं त्रिकोण' }, text: { en: 'Benefics in houses 1, 4, 7, 10, 5, 9 help; malefics there and planets in 6, 8, 12 obstruct.', hi: '1, 4, 7, 10, 5, 9 भावों में शुभ ग्रह सहायक; वहाँ पाप ग्रह और 6, 8, 12 में ग्रह बाधक।' } },
  { title: { en: 'Timing', hi: 'समय' }, text: { en: 'Movable Lagna gives quick results, fixed Lagna slow ones, dual Lagna in between.', hi: 'चर लग्न शीघ्र, स्थिर लग्न धीरे और द्विस्वभाव लग्न मध्यम समय में फल देता है।' } },
];

export default function KundaliPrashnaClient() {
  const { t } = useLang();
  const { cityId, city, setCityId } = useCity();
  const q = useQuestion();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [chart, setChart] = useState(null);
  const resultRef = useRef(null);

  // Default to "now" in the chosen city once mounted (avoids a server/client time mismatch).
  useEffect(() => {
    const n = nowInZone(city.tz);
    setDate(n.date);
    setTime(n.time);
  }, [city.tz]);

  const setNow = () => {
    const n = nowInZone(city.tz);
    setDate(n.date);
    setTime(n.time);
  };

  const cast = () => {
    if (!date || !time) return;
    const kundli = buildKundli({ date, time, lat: city.lat, lon: city.lon, tz: city.tz });
    setChart({ kundli, date, time, cityName: city.name });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const result = useMemo(() => (chart ? analyzePrashna(chart.kundli, q.category) : null), [chart, q.category]);
  const cat = getCategory(q.category);

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="kundali" />
      <QuestionBox />

      <section className={s.panel}>
        <StepHead n={1}>{t({ en: 'Moment and place of the question', hi: 'प्रश्न का समय और स्थान' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'Prashna Kundali is cast for the moment the question is sincerely asked — your birth details are not needed. Keep "now" unless you are reading a question someone asked earlier.',
            hi: 'प्रश्न कुंडली उस क्षण की बनती है जब प्रश्न सच्चे मन से पूछा गया — जन्म विवरण की आवश्यकता नहीं। "अभी" का समय रखें, जब तक किसी के पहले पूछे गए प्रश्न का विचार न कर रहे हों।',
          })}
        </p>
        <div className={s.formRow}>
          <div className="field">
            <label htmlFor="pk-city">{t({ en: 'City', hi: 'शहर' })}</label>
            <select id="pk-city" className="input" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="pk-date">{t({ en: 'Date', hi: 'तिथि' })}</label>
            <input id="pk-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="pk-time">{t({ en: 'Time', hi: 'समय' })}</label>
            <input id="pk-time" type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <button type="button" className="btn btn-ghost" onClick={setNow}>
            <Clock size={16} /> {t({ en: 'Now', hi: 'अभी' })}
          </button>
        </div>
        <div className={s.actions}>
          <button type="button" className="btn btn-primary btn-lg" onClick={cast} disabled={!date || !time}>
            <Sparkles size={18} /> {t({ en: 'Cast Prashna Kundali', hi: 'प्रश्न कुंडली बनाएँ' })}
          </button>
          {!q.text && <small className={s.qNote}>{t({ en: 'Tip: write your question above first.', hi: 'सुझाव: पहले ऊपर अपना प्रश्न लिखें।' })}</small>}
        </div>
      </section>

      {chart && result && (
        <div ref={resultRef} className={s.wrap} style={{ paddingBottom: 0, scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
          <VerdictCard verdict={result.verdict} title={{ en: `Prashna Kundali · score ${result.score}`, hi: `प्रश्न कुंडली · अंक ${result.score}` }} reasons={result.reasons}>
            <dl className={s.factList}>
              <div>
                <dt>{t({ en: 'Timing', hi: 'समय संकेत' })}</dt>
                <dd style={{ fontWeight: 500 }}>{t(result.timing)}</dd>
              </div>
              {result.extra.map((x) => (
                <div key={x.title.en}>
                  <dt>{t(x.title)}</dt>
                  <dd style={{ fontWeight: 500 }}>{t(x.text)}</dd>
                </div>
              ))}
            </dl>
          </VerdictCard>

          <div className={s.two}>
            <section className={s.panel}>
              <StepHead n={2}>{t({ en: 'Prashna chart', hi: 'प्रश्न कुंडली' })}</StepHead>
              <div className={s.chartBox}>
                <NorthIndianChart kundli={chart.kundli} label={t({ en: 'Prashna chart', hi: 'प्रश्न कुंडली' })} />
              </div>
              <p className={s.qNote} style={{ textAlign: 'center' }}>
                {chart.date} · {chart.time} · {t(chart.cityName)}
              </p>
            </section>
            <section className={s.panel}>
              <StepHead n={3}>{t({ en: 'Key points', hi: 'मुख्य बिंदु' })}</StepHead>
              <dl className={s.factList}>
                <div>
                  <dt>{t({ en: 'Prashna Lagna', hi: 'प्रश्न लग्न' })}</dt>
                  <dd>
                    {t(SIGN_NAME[result.lagnaSign])} {chart.kundli.lagna.degree.toFixed(1)}°
                  </dd>
                </div>
                <div>
                  <dt>{t({ en: 'Lagna lord (you)', hi: 'लग्नेश (आप)' })}</dt>
                  <dd>{t(gName(result.lagnesh))}</dd>
                </div>
                <div>
                  <dt>{t({ en: 'House of question', hi: 'कार्य भाव' })}</dt>
                  <dd>
                    {result.karyaHouse} · {t(HOUSE_MEANING[result.karyaHouse])}
                  </dd>
                </div>
                <div>
                  <dt>{t({ en: 'Karyesh', hi: 'कार्येश' })}</dt>
                  <dd>
                    {t(gName(result.karyesh))} ({t(SIGN_NAME[result.karyaSign])})
                  </dd>
                </div>
                <div>
                  <dt>{t({ en: 'Moon nakshatra', hi: 'चंद्र नक्षत्र' })}</dt>
                  <dd>
                    {t(chart.kundli.nakshatra.name)} · {t({ en: 'pada', hi: 'चरण' })} {chart.kundli.nakshatra.pada}
                  </dd>
                </div>
                <div>
                  <dt>{t({ en: 'Paksha', hi: 'पक्ष' })}</dt>
                  <dd>{result.shukla ? t({ en: 'Shukla (waxing)', hi: 'शुक्ल' }) : t({ en: 'Krishna (waning)', hi: 'कृष्ण' })}</dd>
                </div>
                <div>
                  <dt>{t({ en: 'Topic', hi: 'विषय' })}</dt>
                  <dd>
                    {cat.icon} {t(cat.label)}
                  </dd>
                </div>
              </dl>
              <div className={s.tableScroll} style={{ marginTop: 16 }}>
                <table className={s.planetTable}>
                  <thead>
                    <tr>
                      <th>{t({ en: 'Planet', hi: 'ग्रह' })}</th>
                      <th>{t({ en: 'Sign', hi: 'राशि' })}</th>
                      <th>{t({ en: 'House', hi: 'भाव' })}</th>
                      <th>{t({ en: 'Degree', hi: 'अंश' })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart.kundli.planets.map((pl) => (
                      <tr key={pl.key}>
                        <td>
                          {t(pl.name)}
                          {pl.retro ? ` (${t({ en: 'R', hi: 'व' })})` : ''}
                        </td>
                        <td>{t(SIGN_NAME[SIGNS.indexOf(pl.sign)])}</td>
                        <td>{pl.house}</td>
                        <td>{pl.degree.toFixed(1)}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}

      <section className={s.panel}>
        <StepHead>{t({ en: 'How a Prashna Kundali is read', hi: 'प्रश्न कुंडली कैसे पढ़ी जाती है' })}</StepHead>
        <div className={s.subGrid}>
          {PRINCIPLES.map((pr) => (
            <div key={pr.title.en} className={s.subCard}>
              <h3>{t(pr.title)}</h3>
              <p>{t(pr.text)}</p>
            </div>
          ))}
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}

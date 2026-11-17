'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { KINDS, ALL_ITEMS, readName, VAAR_EN, VAAR_HI } from '@/lib/prashna/phalSabzi';
import { isDevanagari } from '@/lib/prashna/nakshatra';
import { NAKSHATRAS } from '@/lib/panchang';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

const norm = (v) => String(v || '').trim().toLowerCase();

function Pts({ n }) {
  if (n == null) return null;
  return <span className={`${s.pts} ${n > 0 ? s.ptsGood : n < 0 ? s.ptsBad : ''}`}>{n > 0 ? `+${n}` : n}</span>;
}

export default function PhalSabziClient() {
  const { t, lang } = useLang();
  const [kind, setKind] = useState('fruit');
  const [typed, setTyped] = useState('');
  const [picked, setPicked] = useState(null); // item from the list
  const [result, setResult] = useState(null);
  const [order, setOrder] = useState(null); // shuffled ids so the grid does not lead the choice
  const resultRef = useRef(null);

  const items = useMemo(() => {
    const list = KINDS.find((k) => k.key === kind).items;
    if (!order) return list;
    return [...list].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [kind, order]);

  // Shuffle once on mount so the first item is not always the same.
  useEffect(() => {
    setOrder(ALL_ITEMS.map((i) => i.id).sort(() => Math.random() - 0.5));
  }, []);

  const match = useMemo(() => {
    const v = norm(typed);
    if (!v) return null;
    return ALL_ITEMS.find((i) => norm(i.name.hi) === v || norm(i.name.en) === v || norm(i.name.en).split(' (')[0] === v) || null;
  }, [typed]);

  const chosenName = picked ? picked.name.hi : match ? match.name.hi : typed.trim();
  const chosenItem = picked || match;
  const latinOnly = chosenName && !isDevanagari(chosenName);

  function pick(item) {
    setPicked(item);
    setTyped(item.name.hi);
    setResult(null);
  }

  function read() {
    if (!chosenName) return;
    setResult({ name: chosenName, item: chosenItem, r: readName(chosenName, chosenItem) });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  const r = result?.r;
  const vaarName = r ? (lang === 'hi' ? VAAR_HI : VAAR_EN)[r.vaar - 1] : '';

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="phal-sabzi" />
      <QuestionBox />

      <section className={s.panel}>
        <StepHead n={1}>{t({ en: 'Say the first name that comes to mind', hi: 'मन में आया पहला नाम बोलें' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'Close your eyes, think of your question and say aloud the very first fruit, vegetable or flower that comes to mind — do not choose a "lucky" one. Type it or tap it below.',
            hi: 'आँखें बंद करें, प्रश्न सोचें और जो पहला फल, सब्ज़ी या फूल मन में आए उसका नाम बोलें — "शुभ" नाम सोच-समझकर न चुनें। नीचे लिखें या चुनें।',
          })}
        </p>
        <div className={s.formRow}>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="ps-name">{t({ en: 'Name (Hindi is best, e.g. आम, गाजर, गुलाब)', hi: 'नाम (हिंदी में सर्वोत्तम, जैसे आम, गाजर, गुलाब)' })}</label>
            <input
              id="ps-name"
              className="input"
              value={typed}
              maxLength={40}
              onChange={(e) => {
                setTyped(e.target.value);
                setPicked(null);
                setResult(null);
              }}
              placeholder="आम / केला / गाजर / गुलाब…"
            />
          </div>
        </div>
        {latinOnly && (
          <p className={s.qNote}>
            {t({
              en: 'This name is not in our list. Please type it in Hindi (Devanagari) so the first syllable (namakshar) and letters can be counted correctly.',
              hi: 'यह नाम सूची में नहीं है। कृपया इसे हिंदी (देवनागरी) में लिखें ताकि पहला अक्षर (नामाक्षर) और अक्षर सही गिने जा सकें।',
            })}
          </p>
        )}

        <div className={s.kindTabs} style={{ marginTop: 16 }}>
          {KINDS.map((k) => (
            <button key={k.key} type="button" className={`${s.choice} ${kind === k.key ? s.choiceOn : ''}`} onClick={() => setKind(k.key)}>
              <span aria-hidden="true">{k.icon}</span> {t(k.label)} <small>({k.items.length})</small>
            </button>
          ))}
          <button type="button" className={s.choice} onClick={() => setOrder(ALL_ITEMS.map((i) => i.id).sort(() => Math.random() - 0.5))}>
            <Shuffle size={16} /> {t({ en: 'Shuffle', hi: 'क्रम बदलें' })}
          </button>
        </div>
        <div className={s.itemGrid}>
          {items.map((it) => (
            <button key={it.id} type="button" className={`${s.item} ${chosenItem?.id === it.id ? s.itemOn : ''}`} onClick={() => pick(it)} aria-pressed={chosenItem?.id === it.id}>
              <span aria-hidden="true">{it.emoji}</span>
              <b>{it.name.hi}</b>
              <small>{it.name.en}</small>
            </button>
          ))}
        </div>
        <div className={s.actions}>
          <button type="button" className="btn btn-primary btn-lg" onClick={read} disabled={!chosenName}>
            <Sparkles size={18} /> {t({ en: 'Get the answer', hi: 'उत्तर पाएँ' })}
            {chosenName ? ` · ${chosenName}` : ''}
          </button>
        </div>
      </section>

      {r && (
        <div ref={resultRef} style={{ scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
          <VerdictCard
            verdict={r.verdict}
            title={{ en: `${result.item ? result.item.emoji + ' ' : ''}${result.name} · score ${r.score}`, hi: `${result.item ? result.item.emoji + ' ' : ''}${result.name} · अंक ${r.score}` }}
            onReset={() => setResult(null)}
          >
            <div className={s.calc}>
              <div className={s.calcRow}>
                <span aria-hidden="true">🔤</span>
                <div>
                  <strong>{t({ en: '1. Akshar ganana (letter count)', hi: '1. अक्षर गणना' })}</strong>
                  <p>
                    {t({
                      en: `"${result.name}" has ${r.akshar} letters. Today is ${vaarName} (${r.vaar}). (${r.akshar} + ${r.vaar}) ÷ 3 leaves ${r.rem}.`,
                      hi: `"${result.name}" में ${r.akshar} अक्षर हैं। आज ${vaarName} (${r.vaar}) है। (${r.akshar} + ${r.vaar}) ÷ 3 = शेष ${r.rem}।`,
                    })}{' '}
                    {t(r.ak.text)}
                  </p>
                </div>
                <Pts n={r.ak.score} />
              </div>

              <div className={s.calcRow}>
                <span aria-hidden="true">✨</span>
                <div>
                  <strong>{t({ en: '2. Namakshar → nakshatra', hi: '2. नामाक्षर → नक्षत्र' })}</strong>
                  {r.nm ? (
                    <p>
                      {t({
                        en: `First syllable "${r.nm.syllable}" belongs to ${r.nm.name.en} nakshatra, pada ${r.nm.pada} — ${r.nature.name.en}.`,
                        hi: `पहला अक्षर "${r.nm.syllable}" ${r.nm.name.hi} नक्षत्र के ${r.nm.pada}वें चरण का है — ${r.nature.name.hi}।`,
                      })}{' '}
                      {t(r.nature.text)}
                    </p>
                  ) : (
                    <p>{t({ en: 'Type the name in Hindi to find its nakshatra.', hi: 'नक्षत्र जानने के लिए नाम हिंदी में लिखें।' })}</p>
                  )}
                </div>
                <Pts n={r.nature?.score} />
              </div>

              {r.tara && (
                <div className={s.calcRow}>
                  <span aria-hidden="true">🌙</span>
                  <div>
                    <strong>{t({ en: '3. Tara bala from today\'s Moon', hi: '3. आज के चंद्रमा से तारा बल' })}</strong>
                    <p>
                      {t({
                        en: `The Moon is now in ${NAKSHATRAS[r.moonNak].en}. Counting to ${r.nm.name.en} gives ${r.tara.count} → ${r.tara.name.en} tara.`,
                        hi: `चंद्रमा अभी ${NAKSHATRAS[r.moonNak].hi} में है। वहाँ से ${r.nm.name.hi} तक गिनने पर ${r.tara.count} → ${r.tara.name.hi} तारा।`,
                      })}{' '}
                      {t(r.tara.text)}
                    </p>
                  </div>
                  <Pts n={r.tara.score} />
                </div>
              )}

              {r.planet && (
                <div className={s.calcRow}>
                  <span aria-hidden="true">🪐</span>
                  <div>
                    <strong>
                      {t({ en: '4. Ruling planet', hi: '4. स्वामी ग्रह' })}: {t(r.planet.name)}
                      {r.planetFromNakshatra ? ` (${t({ en: 'nakshatra lord', hi: 'नक्षत्र स्वामी' })})` : ''}
                    </strong>
                    <p>{t(r.planet.text)}</p>
                  </div>
                  <Pts n={r.planet.score} />
                </div>
              )}

              {r.rasa && (
                <div className={s.calcRow}>
                  <span aria-hidden="true">👅</span>
                  <div>
                    <strong>
                      {t({ en: '5. Taste (rasa)', hi: '5. रस (स्वाद)' })}: {t(r.rasa.name)}
                    </strong>
                    <p>{t(r.rasa.text)}</p>
                  </div>
                  <Pts n={r.rasa.score} />
                </div>
              )}
            </div>
          </VerdictCard>
        </div>
      )}

      <section className={s.panel}>
        <StepHead>{t({ en: 'About this method', hi: 'इस विधि के बारे में' })}</StepHead>
        <div className={s.subGrid}>
          <div className={s.subCard}>
            <h3>{t({ en: 'Why the first name?', hi: 'पहला नाम ही क्यों?' })}</h3>
            <p>{t({ en: 'In Prashna Shastra the word that rises in the mind unasked at the moment of the question is taken as a sign (nimitta) of the answer — just like a shakun.', hi: 'प्रश्न शास्त्र में प्रश्न के क्षण बिना सोचे मन में आया शब्द उत्तर का निमित्त (संकेत) माना जाता है — ठीक शकुन की तरह।' })}</p>
          </div>
          <div className={s.subCard}>
            <h3>{t({ en: 'Akshar ganana', hi: 'अक्षर गणना' })}</h3>
            <p>{t({ en: 'A widely used folk rule: letters of the name plus the weekday number (Sunday = 1) divided by 3. Remainder 1 is quick success, 2 is success after delay, 0 is difficulty.', hi: 'प्रचलित लोक-नियम: नाम के अक्षर + वार संख्या (रविवार = 1), फिर 3 से भाग। शेष 1 शीघ्र सिद्धि, 2 विलम्ब से सिद्धि, 0 कठिनाई।' })}</p>
          </div>
          <div className={s.subCard}>
            <h3>{t({ en: 'Namakshar & tara', hi: 'नामाक्षर एवं तारा' })}</h3>
            <p>{t({ en: 'The first syllable is placed in a nakshatra with the Avakahada Chakra (the same table used for naming a child) and counted from the Moon\'s nakshatra at this moment.', hi: 'पहले अक्षर को अवकहड़ा चक्र (जिससे नामकरण होता है) से नक्षत्र में रखा जाता है और इस क्षण के चंद्र नक्षत्र से गिना जाता है।' })}</p>
          </div>
          <div className={s.subCard}>
            <h3>{t({ en: 'Planet & taste', hi: 'ग्रह एवं रस' })}</h3>
            <p>{t({ en: 'Each fruit, vegetable and flower is linked by tradition to a planet and a rasa. Sweet tastes and Jupiter–Venus items are most auspicious; bitter ones show obstacles that remedies can ease.', hi: 'परम्परा से हर फल, सब्ज़ी और फूल का एक ग्रह और रस से संबंध है। मीठे रस और गुरु–शुक्र की वस्तुएँ सर्वाधिक शुभ; कड़वी वस्तुएँ बाधा दिखाती हैं जिन्हें उपाय कम करते हैं।' })}</p>
          </div>
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}

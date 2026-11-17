'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import useQuestion from '@/lib/prashna/useQuestion';
import { SWARS, SIDES, HOW_TO_CHECK, readSwar } from '@/lib/prashna/swarAnguli';
import { MethodTabs, QuestionBox, VerdictCard, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

export default function SwarPrashnaClient() {
  const { t } = useLang();
  const q = useQuestion();
  const [swar, setSwar] = useState(null);
  const [side, setSide] = useState('self');
  const [res, setRes] = useState(null);

  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs active="swar" />
      <QuestionBox />

      <div className={s.two}>
        <section className={s.panel}>
          <StepHead n={1}>{t({ en: 'Check your flowing swar', hi: 'अपना चलता स्वर देखें' })}</StepHead>
          <ol className={s.ruleList}>
            {HOW_TO_CHECK.map((h) => (
              <li key={h.en}>{t(h)}</li>
            ))}
          </ol>
        </section>
        <section className={s.panel}>
          <StepHead n={2}>{t({ en: 'Where did the question come from?', hi: 'प्रश्न किस ओर से आया?' })}</StepHead>
          <p className={s.lead}>
            {t({
              en: 'If you are answering for someone else, note the side they were on when they asked. If you ask for yourself, choose the last option.',
              hi: 'यदि आप किसी और का प्रश्न देख रहे हैं, तो पूछते समय वे किस ओर थे यह चुनें। स्वयं के लिए पूछ रहे हैं तो अंतिम विकल्प चुनें।',
            })}
          </p>
          <div className={s.chips}>
            {SIDES.map((sd) => (
              <button key={sd.key} type="button" className={`${s.choice} ${side === sd.key ? s.choiceOn : ''}`} onClick={() => { setSide(sd.key); setRes(null); }}>
                {t(sd.label)}
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className={s.panel}>
        <StepHead n={3}>{t({ en: 'Which swar is flowing now?', hi: 'अभी कौन-सा स्वर चल रहा है?' })}</StepHead>
        <div className={s.swarGrid}>
          {Object.values(SWARS).map((sw) => (
            <button key={sw.key} type="button" className={`${s.swarCard} ${swar === sw.key ? s.choiceOn : ''}`} onClick={() => { setSwar(sw.key); setRes(null); }} aria-pressed={swar === sw.key}>
              <span aria-hidden="true">{sw.icon}</span>
              <strong>{t(sw.name)}</strong>
              <small>
                <b>{t(sw.nature)}.</b> {t(sw.good)}
              </small>
            </button>
          ))}
        </div>
        <div className={s.actions}>
          <button type="button" className="btn btn-primary btn-lg" disabled={!swar} onClick={() => setRes(readSwar({ swar, side, categoryKey: q.category }))}>
            <Sparkles size={18} /> {t({ en: 'Get the answer', hi: 'उत्तर पाएँ' })}
          </button>
        </div>
      </section>

      {res && <VerdictCard verdict={res.verdict} title={{ en: `Swar Prashna · ${SWARS[swar].name.en}`, hi: `स्वर प्रश्न · ${SWARS[swar].name.hi}` }} reasons={res.reasons} onReset={() => setRes(null)} />}

      <section className={s.panel}>
        <StepHead>{t({ en: 'About Swar Shastra', hi: 'स्वर शास्त्र के बारे में' })}</StepHead>
        <div className={s.subGrid}>
          <div className={s.subCard}>
            <h3>{t({ en: 'Shiva Swarodaya', hi: 'शिव स्वरोदय' })}</h3>
            <p>{t({ en: 'A dialogue of Lord Shiva and Mother Parvati on the science of breath. The breath changes sides roughly every hour (ghati cycle), and each side suits different kinds of work.', hi: 'स्वर-विज्ञान पर भगवान शिव और माता पार्वती का संवाद। स्वर लगभग हर घंटे बदलता है और प्रत्येक स्वर अलग प्रकार के कार्यों के अनुकूल है।' })}</p>
          </div>
          <div className={s.subCard}>
            <h3>{t({ en: 'Purna & shunya disha', hi: 'पूर्ण एवं शून्य दिशा' })}</h3>
            <p>{t({ en: 'The side of the flowing nostril is "full" (purna), the other is "empty" (shunya). A question that comes from the full side is said to succeed; from the empty side it meets obstacles.', hi: 'चलते स्वर की ओर "पूर्ण" दिशा, दूसरी ओर "शून्य" दिशा। पूर्ण दिशा से आया प्रश्न सफल, शून्य दिशा से आया प्रश्न बाधित माना जाता है।' })}</p>
          </div>
          <div className={s.subCard}>
            <h3>{t({ en: 'Sushumna', hi: 'सुषुम्ना' })}</h3>
            <p>{t({ en: 'When both nostrils flow equally the mind turns inward — best for meditation. Worldly questions are put off until one swar becomes clear.', hi: 'जब दोनों स्वर बराबर चलें तो मन अंतर्मुखी होता है — ध्यान हेतु श्रेष्ठ। सांसारिक प्रश्न तब तक टालें जब तक एक स्वर स्पष्ट न हो।' })}</p>
          </div>
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}

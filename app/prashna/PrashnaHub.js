'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { METHODS } from '@/lib/prashna/categories';
import { MethodTabs, QuestionBox, Disclaimer, StepHead, prashnaStyles as s } from '@/components/prashna/ui';

const p = (en, hi) => ({ en, hi });

// Every major type of Prashna. `href` = available on this site.
const TYPES = [
  { name: p('Prashna Kundali (Horary chart)', 'प्रश्न कुंडली (तात्कालिक कुंडली)'), basis: p('Chart of the moment and place of the question', 'प्रश्न के समय और स्थान की कुंडली'), href: '/prashna/kundali' },
  { name: p('Shri Ram Shalaka Prashnavali', 'श्रीराम शलाका प्रश्नावली'), basis: p('225-letter grid → chaupai of the Ramcharitmanas', '225 अक्षरों का यंत्र → रामचरितमानस की चौपाई'), href: '/prashna/ram-shalaka' },
  { name: p('Hast Rekha Prashna', 'हस्त रेखा प्रश्न'), basis: p('Lines and mounts of the palm for the topic asked', 'प्रश्न के विषय की हस्त रेखाएँ और पर्वत'), href: '/prashna/hast-rekha' },
  { name: p('Anguli Prashna', 'अंगुली प्रश्न'), basis: p('The finger touched without choosing → its planet', 'बिना चुने छुई अंगुली → उसका ग्रह'), href: '/prashna/hast-rekha' },
  { name: p('Phal / Sabzi / Pushp Prashna (Naam Prashna)', 'फल / सब्ज़ी / पुष्प प्रश्न (नाम प्रश्न)'), basis: p('First name that comes to mind → letters, nakshatra, planet, taste', 'मन में आया पहला नाम → अक्षर, नक्षत्र, ग्रह, रस'), href: '/prashna/phal-sabzi' },
  { name: p('Ank Prashna (1–108)', 'अंक प्रश्न (1–108)'), basis: p('Number → nakshatra pada → Prashna Lagna', 'अंक → नक्षत्र चरण → प्रश्न लग्न'), href: '/prashna/ank' },
  { name: p('Swar Prashna', 'स्वर प्रश्न'), basis: p('Flowing nostril (Ida / Pingala / Sushumna)', 'चलता स्वर (इड़ा / पिंगला / सुषुम्ना)'), href: '/prashna/swar' },
  { name: p('Tarot Prashna', 'टैरो प्रश्न'), basis: p('Cards drawn for the question', 'प्रश्न हेतु निकाले गए पत्ते'), href: '/tarot' },
  { name: p('Ashtamangala / Kerala Prashna', 'अष्टमंगल / केरल प्रश्न'), basis: p('Cowries, Aroodha and Swarna-prashna rituals done by a learned astrologer', 'कौड़ियाँ, आरूढ़ और स्वर्ण-प्रश्न — विद्वान ज्योतिषी द्वारा'), href: '/astrologers' },
  { name: p('Tajik Prashna', 'ताजिक प्रश्न'), basis: p('Ithasala, Ishraf and other Tajik yogas in the prashna chart', 'प्रश्न कुंडली में इत्थशाल, ईसराफ आदि ताजिक योग'), href: '/prashna/kundali' },
  { name: p('KP Horary (1–249)', 'केपी प्रश्न (1–249)'), basis: p('Number → sub-lord of the Lagna (Krishnamurti Paddhati)', 'अंक → लग्न का उप-स्वामी (कृष्णमूर्ति पद्धति)'), href: '/prashna/ank' },
  { name: p('Ramal & Pasha Kevali', 'रमल एवं पाशा केवली'), basis: p('Dice / geomantic figures thrown for the question', 'प्रश्न हेतु फेंके गए पासे / रमल आकृतियाँ'), href: '/astrologers' },
  { name: p('Shakun (omens)', 'शकुन विचार'), basis: p('Sounds, sights and events at the moment of asking', 'प्रश्न के क्षण की ध्वनि, दृश्य और घटनाएँ'), href: '#shakun' },
];

const RULES = [
  p('Ask only when the question is truly troubling you — Prashna answers sincere need, not testing or curiosity.', 'प्रश्न तभी पूछें जब वह सचमुच मन में हो — प्रश्न शास्त्र सच्ची आवश्यकता का उत्तर देता है, परीक्षा या कौतूहल का नहीं।'),
  p('One question at a time, clearly framed: "Will I get…", "Will it happen…", "Where is…".', 'एक बार में एक प्रश्न, स्पष्ट शब्दों में: "क्या मुझे… मिलेगा", "क्या… होगा", "… कहाँ है"।'),
  p('Do not repeat the same question on the same day, or change the method until you like the answer.', 'एक ही दिन वही प्रश्न दोबारा न पूछें, न ही मनचाहा उत्तर आने तक विधि बदलें।'),
  p('Remember your Ishta Devata, sit facing East or North and keep the mind calm.', 'अपने इष्टदेव का स्मरण करें, पूर्व या उत्तर की ओर मुख करके शांत मन से बैठें।'),
  p('Avoid asking during Rahu Kaal or while angry, drunk or in a hurry.', 'राहु काल में, क्रोध, नशे या जल्दबाज़ी में प्रश्न न पूछें।'),
  p('Treat the answer as guidance: act with effort and do the suggested upay.', 'उत्तर को मार्गदर्शन मानें: प्रयास करें और बताए उपाय करें।'),
];

const SHAKUN_GOOD = [
  p('Hearing a conch, temple bell or mantra', 'शंख, मंदिर की घंटी या मंत्र की ध्वनि सुनाई देना'),
  p('Seeing a cow with calf, a full water pot, flowers or fruits', 'बछड़े सहित गाय, भरा जल-कलश, फूल या फल दिखना'),
  p('A married woman, a child or a Brahmin arriving', 'सुहागिन स्त्री, बालक या ब्राह्मण का आना'),
  p('Someone saying "yes", "done" or "good" at that moment', 'उसी क्षण किसी का "हाँ", "हो गया" या "अच्छा" कहना'),
  p('Birds flying from left to right, a peacock or a blue jay (neelkanth)', 'पक्षियों का बाएँ से दाएँ उड़ना, मोर या नीलकंठ दिखना'),
];
const SHAKUN_BAD = [
  p('Sneezing at the moment of asking', 'प्रश्न के क्षण छींक आना'),
  p('Crying, quarrel or a broken object', 'रोना, झगड़ा या कोई वस्तु टूटना'),
  p('Someone saying "no", "lost", "finished" at that moment', 'उसी क्षण किसी का "नहीं", "खो गया", "ख़त्म" कहना'),
  p('An empty pot, smoke or a lamp going out', 'ख़ाली बर्तन, धुआँ या दीपक बुझना'),
  p('A cat crossing the path or a dog howling', 'बिल्ली का रास्ता काटना या कुत्ते का रोना'),
];

const FAQ = [
  {
    q: p('What is Prashna Kundali?', 'प्रश्न कुंडली क्या है?'),
    a: p('Prashna (horary) astrology answers a specific question from a chart cast for the exact moment it is asked. It is ideal when birth time is unknown or the question is urgent: "Will I get the job?", "Where is my lost ring?", "Will the case be decided in my favour?".', 'प्रश्न कुंडली किसी विशेष प्रश्न का उत्तर उसी क्षण की कुंडली से देती है जब प्रश्न पूछा गया। जन्म समय ज्ञात न हो या प्रश्न तात्कालिक हो तब यह सर्वोत्तम है: "क्या नौकरी मिलेगी?", "खोई अंगूठी कहाँ है?", "क्या मुकदमे में जीत होगी?"।'),
  },
  {
    q: p('Which method should I use?', 'मुझे कौन-सी विधि अपनानी चाहिए?'),
    a: p('Use Prashna Kundali for a detailed astrological answer with timing; Ram Shalaka when you seek Shri Ram\'s blessing; Hast Rekha if you can photograph your palm; Phal-Sabzi, Ank or Swar for a quick answer anywhere. Choose one method per question.', 'समय सहित विस्तृत ज्योतिषीय उत्तर हेतु प्रश्न कुंडली; श्रीराम का आशीर्वाद चाहिए तो राम शलाका; हथेली की फ़ोटो ले सकें तो हस्त रेखा; कहीं भी तुरंत उत्तर हेतु फल-सब्ज़ी, अंक या स्वर प्रश्न। एक प्रश्न के लिए एक ही विधि चुनें।'),
  },
  {
    q: p('Do I need my birth details?', 'क्या जन्म विवरण चाहिए?'),
    a: p('No. Every Prashna method works from the moment of the question, not your birth chart.', 'नहीं। प्रश्न की हर विधि प्रश्न के क्षण से काम करती है, जन्म कुंडली से नहीं।'),
  },
  {
    q: p('Can I ask for someone else?', 'क्या किसी और के लिए पूछ सकते हैं?'),
    a: p('Yes, if you are genuinely concerned (a family member\'s health, a child\'s exam). Frame it clearly, e.g. "Will my son pass the exam?"', 'हाँ, यदि आप सच में चिंतित हैं (परिवार के किसी सदस्य का स्वास्थ्य, बच्चे की परीक्षा)। प्रश्न स्पष्ट रखें, जैसे "क्या मेरा बेटा परीक्षा में उत्तीर्ण होगा?"'),
  },
];

export default function PrashnaHub() {
  const { t } = useLang();
  return (
    <div className={`container ${s.wrap}`}>
      <MethodTabs />
      <QuestionBox />

      <section>
        <StepHead>{t({ en: 'Choose how you want your answer', hi: 'उत्तर पाने की विधि चुनें' })}</StepHead>
        <div className={s.methodGrid}>
          {METHODS.map((m) => (
            <Link key={m.slug} href={`/prashna/${m.slug}`} className={s.methodCard}>
              <span className={s.methodIcon} aria-hidden="true">{m.icon}</span>
              <strong>{t(m.title)}</strong>
              <small>{t(m.short)}</small>
              <p>{t(m.text)}</p>
              <em>{t({ en: 'Ask now →', hi: 'अभी पूछें →' })}</em>
            </Link>
          ))}
        </div>
      </section>

      <section className={s.panel}>
        <StepHead>{t({ en: 'What is Prashna Shastra?', hi: 'प्रश्न शास्त्र क्या है?' })}</StepHead>
        <p className={s.lead}>
          {t({
            en: 'Prashna Shastra is the branch of Jyotish that answers a question from the moment it is asked. Classical texts such as Prashna Marga, Prashna Tantra, Shatpanchashika (by Varahamihira\'s son Prithuyashas) and Tajik Neelakanthi teach that the time, the sign rising, the words spoken and even the omens around the questioner reflect the answer. Alongside the chart, Indian tradition has many simpler prashna methods — from the Ram Shalaka of the Ramcharitmanas to finger, name, number and breath methods.',
            hi: 'प्रश्न शास्त्र ज्योतिष की वह शाखा है जो प्रश्न के क्षण से ही उसका उत्तर देती है। प्रश्न मार्ग, प्रश्न तंत्र, षट्पंचाशिका (वराहमिहिर के पुत्र पृथुयशा कृत) और ताजिक नीलकंठी जैसे ग्रंथ बताते हैं कि प्रश्न का समय, उदित लग्न, बोले गए शब्द और प्रश्नकर्ता के आसपास के शकुन — सब उत्तर को प्रतिबिंबित करते हैं। कुंडली के साथ भारतीय परम्परा में अनेक सरल प्रश्न विधियाँ भी हैं — रामचरितमानस की राम शलाका से लेकर अंगुली, नाम, अंक और स्वर विधियों तक।',
          })}
        </p>
      </section>

      <section className={s.panel}>
        <StepHead>{t({ en: 'All types of Prashna', hi: 'प्रश्न के सभी प्रकार' })}</StepHead>
        <div className={s.tableScroll}>
          <table className={s.typeTable}>
            <thead>
              <tr>
                <th>{t({ en: 'Type', hi: 'प्रकार' })}</th>
                <th>{t({ en: 'Based on', hi: 'आधार' })}</th>
                <th>{t({ en: 'Try it', hi: 'आज़माएँ' })}</th>
              </tr>
            </thead>
            <tbody>
              {TYPES.map((ty) => (
                <tr key={ty.name.en}>
                  <td>
                    <strong>{t(ty.name)}</strong>
                  </td>
                  <td>{t(ty.basis)}</td>
                  <td>
                    <Link href={ty.href}>
                      {ty.href === '/astrologers' ? t({ en: 'Ask an astrologer', hi: 'ज्योतिषी से पूछें' }) : ty.href === '#shakun' ? t({ en: 'Read below', hi: 'नीचे पढ़ें' }) : t({ en: 'Open', hi: 'खोलें' })} →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className={s.two}>
        <section className={s.panel}>
          <StepHead>{t({ en: 'Rules for asking', hi: 'प्रश्न पूछने के नियम' })}</StepHead>
          <ol className={s.ruleList}>
            {RULES.map((r) => (
              <li key={r.en}>{t(r)}</li>
            ))}
          </ol>
        </section>
        <section className={s.panel} id="shakun" style={{ scrollMarginTop: 'calc(var(--header-h) + 16px)' }}>
          <StepHead>{t({ en: 'Shakun at the moment of asking', hi: 'प्रश्न के समय शकुन' })}</StepHead>
          <p className={s.qHint}>✅ {t({ en: 'Good omens', hi: 'शुभ शकुन' })}</p>
          <ul className={s.ruleList}>
            {SHAKUN_GOOD.map((x) => (
              <li key={x.en}>{t(x)}</li>
            ))}
          </ul>
          <p className={s.qHint}>⚠️ {t({ en: 'Inauspicious omens (wait and ask later)', hi: 'अशुभ शकुन (रुककर बाद में पूछें)' })}</p>
          <ul className={s.ruleList}>
            {SHAKUN_BAD.map((x) => (
              <li key={x.en}>{t(x)}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className={s.panel}>
        <StepHead>{t({ en: 'Frequently asked questions', hi: 'सामान्य प्रश्न' })}</StepHead>
        <div className={s.chaupaiList}>
          {FAQ.map((f) => (
            <details key={f.q.en}>
              <summary>{t(f.q)}</summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}

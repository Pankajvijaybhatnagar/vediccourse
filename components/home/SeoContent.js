'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import styles from './home.module.css';

const CONTENT = {
  en: {
    h: 'Free Online Astrology Prediction',
    intro: [
      'Astrology is a predictive science that helps astrologers understand an individual’s unique traits from birth, revealing strengths, weaknesses and potential life paths. By studying the positions of the Sun, Moon and planets at the time of birth, astrologers offer valuable insights into love, career, health and relationships. VedicDhaam gives you access to Vedic astrology, KP astrology, Lal Kitab, numerology, tarot and Vastu, all in one trusted place.',
      'India gifted the world the profound science of Vedic astrology, which studies the influence of planetary movements on human life. For centuries, Jyotish has guided families toward happiness and success and offered solace in challenging times. VedicDhaam brings this ancient wisdom to your fingertips, in Hindi and English, connecting you with verified astrologers who serve as guides, friends and counsellors on your life journey.',
    ],
    lead: 'Let’s explore the two prominent branches of astrology: Indian Astrology and Western Astrology.',
    sections: [
      { h: 'Indian Astrology (Vedic Astrology)', p: 'Indian astrology, also known as Vedic astrology or Jyotish Shastra, has a rich history dating back thousands of years. It considers 27 Nakshatras (constellations), 9 Grahas (planets), 12 Rashis (zodiac signs) and 12 Bhavas (houses). Your Janam Kundli shows the placement of the nine planets across the twelve houses at the moment of birth. Different schools emphasise planetary periods (Dashas) or special combinations (Yogas), and Vedic astrology is widely used for marriage matching, career guidance, muhurat selection and remedies.' },
      { h: 'Western Astrology', p: 'Western astrology uses the tropical zodiac, based on the seasons and the Sun’s position relative to the equator. It places strong emphasis on the Sun sign and on psychological aspects of personality, and uses techniques like transits and progressions to understand future trends. Both systems share the same twelve signs, but the Vedic (sidereal) zodiac is currently about 24° behind the Western one.' },
    ],
    chartH: 'Astrology Chart (Janam Kundli)',
    chartP: 'A birth chart maps the positions of the planets at the exact moment of your birth. It reveals your inherent strengths and challenges, and points to opportune times for decisions and growth. Here is what astrologers consider when analysing a Kundli:',
    bullets: [
      'The position of each planet in the 12 houses',
      'The placement of the Moon, Venus and Mars',
      'Jupiter’s placement for luck and opportunities',
      'Saturn’s placement for challenges and areas requiring effort',
      'Aspects (Drishti) formed between planets',
      'The balance of the four elements: fire, earth, air and water',
      'The running Mahadasha and Antardasha',
      'Yogas and Doshas such as Raj Yoga, Manglik Dosha and Kaal Sarp Dosha',
    ],
    outro: 'A skilled astrologer on VedicDhaam considers all these factors to give you accurate guidance. If your chart shows an imbalance, they can suggest simple remedies such as mantras, charity, gemstones or rituals to restore harmony.',
    cta: 'Generate your free Kundli',
  },
  hi: {
    h: 'मुफ़्त ऑनलाइन ज्योतिष भविष्यवाणी',
    intro: [
      'ज्योतिष एक भविष्यसूचक विज्ञान है जो जन्म से ही व्यक्ति के विशेष गुणों, शक्तियों, कमज़ोरियों और जीवन की संभावित दिशाओं को समझने में मदद करता है। जन्म के समय सूर्य, चंद्रमा और ग्रहों की स्थिति का अध्ययन करके ज्योतिषी प्रेम, करियर, स्वास्थ्य और संबंधों के बारे में मूल्यवान मार्गदर्शन देते हैं। वैदिकधाम पर आपको वैदिक ज्योतिष, केपी पद्धति, लाल किताब, अंक ज्योतिष, टैरो और वास्तु, सब एक ही विश्वसनीय स्थान पर मिलते हैं।',
      'भारत ने दुनिया को वैदिक ज्योतिष का गहन विज्ञान दिया है, जो मानव जीवन पर ग्रहों की गति के प्रभाव का अध्ययन करता है। सदियों से ज्योतिष ने परिवारों को सुख और सफलता की ओर मार्गदर्शन दिया है और कठिन समय में सांत्वना दी है। वैदिकधाम इस प्राचीन ज्ञान को हिंदी और अंग्रेज़ी में आपकी उँगलियों तक लाता है और आपको ऐसे सत्यापित ज्योतिषियों से जोड़ता है जो जीवन यात्रा में मार्गदर्शक, मित्र और सलाहकार बनते हैं।',
    ],
    lead: 'आइए ज्योतिष की दो प्रमुख शाखाओं को जानें: भारतीय ज्योतिष और पाश्चात्य ज्योतिष।',
    sections: [
      { h: 'भारतीय ज्योतिष (वैदिक ज्योतिष)', p: 'भारतीय ज्योतिष, जिसे वैदिक ज्योतिष या ज्योतिष शास्त्र भी कहते हैं, का इतिहास हज़ारों वर्ष पुराना है। इसमें 27 नक्षत्र, 9 ग्रह, 12 राशियाँ और 12 भाव शामिल हैं। आपकी जन्म कुंडली जन्म के क्षण में बारह भावों में नौ ग्रहों की स्थिति दर्शाती है। विभिन्न पद्धतियाँ दशाओं या योगों पर ज़ोर देती हैं, और वैदिक ज्योतिष का उपयोग विवाह मिलान, करियर मार्गदर्शन, मुहूर्त चयन और उपायों के लिए व्यापक रूप से होता है।' },
      { h: 'पाश्चात्य ज्योतिष', p: 'पाश्चात्य ज्योतिष सायन (ट्रॉपिकल) राशिचक्र का उपयोग करता है, जो ऋतुओं और भूमध्य रेखा के सापेक्ष सूर्य की स्थिति पर आधारित है। यह सूर्य राशि और व्यक्तित्व के मनोवैज्ञानिक पहलुओं पर अधिक ध्यान देता है तथा भविष्य के रुझान समझने के लिए गोचर और प्रोग्रेशन का उपयोग करता है। दोनों पद्धतियों में बारह राशियाँ समान हैं, पर वैदिक (निरयन) राशिचक्र वर्तमान में पाश्चात्य से लगभग 24° पीछे है।' },
    ],
    chartH: 'ज्योतिष चार्ट (जन्म कुंडली)',
    chartP: 'जन्म कुंडली आपके जन्म के सटीक क्षण में ग्रहों की स्थिति का मानचित्र है। यह आपकी स्वाभाविक शक्तियों और चुनौतियों को दर्शाती है और निर्णय व प्रगति के शुभ समय की ओर संकेत करती है। कुंडली विश्लेषण में ज्योतिषी इन बातों पर ध्यान देते हैं:',
    bullets: [
      '12 भावों में प्रत्येक ग्रह की स्थिति',
      'चंद्रमा, शुक्र और मंगल की स्थिति',
      'भाग्य और अवसरों के लिए बृहस्पति की स्थिति',
      'चुनौतियों और परिश्रम के क्षेत्रों के लिए शनि की स्थिति',
      'ग्रहों के बीच बनने वाली दृष्टि',
      'चार तत्वों का संतुलन: अग्नि, पृथ्वी, वायु और जल',
      'चल रही महादशा और अंतर्दशा',
      'राजयोग, मांगलिक दोष और काल सर्प दोष जैसे योग और दोष',
    ],
    outro: 'वैदिकधाम के अनुभवी ज्योतिषी इन सभी पहलुओं पर विचार करके आपको सटीक मार्गदर्शन देते हैं। यदि कुंडली में कोई असंतुलन हो, तो वे मंत्र, दान, रत्न या पूजा जैसे सरल उपाय सुझा सकते हैं।',
    cta: 'अपनी मुफ़्त कुंडली बनाएँ',
  },
};

export default function SeoContent() {
  const { lang } = useLang();
  const c = CONTENT[lang];
  return (
    <article className={styles.seo}>
      <h2>{c.h}</h2>
      {c.intro.map((p) => (
        <p key={p.slice(0, 20)}>{p}</p>
      ))}
      <p>
        <strong>{c.lead}</strong>
      </p>
      {c.sections.map((s) => (
        <section key={s.h}>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </section>
      ))}
      <h3>{c.chartH}</h3>
      <p>{c.chartP}</p>
      <ul>
        {c.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p>
        {c.outro}{' '}
        <Link href="/birth-chart" className={styles.seoLink}>
          {c.cta} →
        </Link>
      </p>
    </article>
  );
}

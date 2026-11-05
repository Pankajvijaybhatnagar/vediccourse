'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, FileText, Hand, HeartHandshake, Languages, Sparkles, UserRound } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import ManglikMeter from '@/components/ManglikMeter';
import styles from './palmistrySection.module.css';

const p = (en, hi) => ({ en, hi });

// Lines drawn on the illustrated palm (right hand, palm facing the viewer: thumb on the right).
const LINES = [
  { key: 'heart', color: '#ff6b8b', d: 'M66 196 C108 184 150 190 198 162', name: p('Heart line', 'हृदय रेखा'), text: p('Emotions, love and how you connect with people.', 'भावनाएँ, प्रेम और लोगों से आपका जुड़ाव।') },
  { key: 'head', color: '#5fb8ff', d: 'M234 210 C190 216 132 230 84 258', name: p('Head line', 'मस्तिष्क रेखा'), text: p('Thinking style, focus and decision making.', 'सोचने का ढंग, एकाग्रता और निर्णय क्षमता।') },
  { key: 'life', color: '#ffc21a', d: 'M232 212 C192 240 176 292 194 338', name: p('Life line', 'जीवन रेखा'), text: p('Vitality, stamina and major life changes.', 'ऊर्जा, सहनशक्ति और जीवन के बड़े बदलाव।') },
  { key: 'fate', color: '#b58cff', d: 'M152 340 C150 292 148 232 140 180', name: p('Fate line', 'भाग्य रेखा'), text: p('Career path, duty and the role of destiny.', 'करियर, कर्तव्य और भाग्य की भूमिका।') },
  { key: 'sun', color: '#ff9a3c', d: 'M108 318 C110 280 114 236 112 200', name: p('Sun line', 'सूर्य रेखा'), text: p('Fame, creativity and recognition.', 'यश, रचनात्मकता और पहचान।') },
];

const STEPS = [
  { Icon: UserRound, title: p('Choose whose palm', 'किसकी हथेली चुनें'), text: p('Man: right hand · Woman: left hand, as in Samudrik Shastra.', 'पुरुष: दायाँ हाथ · स्त्री: बायाँ हाथ, सामुद्रिक शास्त्र के अनुसार।') },
  { Icon: Camera, title: p('Click or upload a photo', 'फ़ोटो खींचें या अपलोड करें'), text: p('Open palm, good light. Works straight from your phone camera.', 'खुली हथेली, अच्छी रोशनी। सीधे फ़ोन कैमरे से।') },
  { Icon: FileText, title: p('Get the full report', 'पूरी रिपोर्ट पाएँ'), text: p('Lines, mounts, signs, life areas and simple upay in about a minute.', 'रेखाएँ, पर्वत, चिह्न, जीवन क्षेत्र और सरल उपाय, लगभग एक मिनट में।') },
];

const COVERS = [
  p('7 main lines', '7 मुख्य रेखाएँ'),
  p('7 mounts (parvat)', '7 पर्वत'),
  p('Trishul, star, cross & more', 'त्रिशूल, तारा, क्रॉस आदि'),
  p('Career · Love · Health', 'करियर · प्रेम · स्वास्थ्य'),
  p('Remedies (upay)', 'उपाय'),
];

// Worked example for the Manglik card: Mars 7th from Lagna, 4th from Moon, 2nd from Venus.
const MANGLIK_DEMO = {
  percent: 70,
  level: 'anshik',
  label: p('Anshik (partial) Manglik · 70%', 'आंशिक मांगलिक · 70%'),
  steps: [
    { from: 'lagna', name: p('Lagna', 'लग्न'), house: 7, hit: true, checked: true, points: 40 },
    { from: 'moon', name: p('Moon', 'चंद्र'), house: 4, hit: true, checked: true, points: 30 },
    { from: 'venus', name: p('Venus', 'शुक्र'), house: 2, hit: false, checked: true, points: 0 },
  ],
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

function PalmArt({ active, onPick, t }) {
  return (
    <svg viewBox="0 0 300 380" className={styles.palm} role="img" aria-label={t({ en: 'Illustrated palm with its main lines', hi: 'मुख्य रेखाओं सहित हथेली का चित्र' })}>
      <defs>
        <linearGradient id="palmSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9c9" />
          <stop offset="1" stopColor="#f6cf98" />
        </linearGradient>
        <radialGradient id="palmGlow" cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="rgba(255,214,90,0.45)" />
          <stop offset="1" stopColor="rgba(255,214,90,0)" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="220" r="150" fill="url(#palmGlow)" />
      <g fill="url(#palmSkin)" stroke="#d9a868" strokeWidth="2">
        {/* fingers: little, ring, middle, index (left → right), then thumb on the right */}
        <rect x="62" y="96" width="40" height="120" rx="20" />
        <rect x="104" y="56" width="42" height="150" rx="21" />
        <rect x="148" y="44" width="42" height="160" rx="21" />
        <rect x="192" y="68" width="40" height="140" rx="20" />
        <rect x="226" y="198" width="46" height="120" rx="23" transform="rotate(-38 249 258)" />
        <path d="M60 196 C58 150 76 150 120 150 L196 150 C232 150 244 170 244 214 C244 290 226 352 150 356 C82 352 62 300 60 196 Z" />
      </g>
      {/* finger creases */}
      <g stroke="#e3b57a" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <path d="M70 140 h24 M112 104 h26 M156 94 h26 M200 112 h24" />
      </g>
      {/* wrist bracelet lines (manibandh) */}
      <g stroke="#e3b57a" strokeWidth="1.4" fill="none" opacity="0.7">
        <path d="M100 350 C130 360 170 360 200 350" />
      </g>
      {LINES.map((l, i) => (
        <path
          key={l.key}
          d={l.d}
          pathLength="1"
          className={`${styles.line} ${active === i ? styles.lineOn : ''}`}
          style={{ '--c': l.color, '--d': `${i * 0.25}s` }}
          onMouseEnter={() => onPick(i)}
        />
      ))}
    </svg>
  );
}

export default function PalmistrySection() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % LINES.length), 2600);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const line = LINES[active];

  return (
    <section className={styles.section} aria-labelledby="palm-home-title">
      <div className={styles.top}>
        <Reveal className={styles.intro}>
          <span className={styles.badge}>
            <Sparkles size={15} /> {t({ en: 'New · AI Hast Rekha', hi: 'नया · AI हस्त रेखा' })}
          </span>
          <h2 id="palm-home-title">
            {t({ en: 'Your palm, read by ', hi: 'आपकी हथेली, ' })}
            <span>{t({ en: 'AI', hi: 'AI से पढ़ी गई' })}</span>
          </h2>
          <p className={styles.lead}>
            {t({
              en: 'Upload one photo of your hand and get a complete Samudrik Shastra reading of your lines, mounts and special signs, written in both Hindi and English.',
              hi: 'अपने हाथ की एक फ़ोटो अपलोड करें और पाएँ सामुद्रिक शास्त्र के अनुसार रेखाओं, पर्वतों और विशेष चिह्नों का पूरा विश्लेषण, हिंदी और अंग्रेज़ी दोनों में।',
            })}
          </p>

          <ol className={styles.steps}>
            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title.en}>
                <span className={styles.stepIcon}>
                  <Icon size={20} />
                  <b>{i + 1}</b>
                </span>
                <span>
                  <strong>{t(title)}</strong>
                  <small>{t(text)}</small>
                </span>
              </li>
            ))}
          </ol>

          <ul className={styles.covers}>
            {COVERS.map((c) => (
              <li key={c.en}>{t(c)}</li>
            ))}
            <li className={styles.bilingual}>
              <Languages size={14} /> {t({ en: 'Hindi + English', hi: 'हिंदी + English' })}
            </li>
          </ul>

          <div className={styles.ctas}>
            <Link href="/palmistry?gender=male" className="btn btn-primary btn-lg">
              <Hand size={18} /> {t({ en: 'Read my palm', hi: 'मेरी हस्त रेखा पढ़ें' })}
            </Link>
            <div className={styles.handPick}>
              <Link href="/palmistry?gender=male">
                ♂ {t({ en: 'Man · right hand', hi: 'पुरुष · दायाँ हाथ' })}
              </Link>
              <Link href="/palmistry?gender=female">
                ♀ {t({ en: 'Woman · left hand', hi: 'स्त्री · बायाँ हाथ' })}
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.visual}>
          <div className={styles.palmCard} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <PalmArt active={active} onPick={setActive} t={t} />
            <div className={styles.legend} role="tablist" aria-label={t({ en: 'Palm lines', hi: 'हस्त रेखाएँ' })}>
              {LINES.map((l, i) => (
                <button
                  key={l.key}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={active === i ? styles.legendOn : ''}
                  style={{ '--c': l.color }}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                >
                  {t(l.name)}
                </button>
              ))}
            </div>
            <p className={styles.lineInfo} aria-live="polite">
              <strong style={{ color: line.color }}>{t(line.name)}:</strong> {t(line.text)}
            </p>
          </div>
        </Reveal>
      </div>

      <div className={styles.cards}>
        <Reveal>
          <Link href="/birth-chart" className={styles.card}>
            <strong>{t({ en: 'Manglik dosha, now in percent', hi: 'मांगलिक दोष, अब प्रतिशत में' })}</strong>
            <div className={styles.demo}>
              <ManglikMeter data={MANGLIK_DEMO} compact />
              <small className={styles.demoNote}>{t({ en: 'Example chart', hi: 'उदाहरण कुंडली' })}</small>
            </div>
            <span className={styles.cardCta}>
              {t({ en: 'Check my Manglik %', hi: 'मेरा मांगलिक % जाँचें' })} <ArrowRight size={16} />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <Link href="/kundli-milan" className={styles.card}>
            <span className={styles.cardTag}>{t({ en: 'Kundli Milan', hi: 'कुंडली मिलान' })}</span>
            <strong>{t({ en: 'Both kundlis, side by side', hi: 'दोनों कुंडलियाँ, आमने-सामने' })}</strong>
            <span className={styles.cardText}>
              {t({
                en: '36-guna Ashtakoot match with the Lagna chart of the boy and the girl, Manglik % for each, and a palm reading for both.',
                hi: '36 गुणों का अष्टकूट मिलान, वर और कन्या दोनों की लग्न कुंडली, दोनों का मांगलिक % और दोनों की हस्त रेखा।',
              })}
            </span>
            <div className={styles.charts} aria-hidden="true">
              {['boy', 'girl'].map((r) => (
                <span key={r} className={`${styles.mini} ${styles[r]}`}>
                  <svg viewBox="0 0 100 100">
                    <rect x="2" y="2" width="96" height="96" rx="4" />
                    <path d="M2 2 L98 98 M98 2 L2 98 M50 2 L98 50 L50 98 L2 50 Z" />
                  </svg>
                  <small>{r === 'boy' ? t({ en: '♂ Var', hi: '♂ वर' }) : t({ en: '♀ Kanya', hi: '♀ कन्या' })}</small>
                </span>
              ))}
              <span className={styles.heart}>
                <HeartHandshake size={26} />
              </span>
            </div>
            <span className={styles.cardCta}>
              {t({ en: 'Match two kundlis', hi: 'कुंडली मिलान करें' })} <ArrowRight size={16} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

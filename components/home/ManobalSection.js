'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, BookOpen, Repeat, Compass, ShieldCheck, Phone, Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import styles from './manobalSection.module.css';

const p = (en, hi) => ({ en, hi });

const STEPS = [
  {
    Icon: ClipboardCheck,
    title: p('Check in with yourself', 'स्वयं को जाँचें'),
    text: p('Take a 2-minute private self-check to understand your stress, anxiety or mood today.', '2 मिनट की गोपनीय स्व-जाँच से जानें कि आज आपका तनाव, चिंता या मनोदशा कैसी है।'),
    href: '/manobal/self-check',
    cta: p('Start self-check', 'स्व-जाँच करें'),
  },
  {
    Icon: BookOpen,
    title: p('Pick your chapter', 'अपना अध्याय चुनें'),
    text: p('12 simple chapters. Begin from Chapter 1, or jump straight to the problem you are facing.', '12 सरल अध्याय। पहले अध्याय से आरंभ करें, या सीधे अपनी समस्या वाले अध्याय पर जाएँ।'),
    href: '/manobal#chapters',
    cta: p('See chapters', 'अध्याय देखें'),
  },
  {
    Icon: Repeat,
    title: p('Practise 10 minutes daily', 'प्रतिदिन 10 मिनट अभ्यास'),
    text: p('Breathing, thought journal, mood tracker and focus timer — small daily practice rewires the brain.', 'श्वास, विचार डायरी, मनोदशा ट्रैकर और फ़ोकस टाइमर — छोटा दैनिक अभ्यास मस्तिष्क को नया रूप देता है।'),
    href: '/manobal#toolkit',
    cta: p('Open toolkit', 'अभ्यास खोलें'),
  },
  {
    Icon: Compass,
    title: p('Get career & life guidance', 'करियर एवं जीवन मार्गदर्शन'),
    text: p('Career Compass combines your interests with your Kundli’s 10th house. Talk to a counsellor when you need.', 'करियर कम्पास आपकी रुचियों को कुंडली के दशम भाव से जोड़ता है। आवश्यकता हो तो परामर्शदाता से बात करें।'),
    href: '/manobal/career-compass',
    cta: p('Find my direction', 'मेरी दिशा खोजें'),
  },
];

const QUICK = [
  { emoji: '📚', label: p('Exam stress', 'परीक्षा का तनाव'), href: '/manobal/pariksha-ka-tanav' },
  { emoji: '🌊', label: p('Anxiety', 'घबराहट'), href: '/manobal/chinta-se-mukti' },
  { emoji: '🌧️', label: p('Feeling low', 'उदासी'), href: '/manobal/udasi-se-bahar' },
  { emoji: '🌙', label: p('Poor sleep', 'नींद की समस्या'), href: '/manobal/neend-aur-dinacharya' },
  { emoji: '🧭', label: p('Career confusion', 'करियर की उलझन'), href: '/manobal/career-compass' },
  { emoji: '🏠', label: p('Family conflict', 'पारिवारिक मतभेद'), href: '/manobal/sambandh-aur-samvad' },
];

const PREVIEW_TASKS = [
  p('3 minutes of calm breathing', '3 मिनट शांत श्वास'),
  p('Log today’s mood', 'आज की मनोदशा दर्ज करें'),
  p('Read Chapter 3 — Thoughts', 'अध्याय 3 पढ़ें — विचार'),
  p('Write 3 gratitudes', '3 कृतज्ञताएँ लिखें'),
];

// Cycles the preview's breathing cue so visitors see how the guided practice feels.
function useBreathCue() {
  const [inhale, setInhale] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setInhale((v) => !v), 4000);
    return () => clearInterval(id);
  }, []);
  return inhale;
}

export default function ManobalSection() {
  const { t } = useLang();
  const inhale = useBreathCue();
  const [checked, setChecked] = useState([true, true, false, false]);

  return (
    <section className={styles.section} aria-labelledby="manobal-home-title">
      <div className={styles.top}>
        <Reveal className={styles.intro}>
          <span className={styles.badge}>
            <span aria-hidden="true">🧘</span> {t({ en: 'New · Manobal', hi: 'नया · मनोबल' })}
          </span>
          <h2 id="manobal-home-title">
            {t({ en: 'Strengthen your mind,', hi: 'मन को सशक्त,' })} <span>{t({ en: 'clarify your path', hi: 'राह को स्पष्ट करें' })}</span>
          </h2>
          <p className={styles.lead}>
            {t({
              en: 'Manobal is a free, guided programme for students and people of every age facing stress, anxiety, low mood, sleep problems or career confusion. It blends proven psychology with the wisdom of Vedic astrology — step by step, in Hindi and English.',
              hi: 'मनोबल एक निःशुल्क, मार्गदर्शित कार्यक्रम है — विद्यार्थियों और हर आयु के उन लोगों के लिए जो तनाव, चिंता, उदासी, नींद की समस्या या करियर की उलझन से गुज़र रहे हैं। इसमें प्रमाणित मनोविज्ञान और वैदिक ज्योतिष का ज्ञान एक साथ, चरणबद्ध रूप से, हिंदी और अंग्रेज़ी में मिलता है।',
            })}
          </p>
          <div className={styles.stats}>
            <span>
              <b>12</b>
              {t({ en: 'guided chapters', hi: 'मार्गदर्शित अध्याय' })}
            </span>
            <span>
              <b>7</b>
              {t({ en: 'daily practice tools', hi: 'दैनिक अभ्यास साधन' })}
            </span>
            <span>
              <b>
                <ShieldCheck size={22} />
              </b>
              {t({ en: 'free & 100% private', hi: 'निःशुल्क एवं पूर्ण गोपनीय' })}
            </span>
          </div>
          <div className={styles.ctas}>
            <Link href="/manobal" className="btn btn-primary btn-lg">
              {t({ en: 'Start Manobal', hi: 'मनोबल आरंभ करें' })} <ArrowRight size={18} />
            </Link>
            <Link href="/manobal/self-check" className={`btn btn-ghost btn-lg ${styles.ghost}`}>
              {t({ en: '2-minute self-check', hi: '2 मिनट की स्व-जाँच' })}
            </Link>
          </div>
        </Reveal>

        {/* A small, live preview of what the daily experience looks like */}
        <Reveal delay={150} className={styles.preview} aria-hidden="true">
          <div className={styles.device}>
            <div className={styles.deviceHead}>
              <span>{t({ en: 'Today in Manobal', hi: 'आज का मनोबल' })}</span>
              <small>🔥 {t({ en: '5-day streak', hi: '5 दिन लगातार' })}</small>
            </div>
            <div className={styles.breath}>
              <span className={`${styles.orb} ${inhale ? styles.orbIn : styles.orbOut}`} />
              <strong>{inhale ? t({ en: 'Breathe in…', hi: 'श्वास लें…' }) : t({ en: 'Breathe out…', hi: 'श्वास छोड़ें…' })}</strong>
            </div>
            <div className={styles.moodRow}>
              {['😢', '😔', '😐', '🙂', '😄'].map((m, i) => (
                <span key={m} className={i === 3 ? styles.moodOn : ''}>
                  {m}
                </span>
              ))}
            </div>
            <ul className={styles.tasks}>
              {PREVIEW_TASKS.map((task, i) => (
                <li key={task.en} className={checked[i] ? styles.taskDone : ''} onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}>
                  <span className={styles.tick}>{checked[i] && <Check size={12} strokeWidth={3} />}</span>
                  {t(task)}
                </li>
              ))}
            </ul>
            <div className={styles.careerMini}>
              <span>🧭</span>
              <div>
                <small>{t({ en: 'Career Compass', hi: 'करियर कम्पास' })}</small>
                <strong>{t({ en: 'Investigative · Social', hi: 'अन्वेषक · सामाजिक' })}</strong>
              </div>
              <em>{t({ en: '10th lord: Jupiter', hi: 'दशमेश: गुरु' })}</em>
            </div>
          </div>
        </Reveal>
      </div>

      {/* How it works */}
      <div className={styles.howHead}>
        <h3>{t({ en: 'How Manobal works — 4 simple steps', hi: 'मनोबल कैसे काम करता है — 4 सरल चरण' })}</h3>
      </div>
      <ol className={styles.steps}>
        {STEPS.map(({ Icon, title, text, href, cta }, i) => (
          <Reveal as="li" key={title.en} delay={i * 100} className={styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            <span className={styles.stepIcon}>
              <Icon size={22} />
            </span>
            <strong>{t(title)}</strong>
            <p>{t(text)}</p>
            <Link href={href} className={styles.stepLink}>
              {t(cta)} <ArrowRight size={14} />
            </Link>
          </Reveal>
        ))}
      </ol>

      {/* Quick start */}
      <div className={styles.quick}>
        <span className={styles.quickLabel}>{t({ en: 'Or start with what you feel right now:', hi: 'या अभी जो अनुभव कर रहे हैं, वहीं से आरंभ करें:' })}</span>
        <div className={styles.chips}>
          {QUICK.map((q) => (
            <Link key={q.href} href={q.href}>
              <span aria-hidden="true">{q.emoji}</span> {t(q.label)}
            </Link>
          ))}
        </div>
      </div>

      <p className={styles.safety}>
        <Phone size={15} aria-hidden="true" />
        {t({
          en: 'Manobal supports wellbeing and is not a substitute for medical care. If you are in crisis, call Tele-MANAS ',
          hi: 'मनोबल मानसिक कल्याण में सहायक है, चिकित्सा का विकल्प नहीं। संकट की स्थिति में टेली-मानस ',
        })}
        <a href="tel:14416">14416</a>
        {t({ en: ' (free, 24×7) or 112.', hi: ' (निःशुल्क, 24×7) या 112 पर कॉल करें।' })}
      </p>
    </section>
  );
}

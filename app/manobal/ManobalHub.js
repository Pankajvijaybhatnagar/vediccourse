'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Compass, Sun, Check, ClipboardCheck, MessageCircleHeart } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { CHAPTER_CARDS } from '@/lib/manobal/chapters';
import Reveal from '@/components/Reveal';
import HelpBanner from '@/components/manobal/HelpBanner';
import PracticeTool from '@/components/manobal/PracticeTool';
import styles from './manobal.module.css';

const p = (en, hi) => ({ en, hi });

const AUDIENCE = [
  { icon: '🎓', title: p('Students', 'विद्यार्थी'), text: p('Exam pressure, focus, comparison, choosing a stream or career.', 'परीक्षा का दबाव, एकाग्रता, तुलना, विषय या करियर का चुनाव।') },
  { icon: '💼', title: p('Young professionals', 'युवा पेशेवर'), text: p('Work stress, burnout, direction, relationships and self-doubt.', 'कार्य का तनाव, थकान, दिशा, संबंध और आत्म-संदेह।') },
  { icon: '👪', title: p('Parents & families', 'अभिभावक एवं परिवार'), text: p('Supporting children, handling conflict, understanding each other.', 'बच्चों का साथ देना, मतभेद सुलझाना, एक-दूसरे को समझना।') },
  { icon: '🌿', title: p('Every age', 'हर आयु के लिए'), text: p('Loneliness, worry, low mood, sleep and finding peace at any stage of life.', 'अकेलापन, चिंता, उदासी, नींद और जीवन के हर पड़ाव पर शांति।') },
];

const FINDER = [
  { label: p('Exam stress', 'परीक्षा का तनाव'), href: '/manobal/pariksha-ka-tanav', emoji: '📚' },
  { label: p('Overthinking', 'अत्यधिक सोचना'), href: '/manobal/vicharon-ko-pehchanen', emoji: '🌀' },
  { label: p('Panic / anxiety', 'घबराहट / चिंता'), href: '/manobal/chinta-se-mukti', emoji: '🌊' },
  { label: p('Feeling low or empty', 'उदासी या खालीपन'), href: '/manobal/udasi-se-bahar', emoji: '🌧️' },
  { label: p("Can't sleep", 'नींद नहीं आती'), href: '/manobal/neend-aur-dinacharya', emoji: '🌙' },
  { label: p('Career confusion', 'करियर को लेकर उलझन'), href: '/manobal/career-compass', emoji: '🧭' },
  { label: p('Family conflict', 'पारिवारिक मतभेद'), href: '/manobal/sambandh-aur-samvad', emoji: '🏠' },
  { label: p('Worried about Sade Sati', 'साढ़ेसाती की चिंता'), href: '/manobal/grah-aur-man', emoji: '🪐' },
  { label: p('Need to calm down now', 'अभी शांत होना है'), href: '#toolkit', emoji: '🌬️' },
];

const TOOLS = [
  { id: 'breathing', icon: '🌬️', label: p('Breathe', 'श्वास') },
  { id: 'grounding', icon: '🖐️', label: p('Ground', 'वर्तमान में लौटें') },
  { id: 'thought-record', icon: '📝', label: p('Thought journal', 'विचार डायरी') },
  { id: 'mood', icon: '😊', label: p('Mood tracker', 'मनोदशा') },
  { id: 'focus-timer', icon: '⏱️', label: p('Focus timer', 'एकाग्रता टाइमर') },
  { id: 'gratitude', icon: '🙏', label: p('Gratitude', 'कृतज्ञता') },
];

const JOURNEY = [
  { week: p('Week 1–2', 'सप्ताह 1–2'), title: p('Notice', 'पहचानें'), text: p('Learn how your mind works and spot your patterns.', 'मन की कार्यप्रणाली समझें और अपने पैटर्न पहचानें।') },
  { week: p('Week 3–5', 'सप्ताह 3–5'), title: p('Practise', 'अभ्यास करें'), text: p('Daily breathing, thought work and small actions build new pathways.', 'दैनिक श्वास, विचार अभ्यास और छोटे कदम नए तंत्रिका मार्ग बनाते हैं।') },
  { week: p('Week 6–9', 'सप्ताह 6–9'), title: p('Strengthen', 'दृढ़ करें'), text: p('Repetition makes the calm response faster and more natural.', 'दोहराव से शांत प्रतिक्रिया तेज़ और स्वाभाविक होने लगती है।') },
  { week: p('Week 10+', 'सप्ताह 10+'), title: p('Live it', 'जीवन में उतारें'), text: p('Your personal plan keeps you steady through ups and downs.', 'आपकी व्यक्तिगत योजना हर उतार-चढ़ाव में आपको स्थिर रखती है।') },
];

export default function ManobalHub() {
  const { t } = useLang();
  const [done, setDone] = useState([]);
  const [tool, setTool] = useState('breathing');

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem('vedicdhaam-manobal-progress') || '[]');
      if (Array.isArray(v)) setDone(v);
    } catch {}
  }, []);

  const nextChapter = CHAPTER_CARDS.find((c) => !done.includes(c.slug)) || CHAPTER_CARDS[0];
  const pct = Math.round((done.filter((s) => CHAPTER_CARDS.some((c) => c.slug === s)).length / CHAPTER_CARDS.length) * 100);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>{t({ en: 'Manobal · मनोबल', hi: 'मनोबल · Manobal' })}</span>
            <h1>
              {t({ en: 'A calmer mind,', hi: 'शांत मन,' })} <span>{t({ en: 'a clearer path', hi: 'स्पष्ट मार्ग' })}</span>
            </h1>
            <p>
              {t({
                en: 'Chapter-by-chapter guidance to train your mind, handle stress, anxiety and low mood, and find your career direction — with proven psychology and the wisdom of Vedic astrology.',
                hi: 'मन को प्रशिक्षित करने, तनाव, चिंता और उदासी से निपटने तथा करियर की दिशा पाने के लिए अध्याय-दर-अध्याय मार्गदर्शन — प्रमाणित मनोविज्ञान और वैदिक ज्योतिष के ज्ञान के साथ।',
              })}
            </p>
            <div className={styles.heroCtas}>
              <Link href={`/manobal/${nextChapter?.slug || ''}`} className="btn btn-primary btn-lg">
                {done.length ? t({ en: 'Continue learning', hi: 'सीखना जारी रखें' }) : t({ en: 'Start Chapter 1', hi: 'अध्याय 1 आरंभ करें' })} <ArrowRight size={18} />
              </Link>
              <Link href="/manobal/self-check" className={`btn btn-ghost btn-lg ${styles.ghostTeal}`}>
                <ClipboardCheck size={18} /> {t({ en: 'Free self-check', hi: 'निःशुल्क स्व-जाँच' })}
              </Link>
            </div>
            <div className={styles.heroStats}>
              <span>
                <b>12</b> {t({ en: 'chapters', hi: 'अध्याय' })}
              </span>
              <span>
                <b>7</b> {t({ en: 'interactive tools', hi: 'संवादात्मक अभ्यास' })}
              </span>
              <span>
                <b>100%</b> {t({ en: 'private', hi: 'गोपनीय' })}
              </span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.orb}>
              <span className={styles.orbRing} />
              <span className={styles.orbRing2} />
              <span className={styles.orbCore}>🧘</span>
            </div>
            {['🌿', '☀️', '🌙', '✨'].map((e, i) => (
              <span key={e} className={styles.floatEmoji} style={{ '--i': i }}>
                {e}
              </span>
            ))}
          </div>
        </section>

        <HelpBanner compact />

        {/* Quick finder */}
        <section className={styles.block}>
          <div className={styles.headCenter}>
            <span className="eyebrow">{t({ en: 'Start where you are', hi: 'जहाँ हैं, वहीं से आरंभ करें' })}</span>
            <h2>{t({ en: 'What are you going through?', hi: 'आप किस स्थिति से गुज़र रहे हैं?' })}</h2>
          </div>
          <div className={styles.finder}>
            {FINDER.map((f) => (
              <Link key={f.href + f.label.en} href={f.href} className={styles.finderChip}>
                <span aria-hidden="true">{f.emoji}</span> {t(f.label)}
              </Link>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className={styles.block}>
          <div className={styles.pillars}>
            {[
              { Icon: Brain, title: p('Train your mind', 'मन को प्रशिक्षित करें'), text: p('Neuroscience shows the brain can rewire itself. Small daily practices build calmer, stronger pathways — "neurons that fire together, wire together."', 'तंत्रिका विज्ञान बताता है कि मस्तिष्क स्वयं को बदल सकता है। छोटे दैनिक अभ्यास शांत और दृढ़ तंत्रिका मार्ग बनाते हैं — "जो न्यूरॉन साथ सक्रिय होते हैं, वे साथ जुड़ जाते हैं।"') },
              { Icon: Compass, title: p('Astrological guidance', 'ज्योतिषीय मार्गदर्शन'), text: p('Understand your nature through your Moon sign and your career tendencies through the 10th house — a lens for self-knowledge, not a verdict.', 'चंद्र राशि से अपना स्वभाव और दशम भाव से करियर की प्रवृत्ति समझें — यह आत्म-ज्ञान का माध्यम है, अंतिम निर्णय नहीं।') },
              { Icon: Sun, title: p('Better daily life', 'बेहतर दिनचर्या'), text: p('Sleep, routine, study habits, relationships — practical steps from psychology and Ayurvedic दिनचर्या for everyday problems.', 'नींद, दिनचर्या, पढ़ाई की आदतें, संबंध — दैनिक समस्याओं के लिए मनोविज्ञान और आयुर्वेदिक दिनचर्या के व्यावहारिक उपाय।') },
            ].map(({ Icon, title, text }, i) => (
              <Reveal key={title.en} delay={i * 100} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon size={26} />
                </span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Who it is for */}
        <section className={styles.block}>
          <div className={styles.headCenter}>
            <span className="eyebrow">{t({ en: 'For everyone', hi: 'सबके लिए' })}</span>
            <h2>{t({ en: 'Who is Manobal for?', hi: 'मनोबल किसके लिए है?' })}</h2>
          </div>
          <div className={styles.audience}>
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title.en} delay={i * 80} className={styles.audCard}>
                <span>{a.icon}</span>
                <h3>{t(a.title)}</h3>
                <p>{t(a.text)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Neuroplasticity journey */}
        <section className={`${styles.block} ${styles.journeyWrap}`}>
          <div className={styles.headCenter}>
            <span className="eyebrow">{t({ en: 'How change happens', hi: 'परिवर्तन कैसे होता है' })}</span>
            <h2>{t({ en: 'Rewiring the brain takes weeks, not days', hi: 'मस्तिष्क को नया रूप देने में दिन नहीं, सप्ताह लगते हैं' })}</h2>
            <p>
              {t({
                en: 'Research on habit formation suggests a new habit takes about two months of regular practice on average. Be patient and kind with yourself.',
                hi: 'आदत निर्माण पर शोध बताता है कि नई आदत बनने में औसतन लगभग दो महीने का नियमित अभ्यास लगता है। स्वयं के प्रति धैर्य और करुणा रखें।',
              })}
            </p>
          </div>
          <div className={styles.journey}>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.title.en} delay={i * 110} className={styles.journeyStep}>
                <span className={styles.journeyDot}>{i + 1}</span>
                <small>{t(j.week)}</small>
                <h3>{t(j.title)}</h3>
                <p>{t(j.text)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Chapters */}
        <section className={styles.block} id="chapters">
          <div className={styles.chapHead}>
            <div>
              <span className="eyebrow">{t({ en: 'The course', hi: 'पाठ्यक्रम' })}</span>
              <h2>{t({ en: '12 chapters to a stronger mind', hi: 'दृढ़ मन की ओर 12 अध्याय' })}</h2>
            </div>
            <div className={styles.progress}>
              <span>
                {t({ en: 'Your progress', hi: 'आपकी प्रगति' })}: <b>{pct}%</b>
              </span>
              <div className={styles.progressBar}>
                <span style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
          <div className={styles.chapters}>
            {CHAPTER_CARDS.map((c, i) => {
              const isDone = done.includes(c.slug);
              return (
                <Reveal key={c.slug} delay={(i % 4) * 70}>
                  <Link href={`/manobal/${c.slug}`} className={`${styles.chapter} ${styles[`tone_${c.tone}`] || ''} ${isDone ? styles.chapterDone : ''}`}>
                    <span className={styles.chapNum}>{isDone ? <Check size={18} /> : c.number}</span>
                    <span className={styles.chapIcon} aria-hidden="true">
                      {c.icon}
                    </span>
                    <strong>{t(c.title)}</strong>
                    <span className={styles.chapSub}>{t(c.subtitle)}</span>
                    <span className={styles.chapMeta}>
                      {c.minutes} {t({ en: 'min', hi: 'मिनट' })}
                      {c.audience && ` · ${t(c.audience)}`}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Toolkit */}
        <section className={styles.block} id="toolkit">
          <div className={styles.headCenter}>
            <span className="eyebrow">{t({ en: 'Mind toolkit', hi: 'मन के साधन' })}</span>
            <h2>{t({ en: 'Practise right here, right now', hi: 'यहीं, अभी अभ्यास करें' })}</h2>
            <p>{t({ en: 'Everything you write stays private on your own device.', hi: 'आप जो भी लिखते हैं, वह केवल आपके अपने उपकरण पर निजी रहता है।' })}</p>
          </div>
          <div className={styles.toolkit}>
            <div className={styles.toolTabs} role="tablist" aria-label={t({ en: 'Tools', hi: 'साधन' })}>
              {TOOLS.map((tl) => (
                <button key={tl.id} role="tab" aria-selected={tool === tl.id} onClick={() => setTool(tl.id)}>
                  <span aria-hidden="true">{tl.icon}</span> {t(tl.label)}
                </button>
              ))}
            </div>
            <div className={styles.toolPanel} role="tabpanel" key={tool}>
              <PracticeTool tool={tool} />
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className={styles.block}>
          <div className={styles.features}>
            <Link href="/manobal/career-compass" className={`${styles.feature} ${styles.featureCareer}`}>
              <span className={styles.featureIcon}>🧭</span>
              <strong>{t({ en: 'Career Compass', hi: 'करियर कम्पास' })}</strong>
              <p>
                {t({
                  en: 'An 18-question interest profile combined with your Kundli’s 10th house (Karma Bhava) to suggest career directions that fit you.',
                  hi: '18 प्रश्नों की रुचि प्रोफ़ाइल को आपकी कुंडली के दशम भाव (कर्म भाव) से जोड़कर आपके अनुकूल करियर दिशाएँ।',
                })}
              </p>
              <span className={styles.featureCta}>
                {t({ en: 'Find my direction', hi: 'मेरी दिशा खोजें' })} <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/manobal/self-check" className={`${styles.feature} ${styles.featureCheck}`}>
              <span className={styles.featureIcon}>🩺</span>
              <strong>{t({ en: 'Confidential Self-Check', hi: 'गोपनीय स्व-जाँच' })}</strong>
              <p>
                {t({
                  en: 'Two short, internationally used questionnaires (GAD-7 for anxiety, PHQ-9 for mood) with clear next steps. Nothing is saved.',
                  hi: 'दो छोटी, अंतरराष्ट्रीय स्तर पर प्रयुक्त प्रश्नावलियाँ (चिंता के लिए GAD-7, मनोदशा के लिए PHQ-9) और आगे के स्पष्ट कदम। कुछ भी सहेजा नहीं जाता।',
                })}
              </p>
              <span className={styles.featureCta}>
                {t({ en: 'Take the self-check', hi: 'स्व-जाँच करें' })} <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/contact" className={`${styles.feature} ${styles.featureTalk}`}>
              <span className={styles.featureIcon}>
                <MessageCircleHeart size={30} />
              </span>
              <strong>{t({ en: 'Talk to a counsellor', hi: 'परामर्शदाता से बात करें' })}</strong>
              <p>
                {t({
                  en: 'Book a one-on-one session for career guidance or life problems with an experienced counsellor-astrologer, in Hindi or English.',
                  hi: 'करियर या जीवन की समस्याओं पर अनुभवी परामर्शदाता-ज्योतिषी से हिंदी या अंग्रेज़ी में व्यक्तिगत सत्र बुक करें।',
                })}
              </p>
              <span className={styles.featureCta}>
                {t({ en: 'Book a session', hi: 'सत्र बुक करें' })} <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.block}>
          <HelpBanner />
        </section>
      </div>
    </div>
  );
}

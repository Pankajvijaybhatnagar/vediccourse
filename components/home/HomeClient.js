'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, ExternalLink, Languages, MessageCircle, PhoneCall,
  Play, Plus, Star, Briefcase, Minus,
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import useToday from '@/lib/useToday';
import { SIGNS, localizeSign } from '@/lib/zodiac';
import { ASTROLOGERS, LIVE_SESSIONS, SKILLS, LANGS, getAstrologer, initials } from '@/lib/astrologers';
import {
  HERO_SLIDES, QUICK_ACTIONS, APPOINTMENTS, READINGS, CONSULT_TOPICS, BLOGS, VIDEOS, NEWS, STATS,
  TESTIMONIALS, FAQS,
} from '@/lib/content';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import HeroArt from './HeroArt';
import SeoContent from './SeoContent';
import ManobalSection from './ManobalSection';
import KarmkandSection from './KarmkandSection';
import styles from './home.module.css';

const fmtDate = (date, lang, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  date ? date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', opts) : '';

const daysBefore = (today, n) => {
  if (!today) return null;
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
};

function RowHead({ title, href, id, om = false }) {
  const { t } = useLang();
  return (
    <div className="row-head" id={id}>
      <h2>
        {om && <span className="om">ॐ</span>}
        {t(title)}
      </h2>
      {href && (
        <Link href={href} className="view-all">
          {t({ en: 'View All', hi: 'सभी देखें' })}
        </Link>
      )}
    </div>
  );
}

export function Avatar({ astro, size = 88, online }) {
  const { t } = useLang();
  const name = t(astro.name);
  return (
    <span
      className={styles.avatar}
      style={{ '--hue': astro.hue, width: size, height: size, fontSize: size * 0.34 }}
      aria-hidden="true"
    >
      {initials(astro.name.en)}
      {online && <span className={styles.onlineDot} title={name} />}
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Hero carousel                                                             */
/* ------------------------------------------------------------------------ */
function Hero() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={t({ en: 'Featured', hi: 'विशेष' })}
    >
      <div className={styles.heroTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.slide} ${styles[`tone_${s.tone}`]}`}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
          >
            <div className={styles.slideText}>
              <h1 className={styles.slideTitle}>{t(s.title)}</h1>
              <p className={styles.slideSub}>{t(s.sub)}</p>
              <Link href={s.href} className={styles.slideCta} tabIndex={i === index ? 0 : -1}>
                {t(s.cta)} <ChevronRight size={22} strokeWidth={2.6} />
              </Link>
              <div className={styles.slideBadge}>
                <span className={styles.no1}>#1</span>
                <span>
                  <strong>{t({ en: "India's Trusted", hi: 'भारत का विश्वसनीय' })}</strong>
                  {t({ en: 'Vedic Astrology Platform', hi: 'वैदिक ज्योतिष मंच' })}
                </span>
              </div>
            </div>
            <div className={styles.slideArt}>
              <HeroArt kind={s.art} />
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles.heroArrow} ${styles.prev}`} onClick={() => go(index - 1)} aria-label={t({ en: 'Previous slide', hi: 'पिछली स्लाइड' })}>
        <ChevronLeft size={22} />
      </button>
      <button className={`${styles.heroArrow} ${styles.next}`} onClick={() => go(index + 1)} aria-label={t({ en: 'Next slide', hi: 'अगली स्लाइड' })}>
        <ChevronRight size={22} />
      </button>
      <div className={styles.heroDots}>
        {HERO_SLIDES.map((s, i) => (
          <button key={s.id} aria-label={`${i + 1}`} aria-current={i === index} onClick={() => go(i)} className={i === index ? styles.dotOn : ''} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Astrologer cards                                                          */
/* ------------------------------------------------------------------------ */
export function AstrologerCard({ astro }) {
  const { t } = useLang();
  const [following, setFollowing] = useState(false);
  return (
    <article className={styles.astro}>
      <div className={styles.astroTop}>
        <div className={styles.astroLeft}>
          <Avatar astro={astro} online={astro.online} />
          <span className={styles.rating}>
            <Star size={11} fill="currentColor" /> {astro.rating} | {astro.orders.toLocaleString('en-IN')}
          </span>
        </div>
        <div className={styles.astroInfo}>
          <div className={styles.astroNameRow}>
            <h3 title={t(astro.name)}>
              {t(astro.name)} <BadgeCheck size={16} className={styles.verified} />
            </h3>
            <button className={`${styles.follow} ${following ? styles.following : ''}`} onClick={() => setFollowing((f) => !f)} aria-pressed={following}>
              {following ? t({ en: '✓ Following', hi: '✓ फ़ॉलो किया' }) : t({ en: '+ Follow', hi: '+ फ़ॉलो' })}
            </button>
          </div>
          <p>
            <Languages size={14} /> {astro.langs.map((l) => t(LANGS[l])).join(', ')}
          </p>
          <p>
            <Briefcase size={14} /> {astro.exp} {t({ en: 'Years', hi: 'वर्ष' })}
          </p>
          <p className={styles.skills}>
            <Star size={14} /> {astro.skills.map((s) => t(SKILLS[s])).join(', ')}
          </p>
        </div>
      </div>
      <div className={styles.astroBottom}>
        <div className={styles.price}>
          <strong>₹{astro.price}/{t({ en: 'Min', hi: 'मिनट' })}</strong>
          {astro.oldPrice && <s>₹{astro.oldPrice}/{t({ en: 'Min', hi: 'मिनट' })}</s>}
          {astro.oldPrice && <span className={styles.deal}>{t({ en: `FLAT DEAL ${astro.price}`, hi: `फ्लैट डील ${astro.price}` })}</span>}
        </div>
        <div className={styles.astroBtns}>
          <Link href={`/contact?astro=${astro.id}&mode=chat`} className={styles.greenBtn}>
            <MessageCircle size={15} /> {t({ en: 'CHAT', hi: 'चैट' })}
          </Link>
          <Link href={`/contact?astro=${astro.id}&mode=call`} className={styles.greenBtn}>
            <PhoneCall size={15} /> {t({ en: 'CALL', hi: 'कॉल' })}
          </Link>
        </div>
      </div>
    </article>
  );
}

function LiveCard({ session }) {
  const { t } = useLang();
  const astro = getAstrologer(session.astro);
  const [following, setFollowing] = useState(false);
  return (
    <article className={styles.live}>
      <div className={styles.liveBody}>
        <span className={`badge-live ${styles.liveBadge}`}>LIVE</span>
        <Avatar astro={astro} size={56} />
        <button className={`${styles.liveFollow} ${following ? styles.following : ''}`} onClick={() => setFollowing((f) => !f)} aria-pressed={following}>
          {following ? '✓' : '+'} {t({ en: 'Follow', hi: 'फ़ॉलो' })}
        </button>
        <h3>{t(astro.name)}</h3>
        <span className={styles.liveTopic}>{t(session.topic)}</span>
      </div>
      <Link href="/astrologers" className={styles.watch}>
        {t({ en: 'WATCH NOW', hi: 'अभी देखें' })} <ChevronRight size={15} strokeWidth={3} />
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------------ */
/* Count-up used by the stats strip                                          */
/* ------------------------------------------------------------------------ */
function StatsStrip() {
  const { t } = useLang();
  return (
    <div className={`${styles.stats} mandala-bg`}>
      {STATS.map((s, i) => (
        <Reveal key={s.label.en} delay={i * 90} className={styles.stat}>
          <span className={styles.statIcon}>
            <Icon name={s.icon} size={26} />
          </span>
          <span>
            <strong>{t(s.value)}</strong>
            <small>{t(s.label)}</small>
          </span>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Testimonials carousel                                                     */
/* ------------------------------------------------------------------------ */
function Testimonials() {
  const { t } = useLang();
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);
  const pages = Math.ceil(TESTIMONIALS.length / perView);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 720 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 7000);
    return () => clearInterval(id);
  }, [pages]);

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <RowHead title={{ en: 'Testimonials', hi: 'ग्राहकों के अनुभव' }} />
        <div className={styles.tViewport}>
          <div className={styles.tTrack} style={{ transform: `translateX(-${page * 100}%)` }}>
            {TESTIMONIALS.map((x) => (
              <figure key={x.name} className={styles.tCard} style={{ flexBasis: `calc(${100 / perView}% - ${((perView - 1) * 20) / perView}px)` }}>
                <div className={styles.tStars} aria-label="5/5">★★★★★</div>
                <blockquote>{t(x.text)}</blockquote>
                <figcaption>
                  <span className={styles.tAvatar}>{x.name[0]}</span>
                  <span>
                    <strong>{x.name}</strong>
                    <small>{t(x.city)}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className={styles.tDots}>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} aria-label={`${i + 1}`} aria-current={i === page} className={i === page ? styles.dotOn : ''} onClick={() => setPage(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* FAQ                                                                       */
/* ------------------------------------------------------------------------ */
function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(-1);
  return (
    <div className={styles.faq}>
      <RowHead title={{ en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न' }} />
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q.en} className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}>
            <button className={styles.faqQ} aria-expanded={isOpen} aria-controls={`hfaq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{t(f.q)}</span>
              {isOpen ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            <div id={`hfaq-${i}`} className={styles.faqA} role="region">
              <div>
                <p>{t(f.a)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Page                                                                      */
/* ------------------------------------------------------------------------ */
export default function HomeClient() {
  const { t, lang } = useLang();
  const today = useToday();
  const topAstros = ASTROLOGERS.filter((a) => a.online).slice(0, 3);

  return (
    <div className={styles.home}>
      <div className="container">
        <Hero />

        {/* Quick actions */}
        <div className={styles.quick}>
          {QUICK_ACTIONS.map((q, i) => (
            <Link key={q.key} href={q.href} className={`${styles.quickCard} fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
              <span className={styles.quickIcon}>
                <Icon name={q.icon} size={20} strokeWidth={2} />
              </span>
              <span className={styles.quickLabel}>{t(q.label)}</span>
              <ArrowRight size={18} className={styles.quickArrow} />
            </Link>
          ))}
        </div>

        {/* Top online astrologers */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Top Online Astrologers', hi: 'शीर्ष ऑनलाइन ज्योतिषी' }} href="/astrologers" />
          <div className={`rail ${styles.astroGrid}`}>
            {topAstros.map((a) => (
              <AstrologerCard key={a.id} astro={a} />
            ))}
          </div>
        </section>

        {/* Free live experts */}
        <section className={styles.block}>
          <RowHead id="live" title={{ en: 'Free Live Experts', hi: 'मुफ़्त लाइव विशेषज्ञ' }} href="/astrologers" />
          <div className={`rail ${styles.liveGrid}`}>
            {LIVE_SESSIONS.map((s) => (
              <LiveCard key={s.astro} session={s} />
            ))}
          </div>
        </section>

        {/* Schedule appointment */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Schedule Appointment', hi: 'अपॉइंटमेंट बुक करें' }} href="/contact" />
          <div className={`rail ${styles.apptGrid}`}>
            {APPOINTMENTS.map((a, i) => (
              <Reveal key={a.label.en} delay={i * 60}>
                <Link href={a.href} className={`${styles.cream} mandala-bg`}>
                  <span className={styles.creamIcon}>
                    <Icon name={a.icon} size={40} strokeWidth={1.3} />
                  </span>
                  <span className={styles.creamLabel}>{t(a.label)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Today's prediction */}
        <section className={styles.block}>
          <RowHead title={{ en: "Today's Astrology Prediction", hi: 'आज का राशिफल' }} href="/horoscope" om />
          <div className={styles.signGrid}>
            {SIGNS.map((raw, i) => {
              const s = localizeSign(raw, lang);
              return (
                <Reveal key={s.slug} delay={(i % 6) * 50}>
                  <Link href={`/horoscope?sign=${s.slug}`} className={styles.sign}>
                    <span className={styles.medallion}>
                      <svg viewBox="0 0 100 100" aria-hidden="true" className={styles.medalRing}>
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <span className="glyph">{s.glyph}</span>
                    </span>
                    <span className={styles.signName}>{s.name}</span>
                    <span className={styles.signDates}>{s.dates}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Free astrology readings */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Free Astrology Readings', hi: 'मुफ़्त ज्योतिष रीडिंग' }} />
          <div className={styles.readGrid}>
            {READINGS.map((r, i) => (
              <Reveal key={r.key} delay={(i % 6) * 60}>
                <Link href={r.href} className={styles.reading}>
                  <span className={`${styles.readArt} ${styles[`art_${r.key}`]}`}>
                    <span className={styles.readRays} aria-hidden="true" />
                    <Icon name={r.icon} size={54} strokeWidth={1.2} className={styles.readIcon} />
                  </span>
                  <span className={styles.readLabel}>{t(r.label)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Learn: Karmkand + Jyotish course */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Learn & Grow', hi: 'सीखें और आगे बढ़ें' }} om />
          <div className={styles.learnGrid}>
            <Reveal>
              <Link href="/karmkand" className={`${styles.learn} ${styles.learnKarm}`}>
                <span className={styles.learnIcon} aria-hidden="true">🪔</span>
                <span className={styles.learnTag}>{t({ en: 'Karmkand', hi: 'कर्मकांड' })}</span>
                <strong>{t({ en: 'Pooja Paddhati & Pooja Samagri', hi: 'पूजा पद्धति एवं पूजा सामग्री' })}</strong>
                <span className={styles.learnText}>
                  {t({
                    en: 'Step-by-step vidhi for 10 poojas with mantras and meanings, plus the significance of 57 samagri items.',
                    hi: '10 पूजाओं की चरणबद्ध विधि, मंत्र और उनके अर्थ, तथा 57 पूजा सामग्रियों का महत्व।',
                  })}
                </span>
                <span className={styles.learnChips}>
                  <span>दैनिक पूजा</span>
                  <span>गणेश पूजन</span>
                  <span>रुद्राभिषेक</span>
                  <span>हवन</span>
                </span>
                <span className={styles.learnCta}>{t({ en: 'Start learning →', hi: 'सीखना आरंभ करें →' })}</span>
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <Link href="/jyotish-seekhen" className={`${styles.learn} ${styles.learnJyotish}`}>
                <span className={styles.learnIcon} aria-hidden="true">🎓</span>
                <span className={styles.learnTag}>{t({ en: 'Free course', hi: 'मुफ़्त पाठ्यक्रम' })}</span>
                <strong>{t({ en: 'Learn Astrology (Jyotish)', hi: 'ज्योतिष सीखें' })}</strong>
                <span className={styles.learnText}>
                  {t({
                    en: '12 easy lessons from Navgrah and Rashis to Kundli reading, Dasha and Yogas — with quizzes and progress tracking.',
                    hi: 'नवग्रह और राशियों से लेकर कुंडली पढ़ना, दशा और योग तक — 12 सरल पाठ, प्रश्नोत्तरी और प्रगति सहित।',
                  })}
                </span>
                <span className={styles.learnChips}>
                  <span>नवग्रह</span>
                  <span>बारह भाव</span>
                  <span>नक्षत्र</span>
                  <span>दशा</span>
                </span>
                <span className={styles.learnCta}>{t({ en: 'Begin lesson 1 →', hi: 'पहला पाठ आरंभ करें →' })}</span>
              </Link>
            </Reveal>
            <Reveal delay={240}>
              <Link href="/manobal" className={`${styles.learn} ${styles.learnManobal}`}>
                <span className={styles.learnIcon} aria-hidden="true">🧘</span>
                <span className={styles.learnTag}>{t({ en: 'New · Mind & Career', hi: 'नया · मन एवं करियर' })}</span>
                <strong>{t({ en: 'Manobal — Student & Life Guidance', hi: 'मनोबल — विद्यार्थी एवं जीवन मार्गदर्शन' })}</strong>
                <span className={styles.learnText}>
                  {t({
                    en: '12 chapters to handle stress, anxiety and low mood, plus a Kundli-based Career Compass and a private self-check.',
                    hi: 'तनाव, चिंता और उदासी से निपटने के 12 अध्याय, कुंडली आधारित करियर कम्पास और गोपनीय स्व-जाँच।',
                  })}
                </span>
                <span className={styles.learnChips}>
                  <span>{t({ en: 'Breathing', hi: 'श्वास' })}</span>
                  <span>{t({ en: 'Exam stress', hi: 'परीक्षा तनाव' })}</span>
                  <span>{t({ en: 'Career', hi: 'करियर' })}</span>
                </span>
                <span className={styles.learnCta}>{t({ en: 'Begin your journey →', hi: 'यात्रा आरंभ करें →' })}</span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Karmkand explainer */}
        <KarmkandSection />

        {/* Manobal explainer */}
        <ManobalSection />

        {/* Consult the right astrologer */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Consult The Right Astrologer For You', hi: 'अपने लिए सही ज्योतिषी चुनें' }} />
          <div className={styles.topicGrid}>
            {CONSULT_TOPICS.map((c, i) => (
              <Reveal key={c.key} delay={(i % 6) * 60}>
                <Link href={`/astrologers?focus=${c.key}`} className={`${styles.cream} ${styles.creamSm} mandala-bg`}>
                  <span className={styles.creamIcon}>
                    <Icon name={c.icon} size={34} strokeWidth={1.3} />
                  </span>
                  <span className={styles.creamLabel}>{t(c.label)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Blogs */}
        <section className={styles.block}>
          <RowHead id="blogs" title={{ en: 'Blogs', hi: 'ब्लॉग' }} href="/#blogs" />
          <div className={`rail ${styles.three}`}>
            {BLOGS.map((b) => (
              <Link key={b.art} href={b.href} className={styles.blog}>
                <span className={`${styles.blogArt} ${styles[`blog_${b.art}`]}`}>
                  <span className={styles.blogKicker}>{t(b.kicker)}</span>
                  {b.art === 'weekly' && today && (
                    <span className={styles.blogDate}>
                      {fmtDate(daysBefore(today, today.getDay()), lang, { day: 'numeric', month: 'short' })} – {fmtDate(daysBefore(today, today.getDay() - 6), lang, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  <span className={styles.blogGlyph} aria-hidden="true">
                    {b.art === 'weekly' ? '☸' : b.art === 'palm' ? '✋' : '🌙'}
                  </span>
                </span>
                <span className={styles.blogBody}>
                  <span className={styles.blogTitle}>{t(b.title)}</span>
                  <span className={styles.blogMeta}>
                    <span className={styles.blogAuthor}>{t(b.author)[0]}</span>
                    <span>
                      <strong>{t(b.author)}</strong> | {fmtDate(daysBefore(today, b.daysAgo), lang, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className={styles.blogGo}>
                      <ChevronRight size={14} strokeWidth={3} />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured videos */}
        <section className={styles.block}>
          <RowHead id="videos" title={{ en: 'Featured Videos', hi: 'विशेष वीडियो' }} />
          <div className={`rail ${styles.three}`}>
            {VIDEOS.map((v, i) => (
              <Link key={i} href="/astrologers" className={styles.video}>
                <span className={`${styles.videoThumb} ${styles[`vid_${v.tone}`]}`}>
                  <span className={styles.videoLogo}>VedicDhaam</span>
                  <span className={styles.play}>
                    <Play size={22} fill="currentColor" />
                  </span>
                  <span className={styles.duration}>{v.duration}</span>
                </span>
                <span className={styles.videoTitle}>{t(v.title)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily horoscope video */}
        <section className={styles.block}>
          <RowHead title={{ en: 'Daily Horoscope Video', hi: 'दैनिक राशिफल वीडियो' }} href="/horoscope" />
          <div className={`rail ${styles.three}`}>
            {[0, 1, 2].map((n) => {
              const d = daysBefore(today, n);
              const dayNum = d ? d.getDate() : '';
              const hiMonthYear = d ? d.toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' }) : '';
              const enFull = d ? d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
              return (
                <Link key={n} href="/horoscope" className={styles.video}>
                  <span className={`${styles.videoThumb} ${styles.rashifalThumb}`}>
                    <span className={styles.rashifalText}>
                      <span className={styles.aajKa}>आज का</span>
                      <span className={styles.rashifal}>राशिफल</span>
                      <span className={styles.rashifalDate}>
                        <b>{dayNum}</b> {hiMonthYear}
                      </span>
                    </span>
                    <span className={styles.rashifalWheel} aria-hidden="true">
                      {SIGNS.map((s, i) => (
                        <span key={s.slug} className="glyph" style={{ transform: `rotate(${i * 30}deg) translateY(-62px) rotate(${-i * 30}deg)` }}>
                          {s.glyph}
                        </span>
                      ))}
                      <span className={styles.rashifalOm}>ॐ</span>
                    </span>
                    <span className={styles.play}>
                      <Play size={20} fill="currentColor" />
                    </span>
                  </span>
                  <span className={styles.videoTitle}>
                    {enFull} आज का राशिफल | Aaj Ka Rashifal | मेष से मीन तक सभी 12 राशियाँ | {t({ en: "Today's Horoscope", hi: 'दैनिक राशिफल' })}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest news */}
        <section className={styles.block}>
          <RowHead id="news" title={{ en: 'Latest News', hi: 'ताज़ा ख़बरें' }} />
          <div className={`rail ${styles.three}`}>
            {NEWS.map((n) => (
              <article key={n.source} className={styles.news}>
                <span className={`${styles.newsArt} ${styles[`news_${n.tone}`]}`} aria-hidden="true">
                  <span>✦</span>
                </span>
                <div className={styles.newsBody}>
                  <p className={styles.newsTitle}>{t(n.title)}</p>
                  <p className={styles.newsMeta}>
                    <span>{n.source}</span>
                    <span>{fmtDate(daysBefore(today, n.daysAgo), lang, { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                  </p>
                  <Link href="/#blogs" className={styles.readNow}>
                    {t({ en: 'Read Now', hi: 'अभी पढ़ें' })} <ExternalLink size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <StatsStrip />
      </div>

      <Testimonials />

      <div className="container">
        <SeoContent />
        <Faq />
      </div>
    </div>
  );
}

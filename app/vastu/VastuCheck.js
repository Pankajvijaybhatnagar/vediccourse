'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  AppWindow, ArrowRight, Baby, Bath, BedDouble, ChefHat, ChevronLeft, ChevronRight, CircleCheck, CloudRain, Compass,
  Container, CookingPot, DoorOpen, Flame, Flower2, Footprints, HeartPulse, Lightbulb, Mountain, MoveVertical, Printer,
  RotateCcw, Route, ScrollText, ShieldCheck, Sparkles, Star, Sun, TriangleAlert, Vault, Waves, Wind,
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import useStoredState from '@/lib/useStoredState';
import { QUESTIONS, SECTIONS, STAR_LEGEND, ZONES, scoreAnswers } from '@/lib/vastu';
import styles from './vastu.module.css';

const ICONS = {
  AppWindow, Baby, Bath, BedDouble, ChefHat, CloudRain, Compass, Container, CookingPot, DoorOpen, Flame, Flower2,
  Footprints, HeartPulse, Mountain, MoveVertical, Route, ScrollText, Sparkles, Sun, TriangleAlert, Vault, Waves, Wind,
};
const LETTERS = 'abcdefgh';
const TOTAL = QUESTIONS.length;

function Stars({ n, size = 15 }) {
  return (
    <span className={`${styles.stars} ${styles[`s${n}`]}`} aria-label={`${n} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} strokeWidth={1.8} className={i <= n ? styles.on : styles.off} aria-hidden="true" />
      ))}
    </span>
  );
}

const starLabel = (n) => STAR_LEGEND.find((l) => l.stars === n)?.label;

/* ---------- 3×3 Vastu Purusha mandala ---------- */
function Mandala({ answers, showResult }) {
  const { t } = useLang();
  const zoneResult = {};
  if (showResult) {
    QUESTIONS.filter((q) => q.zone && answers[q.id] != null).forEach((q) => {
      zoneResult[q.zone] = q.options[answers[q.id]];
    });
    // A toilet in the Brahmasthan is the one centre defect the questionnaire captures.
    if (answers[13] === 6) zoneResult.C = QUESTIONS[12].options[6];
  }
  return (
    <div className={styles.mandalaWrap}>
      <span className={`${styles.dir} ${styles.dirN}`}>{t({ en: 'N', hi: 'उ' })}</span>
      <span className={`${styles.dir} ${styles.dirE}`}>{t({ en: 'E', hi: 'पू' })}</span>
      <span className={`${styles.dir} ${styles.dirS}`}>{t({ en: 'S', hi: 'द' })}</span>
      <span className={`${styles.dir} ${styles.dirW}`}>{t({ en: 'W', hi: 'प' })}</span>
      <div className={styles.mandala}>
        {ZONES.map((z) => {
          const r = zoneResult[z.key];
          return (
            <div key={z.key} className={`${styles.zone} ${styles[`zone${z.key}`]} ${r ? styles[`s${r.stars}`] : ''}`}>
              <strong>{t(z.name)}</strong>
              <span>{t(z.deity)}</span>
              {r && (
                <>
                  <em>{t(r)}</em>
                  <Stars n={r.stars} size={11} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Intro ---------- */
function Intro({ answered, onStart, onReset }) {
  const { t } = useLang();
  const resume = answered > 0 && answered < TOTAL;
  return (
    <div className={styles.intro}>
      <div className={`card card-glow ${styles.introCard}`}>
        <span className={styles.kicker}>
          <Compass size={16} /> {t({ en: '25 questions · about 5 minutes', hi: '25 प्रश्न · लगभग 5 मिनट' })}
        </span>
        <h2>{t({ en: 'How Vastu-friendly is your home?', hi: 'आपका घर कितना वास्तु-अनुकूल है?' })}</h2>
        <p className="muted">
          {t({
            en: 'Walk through your home direction by direction — the main door, the four corners, the kitchen, bedrooms, water and slope. Each answer is rated on the traditional five-star scale.',
            hi: 'दिशा-दर-दिशा अपने घर को देखें — मुख्य द्वार, चारों कोण, रसोई, शयनकक्ष, जल-स्रोत और ढलान। हर उत्तर को पारंपरिक पाँच-सितारा पैमाने पर आँका जाता है।',
          })}
        </p>

        <ul className={styles.legend}>
          {STAR_LEGEND.map((l) => (
            <li key={l.stars}>
              <Stars n={l.stars} size={14} />
              <span>{t(l.label)}</span>
            </li>
          ))}
        </ul>

        <div className={styles.introActions}>
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            {resume
              ? t({ en: `Continue (${answered}/${TOTAL})`, hi: `जारी रखें (${answered}/${TOTAL})` })
              : answered === TOTAL
                ? t({ en: 'View my report', hi: 'मेरी रिपोर्ट देखें' })
                : t({ en: 'Start Vastu Check', hi: 'वास्तु जाँच आरंभ करें' })}
            <ArrowRight size={18} />
          </button>
          {answered > 0 && (
            <button className="btn btn-ghost" onClick={onReset}>
              <RotateCcw size={16} /> {t({ en: 'Start over', hi: 'नई जाँच' })}
            </button>
          )}
        </div>
        <p className={styles.privacy}>
          <ShieldCheck size={15} /> {t({ en: 'Your answers stay on this device only.', hi: 'आपके उत्तर केवल इसी डिवाइस पर रहते हैं।' })}
        </p>
      </div>

      <div className={styles.introSide}>
        <Mandala answers={{}} />
        <p className={styles.mandalaCaption}>
          {t({ en: 'Vastu Purusha Mandala — the nine zones and their ruling forces', hi: 'वास्तु पुरुष मंडल — नौ क्षेत्र और उनके अधिष्ठाता' })}
        </p>
      </div>

      <ol className={styles.sectionStrip}>
        {SECTIONS.map((s, i) => (
          <li key={s.key}>
            <span>{i + 1}</span>
            <strong>{t(s.label)}</strong>
            <em>
              {QUESTIONS.filter((q) => q.section === s.key).length} {t({ en: 'questions', hi: 'प्रश्न' })}
            </em>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- One question ---------- */
function Question({ index, answers, onPick, onNav, onFinish }) {
  const { t, lang } = useLang();
  const q = QUESTIONS[index];
  const Ico = ICONS[q.icon] || Compass;
  const section = SECTIONS.find((s) => s.key === q.section);
  const chosen = answers[q.id];
  const answered = Object.keys(answers).length;
  const isLast = index === TOTAL - 1;
  const other = lang === 'hi' ? 'en' : 'hi';

  return (
    <div className={styles.quiz}>
      <aside className={styles.sidebar} aria-label={t({ en: 'Questions', hi: 'प्रश्न सूची' })}>
        {SECTIONS.map((s) => (
          <div key={s.key} className={styles.sideGroup}>
            <span className={`${styles.sideLabel} ${s.key === q.section ? styles.sideLabelActive : ''}`}>{t(s.label)}</span>
            <div className={styles.dots}>
              {QUESTIONS.filter((x) => x.section === s.key).map((x) => {
                const i = QUESTIONS.indexOf(x);
                const a = answers[x.id];
                const stars = a != null ? x.options[a].stars : null;
                return (
                  <button
                    key={x.id}
                    onClick={() => onNav(i)}
                    className={`${styles.dot} ${i === index ? styles.dotCurrent : ''} ${a != null ? styles.dotDone : ''} ${stars ? styles[`s${stars}`] : ''}`}
                    aria-label={`${t({ en: 'Question', hi: 'प्रश्न' })} ${x.id}`}
                    aria-current={i === index ? 'step' : undefined}
                  >
                    {x.id}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      <div className={`card ${styles.qCard}`}>
        <div className={styles.progressRow}>
          <span>
            {t({ en: 'Question', hi: 'प्रश्न' })} <strong>{index + 1}</strong> / {TOTAL}
          </span>
          <span className={styles.sectionTag}>{t(section.label)}</span>
        </div>
        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={answered}>
          <span style={{ width: `${(answered / TOTAL) * 100}%` }} />
        </div>

        <div key={q.id} className={styles.qBody}>
          <div className={styles.qHead}>
            <span className={styles.qIcon}>
              <Ico size={26} strokeWidth={1.7} />
            </span>
            <div>
              <h2 className={styles.qTitle}>{t(q.q)}</h2>
              <p className={styles.qSub}>{q.q[other]}</p>
              {q.hint && <p className={styles.hint}>{t(q.hint)}</p>}
            </div>
          </div>

          <div className={styles.options} role="radiogroup" aria-label={t(q.q)}>
            {q.options.map((opt, i) => {
              const selected = chosen === i;
              return (
                <button
                  key={i}
                  role="radio"
                  aria-checked={selected}
                  className={`${styles.option} ${selected ? styles.selected : ''}`}
                  onClick={() => onPick(q.id, i)}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className={styles.letter}>{selected ? <CircleCheck size={18} /> : LETTERS[i]}</span>
                  <span className={styles.optText}>
                    <span>{t(opt)}</span>
                    {opt.stars != null && <small className={styles[`t${opt.stars}`]}>{t(starLabel(opt.stars))}</small>}
                  </span>
                  {opt.stars != null && <Stars n={opt.stars} size={14} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.navRow}>
          <button className="btn btn-ghost" onClick={() => onNav(index - 1)}>
            <ChevronLeft size={18} /> {index === 0 ? t({ en: 'Intro', hi: 'परिचय' }) : t({ en: 'Previous', hi: 'पिछला' })}
          </button>
          {isLast ? (
            <button className="btn btn-primary" onClick={onFinish} disabled={answered === 0}>
              {t({ en: 'See my Vastu report', hi: 'वास्तु रिपोर्ट देखें' })} <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => onNav(index + 1)}>
              {chosen == null ? t({ en: 'Skip', hi: 'छोड़ें' }) : t({ en: 'Next', hi: 'अगला' })} <ChevronRight size={18} />
            </button>
          )}
        </div>
        {answered >= 5 && !isLast && (
          <button className={styles.finishEarly} onClick={onFinish}>
            {t({ en: `See report with ${answered} answers`, hi: `${answered} उत्तरों के साथ रिपोर्ट देखें` })} →
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Result ---------- */
function KundliNote({ choice }) {
  const { t } = useLang();
  if (choice == null || choice >= 3) return null;
  const known = choice === 0 || choice === 2;
  return (
    <div className={`card ${styles.kundli}`}>
      <ScrollText size={28} className={styles.kundliIcon} />
      <div>
        <h3>{t({ en: 'Match your home with your kundli', hi: 'घर का वास्तु कुंडली से मिलाएँ' })}</h3>
        <p className="muted">
          {known
            ? t({
                en: 'The favourable directions for the head of the family depend on their birth chart. Generate the kundli to see which zones matter most for you.',
                hi: 'घर के मुखिया के लिए शुभ दिशाएँ उनकी जन्म कुंडली पर निर्भर करती हैं। अपनी कुंडली बनाकर जानें कि आपके लिए कौन-सी दिशाएँ सबसे महत्वपूर्ण हैं।',
              })
            : t({
                en: 'Without the birth time, an astrologer can still estimate it (birth-time rectification) from key life events.',
                hi: 'जन्म समय ज्ञात न होने पर भी ज्योतिषी जीवन की प्रमुख घटनाओं से जन्म समय का अनुमान (जन्म समय शोधन) लगा सकते हैं।',
              })}
        </p>
      </div>
      <Link href={known ? '/birth-chart' : '/astrologers'} className="btn btn-primary">
        {known ? t({ en: 'Free Kundli', hi: 'मुफ़्त कुंडली' }) : t({ en: 'Ask an Astrologer', hi: 'ज्योतिषी से पूछें' })} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function Result({ answers, onEdit, onReset }) {
  const { t } = useLang();
  const r = scoreAnswers(answers);
  const answered = Object.keys(answers).length;
  const R = 70;
  const C = 2 * Math.PI * R;
  const maxDist = Math.max(1, ...r.distribution.map((d) => d.count));

  return (
    <div className={styles.result}>
      <div className={`card card-glow ${styles.scoreCard} ${styles[`tone_${r.grade.tone}`]}`}>
        <div className={styles.ring}>
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r={R} className={styles.ringBg} />
            <circle cx="80" cy="80" r={R} className={styles.ringFg} strokeDasharray={C} strokeDashoffset={C * (1 - r.pct / 100)} />
          </svg>
          <div className={styles.ringText}>
            <strong>{r.pct}</strong>
            <span>/ 100</span>
          </div>
        </div>
        <div className={styles.scoreInfo}>
          <span className={styles.kicker}>{t({ en: 'Your Vastu score', hi: 'आपका वास्तु अंक' })}</span>
          <h2>{t(r.grade.label)}</h2>
          <p>{t(r.grade.text)}</p>
          <div className={styles.scoreMeta}>
            <span>
              <Star size={15} /> {r.total} / {r.max} {t({ en: 'stars', hi: 'सितारे' })}
            </span>
            <span>
              <CircleCheck size={15} /> {answered} / {TOTAL} {t({ en: 'answered', hi: 'उत्तर दिए' })}
            </span>
            <span>
              <TriangleAlert size={15} /> {r.defects.length} {t({ en: 'defects', hi: 'दोष' })}
            </span>
          </div>
          <div className={styles.resultActions}>
            <button className="btn btn-ghost btn-sm" onClick={onEdit}>
              <ChevronLeft size={16} /> {t({ en: 'Edit answers', hi: 'उत्तर बदलें' })}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => window.print()}>
              <Printer size={16} /> {t({ en: 'Print / Save PDF', hi: 'प्रिंट / PDF' })}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onReset}>
              <RotateCcw size={16} /> {t({ en: 'New check', hi: 'नई जाँच' })}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={`card ${styles.panel}`}>
          <h3>{t({ en: 'Score by area', hi: 'क्षेत्रवार अंक' })}</h3>
          <ul className={styles.bars}>
            {r.bySection.map((s) => (
              <li key={s.key}>
                <div className={styles.barLabel}>
                  <span>{t(s.label)}</span>
                  <strong>{s.pct}%</strong>
                </div>
                <div className={styles.bar}>
                  <span style={{ width: `${s.pct}%` }} className={styles[`bar_${s.pct >= 80 ? 'hi' : s.pct >= 60 ? 'mid' : 'lo'}`]} />
                </div>
              </li>
            ))}
          </ul>
          <h3 className={styles.distHead}>{t({ en: 'Answers by rating', hi: 'रेटिंग अनुसार उत्तर' })}</h3>
          <ul className={styles.dist}>
            {r.distribution.map((d) => (
              <li key={d.stars}>
                <Stars n={d.stars} size={12} />
                <div className={styles.bar}>
                  <span style={{ width: `${(d.count / maxDist) * 100}%` }} className={styles[`fill${d.stars}`]} />
                </div>
                <strong>{d.count}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className={`card ${styles.panel}`}>
          <h3>{t({ en: 'Your four corners', hi: 'आपके चारों कोण' })}</h3>
          <Mandala answers={answers} showResult />
        </div>
      </div>

      {r.defects.length > 0 && (
        <section className={styles.block}>
          <h3 className={styles.blockHead}>
            <TriangleAlert size={22} /> {t({ en: 'Defects & remedies', hi: 'वास्तु दोष एवं उपाय' })}
            <span>{r.defects.length}</span>
          </h3>
          <div className={styles.defects}>
            {r.defects.map(({ q, opt }) => (
              <article key={q.id} className={`${styles.defect} ${styles[`s${opt.stars}`]}`}>
                <div className={styles.defectTop}>
                  <span className={styles.qNum}>{q.id}</span>
                  <div>
                    <h4>{t(q.q)}</h4>
                    <p>
                      {t({ en: 'Your answer:', hi: 'आपका उत्तर:' })} <strong>{t(opt)}</strong>
                    </p>
                  </div>
                  <Stars n={opt.stars} size={13} />
                </div>
                {q.tip && (
                  <p className={styles.tip}>
                    <Lightbulb size={17} /> <span>{t(q.tip)}</span>
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {r.strengths.length > 0 && (
        <section className={styles.block}>
          <h3 className={styles.blockHead}>
            <Sparkles size={22} /> {t({ en: 'What is already auspicious', hi: 'आपके घर के शुभ पक्ष' })}
            <span className={styles.good}>{r.strengths.length}</span>
          </h3>
          <ul className={styles.strengths}>
            {r.strengths.map(({ q, opt }) => (
              <li key={q.id}>
                <CircleCheck size={18} />
                <span>
                  <small>{t(q.q)}</small>
                  {t(opt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <KundliNote choice={answers[25]} />

      <div className={`card ${styles.cta}`}>
        <div>
          <h3>{t({ en: 'Want a detailed Vastu consultation?', hi: 'विस्तृत वास्तु परामर्श चाहिए?' })}</h3>
          <p>
            {t({
              en: 'Share your floor plan with our Vastu expert for a room-by-room analysis and remedies without demolition.',
              hi: 'हमारे वास्तु विशेषज्ञ को अपने घर का नक्शा दिखाएँ — कक्ष-दर-कक्ष विश्लेषण और बिना तोड़-फोड़ के उपाय पाएँ।',
            })}
          </p>
        </div>
        <Link href="/contact" className="btn btn-dark btn-lg">
          {t({ en: 'Book Vastu Consultation', hi: 'वास्तु परामर्श बुक करें' })} <ArrowRight size={18} />
        </Link>
      </div>

      <p className={styles.disclaimer}>
        {t({
          en: 'This check is based on traditional Vastu Shastra guidelines and is meant for general guidance. It is not structural or engineering advice — consult a qualified professional before any construction change.',
          hi: 'यह जाँच पारंपरिक वास्तु शास्त्र के नियमों पर आधारित है और सामान्य मार्गदर्शन हेतु है। यह संरचनात्मक या इंजीनियरिंग सलाह नहीं है — किसी भी निर्माण परिवर्तन से पहले योग्य विशेषज्ञ से परामर्श लें।',
        })}
      </p>
    </div>
  );
}

/* ---------- Controller ---------- */
export default function VastuCheck() {
  const [answers, setAnswers, loaded] = useStoredState('vedicdhaam-vastu-answers', {});
  const [step, setStep, stepLoaded] = useStoredState('vedicdhaam-vastu-step', 'intro');
  const topRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (next) => {
    clearTimeout(timer.current);
    setStep(next);
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nav = (i) => go(i < 0 ? 'intro' : Math.min(i, TOTAL - 1));

  const pick = (id, i) => {
    setAnswers((a) => ({ ...a, [id]: i }));
    const idx = QUESTIONS.findIndex((q) => q.id === id);
    clearTimeout(timer.current);
    if (idx < TOTAL - 1) timer.current = setTimeout(() => go(idx + 1), 420);
  };

  const reset = () => {
    setAnswers({});
    go(0);
  };

  const answered = Object.keys(answers).length;
  const firstUnanswered = QUESTIONS.findIndex((q) => answers[q.id] == null);

  return (
    <section className={styles.section} ref={topRef}>
      <div className="container">
        {!loaded || !stepLoaded ? (
          <div className={styles.loading} />
        ) : step === 'result' && answered > 0 ? (
          <Result answers={answers} onEdit={() => go(0)} onReset={reset} />
        ) : typeof step === 'number' ? (
          <Question index={step} answers={answers} onPick={pick} onNav={nav} onFinish={() => go('result')} />
        ) : (
          <Intro
            answered={answered}
            onStart={() => go(answered === TOTAL ? 'result' : Math.max(0, firstUnanswered))}
            onReset={reset}
          />
        )}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Lightbulb, MessageSquareQuote, Sparkles, PenLine, ChevronLeft, ChevronRight, CircleCheck, ListChecks } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import PracticeTool from '@/components/manobal/PracticeTool';
import HelpBanner from '@/components/manobal/HelpBanner';
import useChapterProgress from '@/components/manobal/useChapterProgress';
import styles from './chapter.module.css';

const hiDigits = (n) => String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]);

function Reflection({ slug, questions }) {
  const { t } = useLang();
  const key = `vedicdhaam-manobal-reflect-${slug}`;
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setAnswers(JSON.parse(localStorage.getItem(key) || '{}'));
    } catch {}
  }, [key]);

  const update = (i, value) => {
    setAnswers((a) => {
      const next = { ...a, [i]: value };
      try {
        localStorage.setItem(key, JSON.stringify(next));
        setSaved(true);
      } catch {}
      return next;
    });
  };

  return (
    <div className={styles.reflect}>
      {questions.map((q, i) => (
        <div key={i} className={styles.reflectItem}>
          <label htmlFor={`reflect-${slug}-${i}`}>
            <span className={styles.qNum}>{i + 1}</span> {t(q)}
          </label>
          <textarea
            id={`reflect-${slug}-${i}`}
            className="input"
            rows={3}
            value={answers[i] || ''}
            onChange={(e) => update(i, e.target.value)}
            placeholder={t({ en: 'Write freely — only you can see this.', hi: 'खुलकर लिखें — इसे केवल आप देख सकते हैं।' })}
          />
        </div>
      ))}
      <p className={styles.privacy}>
        {saved
          ? t({ en: '✓ Saved privately on this device.', hi: '✓ इस उपकरण पर निजी रूप से सहेजा गया।' })
          : t({ en: 'Your answers are saved only on this device, never sent anywhere.', hi: 'आपके उत्तर केवल इसी उपकरण पर सहेजे जाते हैं, कहीं भेजे नहीं जाते।' })}
      </p>
    </div>
  );
}

export default function ChapterView({ chapter, prev, next, total }) {
  const { t, lang } = useLang();
  const { openSignIn } = useAuth();
  const progress = useChapterProgress();
  const done = progress.ready && progress.done.includes(chapter.slug);
  const num = (n) => (lang === 'hi' ? hiDigits(n) : n);

  const toggleDone = () => progress.setComplete(chapter.slug, !done);

  const sections = chapter.sections ?? [];
  const reflect = chapter.reflect ?? [];
  const summary = chapter.summary ?? [];

  const toc = [
    ...sections.map((s, i) => ({ id: `sec-${i + 1}`, label: s.heading })),
    chapter.astro && { id: 'astro', label: { en: 'Astrological view', hi: 'ज्योतिष दृष्टि' } },
    chapter.practice && { id: 'practice', label: { en: 'Practice', hi: 'अभ्यास' } },
    reflect.length > 0 && { id: 'reflect', label: { en: 'Reflect', hi: 'चिंतन' } },
    { id: 'summary', label: { en: 'Summary', hi: 'सारांश' } },
  ].filter(Boolean);

  return (
    <article className={`${styles.page} ${styles[`tone_${chapter.tone}`]}`}>
      <div className="container">
        {/* Hero */}
        <header className={`${styles.hero} fade-up`}>
          <nav className={styles.crumbs} aria-label={t({ en: 'Breadcrumb', hi: 'मार्ग' })}>
            <Link href="/">{t({ en: 'Home', hi: 'होम' })}</Link>
            <span aria-hidden="true">›</span>
            <Link href="/manobal">{t({ en: 'Manobal', hi: 'मनोबल' })}</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{t({ en: `Chapter ${chapter.number}`, hi: `अध्याय ${hiDigits(chapter.number)}` })}</span>
          </nav>
          <div className={styles.heroMain}>
            <span className={styles.heroIcon} aria-hidden="true">
              {chapter.icon}
            </span>
            <div>
              <span className={styles.chapterNo}>
                {t({ en: `Chapter ${chapter.number} of ${total}`, hi: `अध्याय ${hiDigits(chapter.number)} / ${hiDigits(total)}` })}
              </span>
              <h1>{t(chapter.title)}</h1>
              <p className={styles.subtitle}>{t(chapter.subtitle)}</p>
              <div className={styles.meta}>
                <span>
                  <Clock size={14} /> {num(chapter.minutes)} {t({ en: 'min read', hi: 'मिनट' })}
                </span>
                <span>
                  <Users size={14} /> {t(chapter.audience)}
                </span>
                {done && (
                  <span className={styles.doneBadge}>
                    <CircleCheck size={14} /> {t({ en: 'Completed', hi: 'पूर्ण' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className={styles.helpTop}>
          <HelpBanner compact />
        </div>

        <div className={styles.layout}>
          <aside className={styles.toc} aria-label={t({ en: 'In this chapter', hi: 'इस अध्याय में' })}>
            <strong>
              <ListChecks size={16} /> {t({ en: 'In this chapter', hi: 'इस अध्याय में' })}
            </strong>
            <nav>
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {t(item.label)}
                </a>
              ))}
            </nav>
          </aside>

          <div className={styles.content}>
            <p className={styles.intro}>{t(chapter.intro)}</p>

            {sections.map((s, i) => (
              <section key={i} id={`sec-${i + 1}`} className={styles.section}>
                <h2 className={styles.h2}>
                  <span className={styles.secNum}>{num(i + 1)}</span>
                  {t(s.heading)}
                </h2>
                {s.paragraphs?.map((p, j) => (
                  <p key={j}>{t(p)}</p>
                ))}
                {s.points && (
                  <ul className={styles.points}>
                    {s.points.map((pt, j) => (
                      <li key={j}>{t(pt)}</li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          {s.table.columns.map((c, j) => (
                            <th key={j}>{t(c)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, r) => (
                          <tr key={r}>
                            {row.map((cell, c) => (
                              <td key={c}>{t(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.example && (
                  <div className={styles.example}>
                    <strong>
                      <MessageSquareQuote size={17} /> {t({ en: 'Example', hi: 'उदाहरण' })}
                    </strong>
                    <p>{t(s.example)}</p>
                  </div>
                )}
                {s.tip && (
                  <div className={styles.tip}>
                    <strong>
                      <Lightbulb size={17} /> {t({ en: 'Remember', hi: 'याद रखें' })}
                    </strong>
                    <p>{t(s.tip)}</p>
                  </div>
                )}
              </section>
            ))}

            {chapter.astro && (
              <section id="astro" className={`${styles.section} ${styles.astro}`}>
                <span className={styles.astroTag}>
                  <Sparkles size={15} /> {t({ en: 'Astrological view', hi: 'ज्योतिष दृष्टि' })}
                </span>
                <h2 className={styles.astroTitle}>{t(chapter.astro.heading)}</h2>
                {(chapter.astro.paragraphs ?? []).map((p, j) => (
                  <p key={j}>{t(p)}</p>
                ))}
                {chapter.astro.mantra && (
                  <div className={styles.mantra}>
                    <p className={styles.mantraText}>{chapter.astro.mantra.text}</p>
                    <p className={styles.mantraMeaning}>{t(chapter.astro.mantra.meaning)}</p>
                  </div>
                )}
              </section>
            )}

            {chapter.practice && (
              <section id="practice" className={`${styles.section} ${styles.practice}`}>
                <span className={styles.practiceTag}>{t({ en: 'Practice — train your neurons', hi: 'अभ्यास — न्यूरॉन का प्रशिक्षण' })}</span>
                <h2 className={styles.practiceTitle}>{t(chapter.practice.title)}</h2>
                <ol className={styles.steps}>
                  {(chapter.practice.steps ?? []).map((st, j) => (
                    <li key={j}>
                      <span>{num(j + 1)}</span>
                      {t(st)}
                    </li>
                  ))}
                </ol>
                {chapter.practice.tool && (
                  <div className={styles.toolWrap}>
                    <PracticeTool tool={chapter.practice.tool} />
                  </div>
                )}
              </section>
            )}

            {reflect.length > 0 && (
              <section id="reflect" className={styles.section}>
                <h2 className={styles.h2}>
                  <PenLine size={22} className={styles.h2Icon} /> {t({ en: 'Reflect & write', hi: 'चिंतन करें और लिखें' })}
                </h2>
                <Reflection slug={chapter.slug} questions={reflect} />
              </section>
            )}

            <section id="summary" className={`${styles.section} ${styles.summary}`}>
              <h2 className={styles.summaryTitle}>{t({ en: 'Key takeaways', hi: 'सारांश — मुख्य बातें' })}</h2>
              <ul>
                {summary.map((s, j) => (
                  <li key={j}>{t(s)}</li>
                ))}
              </ul>
              <button className={`btn ${done ? 'btn-ghost' : 'btn-primary'} btn-lg`} onClick={toggleDone} aria-pressed={done} disabled={!progress.ready}>
                <CircleCheck size={18} />
                {done ? t({ en: 'Completed — mark as not done', hi: 'पूर्ण — अपूर्ण चिह्नित करें' }) : t({ en: 'Mark chapter complete', hi: 'अध्याय पूर्ण करें' })}
              </button>
              {progress.ready && (
                <p className={styles.syncNote}>
                  {progress.synced ? (
                    t({ en: '☁️ Progress is saved to your account.', hi: '☁️ प्रगति आपके खाते में सहेजी जाती है।' })
                  ) : (
                    <>
                      {t({ en: 'Progress is saved on this device only.', hi: 'प्रगति केवल इसी उपकरण पर सहेजी जा रही है।' })}{' '}
                      <button type="button" onClick={() => openSignIn()}>
                        {t({ en: 'Sign in to keep it on every device', hi: 'साइन इन करें — हर उपकरण पर सुरक्षित रहे' })}
                      </button>
                    </>
                  )}
                </p>
              )}
              {progress.error && (
                <p className={styles.errorText} role="alert">
                  {progress.error}
                </p>
              )}
            </section>

            <nav className={styles.pager} aria-label={t({ en: 'Chapter navigation', hi: 'अध्याय नेविगेशन' })}>
              {prev ? (
                <Link href={`/manobal/${prev.slug}`} className={styles.pagerLink}>
                  <small>
                    <ChevronLeft size={14} /> {t({ en: 'Previous chapter', hi: 'पिछला अध्याय' })}
                  </small>
                  <strong>
                    {prev.icon} {t(prev.title)}
                  </strong>
                </Link>
              ) : (
                <Link href="/manobal" className={styles.pagerLink}>
                  <small>
                    <ChevronLeft size={14} /> {t({ en: 'Back to', hi: 'वापस' })}
                  </small>
                  <strong>{t({ en: 'All chapters', hi: 'सभी अध्याय' })}</strong>
                </Link>
              )}
              {next ? (
                <Link href={`/manobal/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                  <small>
                    {t({ en: 'Next chapter', hi: 'अगला अध्याय' })} <ChevronRight size={14} />
                  </small>
                  <strong>
                    {next.icon} {t(next.title)}
                  </strong>
                </Link>
              ) : (
                <Link href="/manobal" className={`${styles.pagerLink} ${styles.pagerNext}`}>
                  <small>
                    {t({ en: 'Course complete', hi: 'पाठ्यक्रम पूर्ण' })} <ChevronRight size={14} />
                  </small>
                  <strong>{t({ en: 'Back to Manobal', hi: 'मनोबल पर लौटें' })}</strong>
                </Link>
              )}
            </nav>

            <div className={styles.helpBottom}>
              <HelpBanner />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

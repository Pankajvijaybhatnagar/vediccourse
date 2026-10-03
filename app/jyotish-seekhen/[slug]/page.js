import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ChevronLeft, ChevronRight, Clock, Lightbulb, ListChecks } from 'lucide-react';
import { LESSONS, getLesson, hindiNum } from '@/lib/jyotish/lessons';
import Quiz from './Quiz';
import CompleteButton from './CompleteButton';
import styles from './lesson.module.css';

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return {
    title: `पाठ ${hindiNum(lesson.number)}: ${lesson.title} — ज्योतिष सीखें`,
    description: lesson.subtitle,
  };
}

export default async function LessonPage({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const index = LESSONS.indexOf(lesson);
  const prev = LESSONS[index - 1];
  const next = LESSONS[index + 1];

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={`${styles.banner} mandala-bg`}>
            <nav className={styles.crumbs} aria-label="मार्ग">
              <Link href="/">होम</Link>
              <span aria-hidden="true">›</span>
              <Link href="/jyotish-seekhen">ज्योतिष सीखें</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">पाठ {hindiNum(lesson.number)}</span>
            </nav>
            <div className={styles.bannerInner}>
              <span className={styles.bigIcon} aria-hidden="true">
                {lesson.icon}
              </span>
              <div>
                <div className={styles.meta}>
                  <span className={styles.lessonNo}>
                    पाठ {hindiNum(lesson.number)} / {hindiNum(LESSONS.length)}
                  </span>
                  <span className={`${styles.level} ${lesson.level === 'मध्यम' ? styles.levelMid : ''}`}>{lesson.level}</span>
                  <span className={styles.time}>
                    <Clock size={14} aria-hidden="true" /> {hindiNum(lesson.minutes)} मिनट
                  </span>
                </div>
                <h1 className={styles.title}>{lesson.title}</h1>
                <p className={styles.subtitle}>{lesson.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <aside className={styles.toc} aria-label="विषय-सूची">
          <details className={styles.tocBox} open>
            <summary>
              <BookOpen size={16} aria-hidden="true" /> इस पाठ में
            </summary>
            <ol>
              <li>
                <a href="#parichay">परिचय</a>
              </li>
              {lesson.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#khand-${i + 1}`}>{s.heading}</a>
                </li>
              ))}
              <li>
                <a href="#saransh">सारांश</a>
              </li>
              <li>
                <a href="#prashnottari">प्रश्नोत्तरी</a>
              </li>
            </ol>
          </details>
        </aside>

        <div className={styles.content}>
          <p id="parichay" className={styles.intro}>
            {lesson.intro}
          </p>

          {lesson.sections.map((s, i) => (
            <section key={s.heading} id={`khand-${i + 1}`} className={styles.block}>
              <h2 className={styles.h2}>
                <span className={styles.h2Num}>{hindiNum(i + 1)}</span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((para) => (
                <p key={para.slice(0, 32)} className={styles.para}>
                  {para}
                </p>
              ))}
              {s.points && (
                <ul className={styles.points}>
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
              {s.table && (
                <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={`${s.heading} — सारणी`}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {s.table.columns.map((c) => (
                          <th key={c} scope="col">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.tip && (
                <aside className={styles.tip}>
                  <span className={styles.tipHead}>
                    <Lightbulb size={17} aria-hidden="true" /> याद रखें
                  </span>
                  <p>{s.tip}</p>
                </aside>
              )}
            </section>
          ))}

          <section id="saransh" className={styles.summary}>
            <h2 className={styles.h2}>
              <ListChecks size={22} aria-hidden="true" className={styles.summaryIcon} />
              सारांश — मुख्य बिंदु
            </h2>
            <ul>
              {lesson.summary.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </section>

          <section id="prashnottari" className={styles.block}>
            <h2 className={styles.h2}>
              <span className={styles.h2Num}>?</span>
              प्रश्नोत्तरी — अपना ज्ञान परखें
            </h2>
            <Quiz questions={lesson.quiz} />
          </section>

          <CompleteButton slug={lesson.slug} nextSlug={next?.slug} />

          <nav className={styles.pager} aria-label="पाठ नेविगेशन">
            {prev ? (
              <Link href={`/jyotish-seekhen/${prev.slug}`} className={styles.pageLink}>
                <ChevronLeft size={20} aria-hidden="true" />
                <span>
                  <small>पिछला पाठ</small>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <Link href="/jyotish-seekhen" className={styles.pageLink}>
                <ChevronLeft size={20} aria-hidden="true" />
                <span>
                  <small>वापस</small>
                  पाठ्यक्रम सूची
                </span>
              </Link>
            )}
            {next ? (
              <Link href={`/jyotish-seekhen/${next.slug}`} className={`${styles.pageLink} ${styles.pageNext}`}>
                <span>
                  <small>अगला पाठ</small>
                  {next.title}
                </span>
                <ChevronRight size={20} aria-hidden="true" />
              </Link>
            ) : (
              <Link href="/birth-chart" className={`${styles.pageLink} ${styles.pageNext}`}>
                <span>
                  <small>अभ्यास करें</small>
                  अपनी कुंडली बनाएँ
                </span>
                <ChevronRight size={20} aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}

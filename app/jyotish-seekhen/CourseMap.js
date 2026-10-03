'use client';

import Link from 'next/link';
import { Clock, CircleCheck, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { hindiNum } from '@/lib/jyotish/num';
import useLessonProgress from './useLessonProgress';
import styles from './jyotish.module.css';

export default function CourseMap({ lessons }) {
  const { openSignIn } = useAuth();
  const { done, stats, ready, synced, reset, error } = useLessonProgress();
  const completed = lessons.filter((l) => done.includes(l.slug)).length;
  const percent = Math.round((completed / lessons.length) * 100);
  const nextLesson = lessons.find((l) => !done.includes(l.slug)) || lessons[0];

  const confirmReset = () => {
    if (window.confirm('क्या आप सारी प्रगति मिटाना चाहते हैं?')) reset();
  };

  return (
    <section className={styles.map} aria-labelledby="course-path">
      <div className={styles.progressCard}>
        <div className={styles.progressText}>
          <h2 id="course-path" className={styles.blockTitle}>
            पाठ्यक्रम मार्ग
          </h2>
          <p>
            {ready && completed > 0
              ? completed === lessons.length
                ? 'बधाई हो! आपने सभी पाठ पूर्ण कर लिए हैं।'
                : `आपने ${hindiNum(lessons.length)} में से ${hindiNum(completed)} पाठ पूर्ण किए हैं। अध्ययन जारी रखें!`
              : 'पहले पाठ से आरंभ करें और क्रम से आगे बढ़ें।'}
          </p>
          {ready && (
            <p className={styles.syncNote}>
              {synced ? (
                '☁️ आपकी प्रगति आपके खाते में सुरक्षित है — किसी भी डिवाइस पर जारी रखें।'
              ) : (
                <>
                  <span>प्रगति अभी केवल इसी डिवाइस पर सहेजी जा रही है।</span>
                  <button type="button" onClick={() => openSignIn()}>
                    साइन इन करके सभी डिवाइस पर सहेजें
                  </button>
                </>
              )}
            </p>
          )}
          {error && (
            <p className={styles.errorText} role="alert">
              {error}
            </p>
          )}
        </div>
        <div className={styles.progressRight}>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={ready ? percent : 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="पाठ्यक्रम प्रगति"
          >
            <span style={{ width: `${ready ? percent : 0}%` }} />
          </div>
          <div className={styles.progressMeta}>
            <strong>{hindiNum(ready ? percent : 0)}%</strong>
            {ready && completed === lessons.length ? (
              <Trophy size={18} aria-hidden="true" />
            ) : (
              <Link href={`/jyotish-seekhen/${nextLesson.slug}`} className={styles.continue}>
                {completed ? 'जारी रखें' : 'आरंभ करें'} <ChevronRight size={16} />
              </Link>
            )}
            {ready && completed > 0 && (
              <button type="button" className={styles.reset} onClick={confirmReset} title="प्रगति मिटाएँ">
                <RotateCcw size={14} /> पुनः आरंभ
              </button>
            )}
          </div>
        </div>
      </div>

      <ol className={styles.path}>
        {lessons.map((l) => {
          const isDone = ready && done.includes(l.slug);
          const stat = stats[l.slug];
          return (
            <li key={l.slug} className={styles.pathItem}>
              <span className={`${styles.pathDot} ${isDone ? styles.pathDotDone : ''}`} aria-hidden="true">
                {isDone ? <CircleCheck size={18} /> : hindiNum(l.number)}
              </span>
              <Link href={`/jyotish-seekhen/${l.slug}`} className={`${styles.lessonCard} ${isDone ? styles.lessonDone : ''}`}>
                <span className={styles.lessonIcon} aria-hidden="true">
                  {l.icon}
                </span>
                <span className={styles.lessonBody}>
                  <span className={styles.lessonTop}>
                    <span className={styles.lessonNum}>पाठ {hindiNum(l.number)}</span>
                    <span className={`${styles.level} ${l.level === 'मध्यम' ? styles.levelMid : ''}`}>{l.level}</span>
                  </span>
                  <span className={styles.lessonTitle}>{l.title}</span>
                  <span className={styles.lessonSub}>{l.subtitle}</span>
                  <span className={styles.lessonMeta}>
                    <Clock size={14} aria-hidden="true" /> {hindiNum(l.minutes)} मिनट
                    {isDone && <span className={styles.doneTag}>✓ पूर्ण</span>}
                    {stat?.attempts > 0 && stat.total > 0 && (
                      <span className={styles.score} title={`${hindiNum(stat.attempts)} प्रयास`}>
                        🏅 {hindiNum(stat.bestScore ?? 0)}/{hindiNum(stat.total)}
                      </span>
                    )}
                  </span>
                </span>
                <ChevronRight size={20} className={styles.lessonArrow} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { CircleCheck, GraduationCap } from 'lucide-react';
import useProgress from '@/lib/jyotish/progress';
import styles from './lesson.module.css';

export default function CompleteButton({ slug, nextSlug }) {
  const { done, ready, setComplete } = useProgress();
  const isDone = ready && done.includes(slug);

  return (
    <div className={`${styles.complete} ${isDone ? styles.completeDone : ''}`}>
      <span className={styles.completeIcon} aria-hidden="true">
        {isDone ? <CircleCheck size={28} /> : <GraduationCap size={28} />}
      </span>
      <div className={styles.completeText}>
        <strong>{isDone ? 'यह पाठ पूर्ण हो गया है!' : 'क्या आपने यह पाठ पढ़ लिया?'}</strong>
        <span>{isDone ? 'आपकी प्रगति सहेज ली गई है। अगले पाठ की ओर बढ़ें।' : 'पाठ पूर्ण चिह्नित करें ताकि आपकी प्रगति पाठ्यक्रम सूची में दिखे।'}</span>
      </div>
      <div className={styles.completeBtns}>
        {isDone ? (
          <>
            <button type="button" className={styles.undo} onClick={() => setComplete(slug, false)}>
              अपूर्ण करें
            </button>
            {nextSlug && (
              <Link href={`/jyotish-seekhen/${nextSlug}`} className="btn btn-primary">
                अगला पाठ →
              </Link>
            )}
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setComplete(slug, true)} disabled={!ready}>
            ✓ पाठ पूर्ण करें
          </button>
        )}
      </div>
    </div>
  );
}

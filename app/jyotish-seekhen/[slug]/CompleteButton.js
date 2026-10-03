'use client';

import Link from 'next/link';
import { CircleCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import useLessonProgress from '../useLessonProgress';
import styles from './lesson.module.css';

export default function CompleteButton({ slug, nextSlug }) {
  const { openSignIn } = useAuth();
  const { done, ready, synced, setComplete, error } = useLessonProgress();
  const isDone = ready && done.includes(slug);

  return (
    <div className={`${styles.complete} ${isDone ? styles.completeDone : ''}`}>
      <span className={styles.completeIcon} aria-hidden="true">
        {isDone ? <CircleCheck size={28} /> : <GraduationCap size={28} />}
      </span>
      <div className={styles.completeText}>
        <strong>{isDone ? 'यह पाठ पूर्ण हो गया है!' : 'क्या आपने यह पाठ पढ़ लिया?'}</strong>
        <span>
          {isDone
            ? synced
              ? 'आपकी प्रगति आपके खाते में सहेज ली गई है। अगले पाठ की ओर बढ़ें।'
              : 'आपकी प्रगति इस डिवाइस पर सहेज ली गई है। अगले पाठ की ओर बढ़ें।'
            : 'पाठ पूर्ण चिह्नित करें ताकि आपकी प्रगति पाठ्यक्रम सूची में दिखे।'}
        </span>
        {ready && !synced && (
          <button type="button" className={styles.syncLink} onClick={() => openSignIn()}>
            साइन इन करें — प्रगति हर डिवाइस पर सुरक्षित रहेगी
          </button>
        )}
        {error && (
          <span className={styles.errorText} role="alert">
            {error}
          </span>
        )}
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

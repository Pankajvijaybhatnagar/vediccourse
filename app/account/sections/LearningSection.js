'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Brain } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { ErrorState, ListSkeleton } from '../ui';
import styles from '../account.module.css';

const COURSES = [
  {
    id: 'jyotish',
    icon: BookOpen,
    title: { en: 'Learn Jyotish (ज्योतिष सीखें)', hi: 'ज्योतिष सीखें' },
    href: '/jyotish-seekhen',
    list: '/jyotish/lessons?limit=100',
    progress: '/jyotish/progress',
    itemHref: (slug) => `/jyotish-seekhen/${slug}`,
    unit: { en: 'lessons', hi: 'पाठ' },
  },
  {
    id: 'manobal',
    icon: Brain,
    title: { en: 'Manobal: Mind & Career', hi: 'मनोबल: मन एवं करियर' },
    href: '/manobal',
    list: '/manobal/chapters?limit=100',
    progress: '/manobal/progress',
    itemHref: (slug) => `/manobal/${slug}`,
    unit: { en: 'chapters', hi: 'अध्याय' },
  },
];

function CourseCard({ course }) {
  const { t } = useLang();
  const [state, setState] = useState({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const [items, progress] = await Promise.all([api(course.list, { auth: false }), api(course.progress)]);
      setState({ status: 'ready', items: items.data || [], progress: progress.data || [] });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }, [course]);

  useEffect(() => {
    load();
  }, [load]);

  const Icon = course.icon;
  if (state.status === 'loading') return <ListSkeleton rows={1} />;
  if (state.status === 'error') return <ErrorState error={state.error} onRetry={load} />;

  const bySlug = new Map(state.progress.map((p) => [p.slug, p]));
  const total = state.items.length;
  const done = state.items.filter((i) => bySlug.get(i.slug)?.completedAt).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const nextItem = state.items.find((i) => !bySlug.get(i.slug)?.completedAt);
  const scored = state.items.filter((i) => bySlug.get(i.slug)?.attempts);

  return (
    <section className={styles.card}>
      <div className={styles.courseHead}>
        <span className={styles.rowIcon}>
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3>{t(course.title)}</h3>
          <small className="muted">
            {done}/{total} {t(course.unit)} {t({ en: 'completed', hi: 'पूर्ण' })}
          </small>
        </div>
      </div>
      <div className={styles.progress} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={t(course.title)}>
        <span style={{ width: `${pct}%` }} />
      </div>

      {scored.length > 0 && (
        <ul className={styles.scores}>
          {scored.map((i) => {
            const p = bySlug.get(i.slug);
            return (
              <li key={i.slug}>
                <Link href={course.itemHref(i.slug)}>{t(i.title)}</Link>
                <span>
                  {t({ en: 'Best quiz score', hi: 'सर्वश्रेष्ठ अंक' })}: {p.bestScore}
                  {p.total ? `/${p.total}` : ''}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles.btnRow}>
        {nextItem ? (
          <Link href={course.itemHref(nextItem.slug)} className="btn btn-primary btn-sm">
            {done ? t({ en: 'Continue', hi: 'जारी रखें' }) : t({ en: 'Start', hi: 'आरंभ करें' })}: {t(nextItem.title)}
          </Link>
        ) : (
          total > 0 && <span className={styles.success}>{t({ en: 'Course completed. Well done!', hi: 'पाठ्यक्रम पूर्ण। बहुत बढ़िया!' })}</span>
        )}
        <Link href={course.href} className="btn btn-ghost btn-sm">
          {t({ en: 'Course overview', hi: 'पाठ्यक्रम देखें' })}
        </Link>
      </div>
    </section>
  );
}

export default function LearningSection() {
  return (
    <div className={styles.stack}>
      {COURSES.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}

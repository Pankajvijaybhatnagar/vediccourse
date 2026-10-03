'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import useLocalProgress, { PROGRESS_KEY } from '@/lib/jyotish/progress';

const mergedKey = (userId) => `${PROGRESS_KEY}-merged-${userId}`;

/**
 * पाठ्यक्रम प्रगति। साइन-इन होने पर सर्वर (/jyotish/progress), अन्यथा इसी डिवाइस पर localStorage।
 * साइन-इन के बाद अतिथि के रूप में पूर्ण किए गए पाठ एक बार खाते में जोड़ दिए जाते हैं।
 *
 * @returns {{ done: string[], stats: Record<string, {bestScore?: number, attempts?: number, total?: number}>,
 *            ready: boolean, synced: boolean, setComplete: (slug: string, value: boolean) => Promise<void>,
 *            reset: () => Promise<void>, recordQuiz: (progress: object) => void, error: string }}
 */
export default function useLessonProgress() {
  const { user, ready: authReady } = useAuth();
  const local = useLocalProgress();
  const [remote, setRemote] = useState(null); // array of progress docs, or null while loading / for guests
  const [error, setError] = useState('');

  const userId = user?.id;

  useEffect(() => {
    if (!authReady || !userId) {
      setRemote(null);
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        // One-time merge of lessons completed as a guest on this device.
        let alreadyMerged = false;
        try {
          alreadyMerged = localStorage.getItem(mergedKey(userId)) === '1';
        } catch {}
        if (!alreadyMerged && local.ready && local.done.length) {
          await Promise.allSettled(
            local.done.map((slug) => api(`/jyotish/progress/${encodeURIComponent(slug)}`, { method: 'PUT', body: { completed: true } }))
          );
        }
        if (local.ready) {
          try {
            localStorage.setItem(mergedKey(userId), '1');
          } catch {}
        }

        const { data } = await api('/jyotish/progress');
        if (!cancelled) {
          setRemote(data);
          setError('');
        }
      } catch {
        if (!cancelled) {
          setRemote([]);
          setError('प्रगति लोड नहीं हो सकी। कृपया पृष्ठ पुनः लोड करें।');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // local.done intentionally omitted: merge reads it once when the user/local state is ready.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, userId, local.ready]);

  const synced = Boolean(userId);
  const ready = authReady && (synced ? remote !== null : local.ready);
  const done = synced ? (remote ?? []).filter((p) => p.completedAt).map((p) => p.slug) : local.done;
  const stats = synced ? Object.fromEntries((remote ?? []).map((p) => [p.slug, p])) : {};

  const upsert = (doc) =>
    setRemote((prev) => {
      const list = prev ?? [];
      return list.some((p) => p.slug === doc.slug) ? list.map((p) => (p.slug === doc.slug ? { ...p, ...doc } : p)) : [...list, doc];
    });

  const setComplete = useCallback(
    async (slug, value) => {
      if (!synced) {
        local.setComplete(slug, value);
        return;
      }
      try {
        const { data } = await api(`/jyotish/progress/${encodeURIComponent(slug)}`, { method: 'PUT', body: { completed: value } });
        // `completedAt` is unset on undo; make sure the merged doc reflects that.
        upsert({ ...data, completedAt: value ? data.completedAt : undefined });
        setError('');
      } catch (err) {
        setError(err.message || 'प्रगति सहेजी नहीं जा सकी।');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [synced, local.setComplete]
  );

  const reset = useCallback(async () => {
    if (!synced) {
      local.reset();
      return;
    }
    try {
      await api('/jyotish/progress', { method: 'DELETE' });
      setRemote([]);
    } catch (err) {
      setError(err.message || 'प्रगति मिटाई नहीं जा सकी।');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synced, local.reset]);

  /** Quiz grading response for a signed-in user carries the updated progress doc. */
  const recordQuiz = useCallback((progress) => {
    if (progress?.slug) upsert(progress);
  }, []);

  return { done, stats, ready, synced, setComplete, reset, recordQuiz, error };
}

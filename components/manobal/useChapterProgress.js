'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export const PROGRESS_KEY = 'vedicdhaam-manobal-progress';
const mergedKey = (userId) => `${PROGRESS_KEY}-merged-${userId}`;

function readLocal() {
  try {
    const v = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
    return Array.isArray(v) ? v.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function writeLocal(list) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(list));
  } catch {}
}

/**
 * Manobal chapter progress. Signed in: /manobal/progress (all devices). Guest: localStorage (this device).
 * Chapters a guest completed on this device are added to the account once, after sign-in.
 *
 * @returns {{ done: string[], ready: boolean, synced: boolean, setComplete: (slug: string, value: boolean) => Promise<void>, error: string }}
 */
export default function useChapterProgress() {
  const { user, ready: authReady } = useAuth();
  const userId = user?.id;
  const [local, setLocal] = useState(null); // null until read after mount (no hydration mismatch)
  const [remote, setRemote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocal(readLocal());
    const onStorage = (e) => e.key === PROGRESS_KEY && setLocal(readLocal());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!authReady || !userId) {
      setRemote(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        let merged = false;
        try {
          merged = localStorage.getItem(mergedKey(userId)) === '1';
        } catch {}
        const localDone = readLocal();
        if (!merged && localDone.length) {
          await Promise.allSettled(
            localDone.map((slug) => api(`/manobal/progress/${encodeURIComponent(slug)}`, { method: 'PUT', body: { completed: true } }))
          );
        }
        try {
          localStorage.setItem(mergedKey(userId), '1');
        } catch {}
        const { data } = await api('/manobal/progress');
        if (!cancelled) {
          setRemote(data.filter((p) => p.completedAt).map((p) => p.slug));
          setError('');
        }
      } catch {
        if (!cancelled) {
          setRemote([]);
          setError('Could not load your progress. Please refresh. / प्रगति लोड नहीं हो सकी।');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authReady, userId]);

  const synced = Boolean(userId);
  const ready = authReady && (synced ? remote !== null : local !== null);
  const done = (synced ? remote : local) ?? [];

  const setComplete = useCallback(
    async (slug, value) => {
      if (!synced) {
        const next = value ? [...new Set([...readLocal(), slug])] : readLocal().filter((s) => s !== slug);
        writeLocal(next);
        setLocal(next);
        return;
      }
      setRemote((prev) => (value ? [...new Set([...(prev ?? []), slug])] : (prev ?? []).filter((s) => s !== slug)));
      try {
        await api(`/manobal/progress/${encodeURIComponent(slug)}`, { method: 'PUT', body: { completed: value } });
        setError('');
      } catch (err) {
        // Roll back the optimistic update.
        setRemote((prev) => (value ? (prev ?? []).filter((s) => s !== slug) : [...new Set([...(prev ?? []), slug])]));
        setError(err.message || 'Could not save progress.');
      }
    },
    [synced]
  );

  return { done, ready, synced, setComplete, error };
}

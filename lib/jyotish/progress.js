'use client';

import { useCallback, useEffect, useState } from 'react';

export const PROGRESS_KEY = 'vedicdhaam-jyotish-progress';

function read() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(list));
  } catch {}
}

/**
 * पूर्ण किए गए पाठों की सूची। माउंट के बाद ही पढ़ी जाती है ताकि सर्वर और
 * ब्राउज़र का HTML समान रहे; localStorage उपलब्ध न हो तो खाली सूची।
 */
export default function useProgress() {
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(read());
    setReady(true);
    const onStorage = (e) => e.key === PROGRESS_KEY && setDone(read());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setComplete = useCallback((slug, value) => {
    setDone((prev) => {
      const next = value ? Array.from(new Set([...prev, slug])) : prev.filter((s) => s !== slug);
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    write([]);
    setDone([]);
  }, []);

  return { done, ready, setComplete, reset };
}

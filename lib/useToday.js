'use client';

import { useEffect, useState } from 'react';

/**
 * The visitor's current date, resolved after mount so server-rendered markup
 * never disagrees with the browser's timezone.
 */
export default function useToday() {
  const [today, setToday] = useState(null);
  useEffect(() => setToday(new Date()), []);
  return today;
}

export const formatDate = (date, opts = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) =>
  date ? date.toLocaleDateString('en-US', opts) : '';

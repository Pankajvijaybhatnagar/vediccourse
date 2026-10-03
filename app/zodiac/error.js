'use client';

import RouteError from '@/components/astro/RouteError';

export default function ZodiacError({ retry }) {
  return <RouteError retry={retry} />;
}

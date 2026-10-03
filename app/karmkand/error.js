'use client';

import { RouteError } from '@/components/RouteStates';

export default function KarmkandError(props) {
  return <RouteError {...props} homeHref="/karmkand" />;
}

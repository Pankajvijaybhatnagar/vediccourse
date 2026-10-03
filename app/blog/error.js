'use client';

import { RouteError } from '@/components/RouteStates';

export default function BlogError(props) {
  return <RouteError {...props} homeHref="/" />;
}

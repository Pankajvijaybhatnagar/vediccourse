'use client';

import { RouteError } from '@/components/booking/PageStates';

export default function Error({ error, retry, reset }) {
  return <RouteError error={error} retry={retry ?? reset} />;
}

import { Suspense } from 'react';
import Messages from '@/components/pandit/Messages';

export const metadata = { title: 'Messages · संदेश' };

export default function Page() {
  return (
    <Suspense>
      <Messages />
    </Suspense>
  );
}

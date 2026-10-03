import { Skeleton } from '@/components/booking/PageStates';

export default function Loading() {
  return <Skeleton cards={3} rows={3} className="page-top" />;
}

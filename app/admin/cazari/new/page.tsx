import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminCazariNewPage() {
  return <AdminPanel initialSection="accommodations" initialAction="new" initialKind="accommodation" />;
}

import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminCazariPage() {
  return <AdminPanel initialSection="accommodations" initialKind="accommodation" />;
}

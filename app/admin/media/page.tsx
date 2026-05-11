import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminMediaPage() {
  return <AdminPanel initialSection="media" />;
}

import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  return <AdminPanel initialSection="settings" />;
}

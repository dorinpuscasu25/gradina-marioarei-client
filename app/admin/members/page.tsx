import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminMembersPage() {
  return <AdminPanel initialSection="members" />;
}

import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminExperientePage() {
  return <AdminPanel initialSection="experiences" initialKind="experience" />;
}

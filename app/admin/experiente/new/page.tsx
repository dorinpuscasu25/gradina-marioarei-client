import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminExperienteNewPage() {
  return <AdminPanel initialSection="experiences" initialAction="new" initialKind="experience" />;
}

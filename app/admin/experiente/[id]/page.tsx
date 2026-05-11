import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminExperienteEditPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminPanel initialSection="experiences" initialAction="edit" initialKind="experience" initialId={id} />;
}

import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCazariEditPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminPanel initialSection="accommodations" initialAction="edit" initialKind="accommodation" initialId={id} />;
}

import { notFound } from 'next/navigation';
import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ kind: string; id: string }>;
};

export default async function AdminEditListingPage({ params }: PageProps) {
  const { kind, id } = await params;

  if (kind !== 'accommodation' && kind !== 'experience') {
    notFound();
  }

  return <AdminPanel initialSection="listings" initialAction="edit" initialKind={kind} initialId={id} />;
}

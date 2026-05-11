import { notFound } from 'next/navigation';
import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ kind: string }>;
};

export default async function AdminNewListingPage({ params }: PageProps) {
  const { kind } = await params;

  if (kind !== 'accommodation' && kind !== 'experience') {
    notFound();
  }

  return <AdminPanel initialSection="listings" initialAction="new" initialKind={kind} />;
}

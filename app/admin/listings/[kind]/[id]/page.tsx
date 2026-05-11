import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ kind: string; id: string }>;
};

export default async function AdminEditListingPage({ params }: PageProps) {
  const { kind, id } = await params;

  if (kind !== 'accommodation' && kind !== 'experience') {
    notFound();
  }

  redirect(kind === 'accommodation' ? `/admin/cazari/${id}` : `/admin/experiente/${id}`);
}

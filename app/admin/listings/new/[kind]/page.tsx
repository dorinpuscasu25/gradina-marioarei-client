import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ kind: string }>;
};

export default async function AdminNewListingPage({ params }: PageProps) {
  const { kind } = await params;

  if (kind !== 'accommodation' && kind !== 'experience') {
    notFound();
  }

  redirect(kind === 'accommodation' ? '/admin/cazari/new' : '/admin/experiente/new');
}

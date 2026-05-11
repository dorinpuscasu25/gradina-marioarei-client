import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin | Grădina Mărioarei',
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  redirect('/admin/today');
}

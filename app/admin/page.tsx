import type { Metadata } from 'next';
import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin | Grădina Mărioarei',
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminPanel />;
}

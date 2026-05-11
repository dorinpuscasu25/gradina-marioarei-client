import { AdminPanel } from '@/src/components/admin/AdminPanel';

export const dynamic = 'force-dynamic';

export default function AdminBookingsPage() {
  return <AdminPanel initialSection="bookings" />;
}

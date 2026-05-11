import { NextRequest, NextResponse } from 'next/server';
import { getPublicSupabase } from '@/src/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = getPublicSupabase();

  if (!supabase) {
    return NextResponse.json({ ok: true, offline: true });
  }

  const body = await request.json();
  const payload = {
    accommodation_id: body.accommodation_id || null,
    unit_label: String(body.unit_label ?? ''),
    checkin: body.checkin,
    checkout: body.checkout,
    guests: Number(body.guests || 1),
    full_name: String(body.full_name ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    email: String(body.email ?? '').trim(),
    notes: String(body.notes ?? '').trim(),
    source: 'website'
  };

  if (!payload.checkin || !payload.checkout || !payload.full_name || !payload.phone || !payload.email) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const { error } = await supabase.from('bookings').insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

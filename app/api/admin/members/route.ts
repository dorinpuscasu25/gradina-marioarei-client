import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/src/lib/supabase/server';

async function requireAdmin(request: NextRequest) {
  const supabase = getServiceSupabase();
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!supabase) {
    return { error: 'Missing SUPABASE_SERVICE_ROLE_KEY.', status: 500 as const };
  }

  if (!token) {
    return { error: 'Missing bearer token.', status: 401 as const };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return { error: 'Invalid session.', status: 401 as const };
  }

  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('role,is_active')
    .eq('id', userData.user.id)
    .single();

  if (profileError || !profile?.is_active || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'Only owners and admins can manage members.', status: 403 as const };
  }

  return { supabase, user: userData.user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { data, error } = await auth.supabase.from('admin_profiles').select('*').order('created_at', { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ members: data });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');
  const fullName = String(body.full_name ?? '').trim();
  const role = ['admin', 'editor', 'viewer'].includes(body.role) ? body.role : 'editor';

  if (!email || password.length < 8) {
    return NextResponse.json({ error: 'Emailul este obligatoriu, iar parola trebuie să aibă minimum 8 caractere.' }, { status: 400 });
  }

  const { data: created, error: createError } = await auth.supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role
    }
  });

  if (createError || !created.user) {
    return NextResponse.json({ error: createError?.message ?? 'User creation failed.' }, { status: 500 });
  }

  const { error: profileError } = await auth.supabase.from('admin_profiles').upsert({
    id: created.user.id,
    email,
    full_name: fullName,
    role,
    is_active: true
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ member: { id: created.user.id, email, full_name: fullName, role } });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
  }

  if (id === auth.user.id) {
    return NextResponse.json({ error: 'Nu poți șterge propriul cont din această acțiune.' }, { status: 400 });
  }

  const { error } = await auth.supabase.auth.admin.deleteUser(id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

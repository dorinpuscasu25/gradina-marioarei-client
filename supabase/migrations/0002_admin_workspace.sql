alter table public.accommodations
add column if not exists seo jsonb not null default '{"ro":{"title":"","description":"","keywords":""},"en":{"title":"","description":"","keywords":""},"ru":{"title":"","description":"","keywords":""}}'::jsonb,
add column if not exists location jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
add column if not exists status text not null default 'published' check (status in ('draft', 'published', 'archived'));

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  description jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  location jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  highlights jsonb not null default '{"ro":[],"en":[],"ru":[]}'::jsonb,
  images text[] not null default '{}',
  price numeric(10,2),
  currency text not null default 'lei',
  duration_minutes integer,
  capacity integer,
  seo jsonb not null default '{"ro":{"title":"","description":"","keywords":""},"en":{"title":"","description":"","keywords":""},"ru":{"title":"","description":"","keywords":""}}'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

drop trigger if exists experiences_touch_updated_at on public.experiences;
create trigger experiences_touch_updated_at
before update on public.experiences
for each row execute function public.touch_updated_at();

drop trigger if exists app_settings_touch_updated_at on public.app_settings;
create trigger app_settings_touch_updated_at
before update on public.app_settings
for each row execute function public.touch_updated_at();

alter table public.experiences enable row level security;
alter table public.app_settings enable row level security;

drop policy if exists "Public can read published experiences" on public.experiences;
create policy "Public can read published experiences"
on public.experiences for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins manage experiences" on public.experiences;
create policy "Admins manage experiences"
on public.experiences for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read app settings" on public.app_settings;
create policy "Public can read app settings"
on public.app_settings for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage app settings" on public.app_settings;
create policy "Admins manage app settings"
on public.app_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

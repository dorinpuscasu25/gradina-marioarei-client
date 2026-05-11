create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  role text not null default 'editor' check (role in ('owner', 'admin', 'editor', 'viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accommodations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  description jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  amenities jsonb not null default '{"ro":[],"en":[],"ru":[]}'::jsonb,
  images text[] not null default '{}',
  price_per_night numeric(10,2),
  discount_percent integer not null default 0 check (discount_percent between 0 and 100),
  currency text not null default 'lei',
  capacity integer,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_texts (
  key text primary key,
  value_ro jsonb not null default '""'::jsonb,
  value_en jsonb not null default '""'::jsonb,
  value_ru jsonb not null default '""'::jsonb,
  description text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  url text not null,
  path text not null,
  mime_type text not null default '',
  size_bytes bigint not null default 0,
  alt jsonb not null default '{"ro":"","en":"","ru":""}'::jsonb,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  accommodation_id uuid references public.accommodations(id) on delete set null,
  unit_label text not null default '',
  checkin date not null,
  checkout date not null,
  guests integer not null default 1,
  full_name text not null,
  phone text not null,
  email text not null,
  notes text not null default '',
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled', 'archived')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admin_profiles_touch_updated_at on public.admin_profiles;
create trigger admin_profiles_touch_updated_at
before update on public.admin_profiles
for each row execute function public.touch_updated_at();

drop trigger if exists accommodations_touch_updated_at on public.accommodations;
create trigger accommodations_touch_updated_at
before update on public.accommodations
for each row execute function public.touch_updated_at();

drop trigger if exists bookings_touch_updated_at on public.bookings;
create trigger bookings_touch_updated_at
before update on public.bookings
for each row execute function public.touch_updated_at();

create or replace function public.create_admin_profile_for_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (id, email, full_name, role, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'editor'),
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists create_admin_profile_for_user on auth.users;
create trigger create_admin_profile_for_user
after insert on auth.users
for each row execute function public.create_admin_profile_for_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and is_active = true
      and role in ('owner', 'admin', 'editor')
  );
$$;

alter table public.admin_profiles enable row level security;
alter table public.accommodations enable row level security;
alter table public.site_texts enable row level security;
alter table public.media_assets enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "Admin profiles are visible to admins" on public.admin_profiles;
create policy "Admin profiles are visible to admins"
on public.admin_profiles for select
to authenticated
using (public.is_admin() or id = auth.uid());

drop policy if exists "Admins manage profiles" on public.admin_profiles;
create policy "Admins manage profiles"
on public.admin_profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active accommodations" on public.accommodations;
create policy "Public can read active accommodations"
on public.accommodations for select
to anon, authenticated
using (is_active = true or public.is_admin());

drop policy if exists "Admins manage accommodations" on public.accommodations;
create policy "Admins manage accommodations"
on public.accommodations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read site texts" on public.site_texts;
create policy "Public can read site texts"
on public.site_texts for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage site texts" on public.site_texts;
create policy "Admins manage site texts"
on public.site_texts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read media assets" on public.media_assets;
create policy "Public can read media assets"
on public.media_assets for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage media assets" on public.media_assets;
create policy "Admins manage media assets"
on public.media_assets for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can create bookings" on public.bookings;
create policy "Anyone can create bookings"
on public.bookings for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins manage bookings" on public.bookings;
create policy "Admins manage bookings"
on public.bookings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.accommodations (slug, title, description, amenities, images, price_per_night, currency, capacity, sort_order)
values
  (
    'vila-mare',
    '{"ro":"Vila Mare","en":"Grand Villa","ru":"Большая вилла"}',
    '{"ro":"Spațiu generos pentru familie sau prieteni, cu bucătărie complet echipată, living spațios și șemineu.","en":"Generous space for family or friends, with a fully equipped kitchen, spacious living room and fireplace.","ru":"Просторное размещение для семьи или друзей с полностью оборудованной кухней, большой гостиной и камином."}',
    '{"ro":["3 dormitoare","2 băi","WiFi","Mansardă cu 4 paturi","Living spațios","Bucătărie complet dotată","Zonă pentru grătar"],"en":["3 bedrooms","2 bathrooms","Wi-Fi","Attic with 4 beds","Spacious living room","Fully equipped kitchen","BBQ area"],"ru":["3 спальни","2 ванные","Wi-Fi","Мансарда с 4 кроватями","Просторная гостиная","Оборудованная кухня","Зона барбекю"]}',
    array['/casamare.jpg','/casa_mare_interior.jpg'],
    7500,
    'lei',
    10,
    10
  ),
  (
    'casuta-beci',
    '{"ro":"Căsuța tip Beci","en":"Cellar Cottage","ru":"Домик в стиле погреба"}',
    '{"ro":"O experiență autentică și intimă, perfectă pentru cupluri sau familii mici.","en":"An authentic and intimate stay, perfect for couples or small families.","ru":"Аутентичный и уютный отдых для пары или небольшой семьи."}',
    '{"ro":["Dormitor","Pat pliant","Baie","Living","Bucătărie","WiFi"],"en":["Bedroom","Folding bed","Bathroom","Living room","Kitchen","Wi-Fi"],"ru":["Спальня","Раскладная кровать","Ванная","Гостиная","Кухня","Wi-Fi"]}',
    array['/casa_beci1.jpg','/casusta_veci1.jpg'],
    2000,
    'lei',
    4,
    20
  ),
  (
    'casuta-beci-2',
    '{"ro":"Căsuța tip Beci 2","en":"Cellar Cottage 2","ru":"Домик в стиле погреба 2"}',
    '{"ro":"Confort compact într-un cadru rustic deosebit.","en":"Compact comfort in a charming rustic setting.","ru":"Компактный комфорт в особенной деревенской атмосфере."}',
    '{"ro":["Dormitor","Baie","Mini bucătărie"],"en":["Bedroom","Bathroom","Mini kitchen"],"ru":["Спальня","Ванная","Мини-кухня"]}',
    array['/casuta_beci2.jpg','/casuta_beci2_2.jpg','/_MG_0206_copy.jpg'],
    1500,
    'lei',
    2,
    30
  )
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public media read" on storage.objects;
create policy "Public media read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'media');

drop policy if exists "Admins upload media" on storage.objects;
create policy "Admins upload media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins update media" on storage.objects;
create policy "Admins update media"
on storage.objects for update
to authenticated
using (bucket_id = 'media' and public.is_admin())
with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins delete media" on storage.objects;
create policy "Admins delete media"
on storage.objects for delete
to authenticated
using (bucket_id = 'media' and public.is_admin());

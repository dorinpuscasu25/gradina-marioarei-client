'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Home,
  Languages,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  UserPlus,
  Users
} from 'lucide-react';
import { getBrowserSupabase } from '@/src/lib/supabase/client';
import { getDefaultStaticTextRows } from '@/src/lib/cms/default-texts';

type Lang = 'ro' | 'en' | 'ru';
type Section = 'today' | 'accommodations' | 'experiences' | 'translations' | 'bookings' | 'settings' | 'members';
type ListingKind = 'accommodation' | 'experience';
type AdminAction = 'list' | 'new' | 'edit';
type EditorTab = 'data' | 'seo';
type SettingsTab = 'contact' | 'about';

const languages: Array<{ id: Lang; label: string }> = [
  { id: 'ro', label: 'Română' },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' }
];

const navItems: Array<{ id: Section; label: string; icon: React.ElementType }> = [
  { id: 'today', label: 'Azi', icon: Home },
  { id: 'accommodations', label: 'Cazări', icon: BedDouble },
  { id: 'experiences', label: 'Experiențe', icon: Sparkles },
  { id: 'translations', label: 'Traduceri', icon: Languages },
  { id: 'bookings', label: 'Rezervări', icon: CalendarDays },
  { id: 'settings', label: 'Setări', icon: Settings },
  { id: 'members', label: 'Echipă', icon: Users }
];

const dynamicTextPrefixes = [
  'accommodation.vila_mare',
  'accommodation.beci1',
  'accommodation.beci2',
  'experiences.items',
  'discover.articles'
];

const localized = { ro: '', en: '', ru: '' };
const emptySeo = {
  ro: { title: '', description: '', keywords: '' },
  en: { title: '', description: '', keywords: '' },
  ru: { title: '', description: '', keywords: '' }
};

const emptyListing = {
  slug: '',
  title: localized,
  description: localized,
  location: localized,
  amenities: { ro: [] as string[], en: [] as string[], ru: [] as string[] },
  highlights: { ro: [] as string[], en: [] as string[], ru: [] as string[] },
  images: [] as string[],
  price: '',
  price_per_night: '',
  discount_percent: '0',
  currency: 'lei',
  duration_minutes: '',
  capacity: '',
  sort_order: '100',
  status: 'published',
  is_active: true,
  seo: emptySeo
};

function getLocalized(value: any, lang: Lang) {
  return value?.[lang] ?? value?.ro ?? '';
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function money(value: any, currency: string) {
  if (value === null || value === undefined || value === '') return '-';
  return `${value} ${currency || 'lei'}`;
}

function statusLabel(status: string | undefined, isActive?: boolean) {
  const value = status || (isActive ? 'published' : 'draft');
  if (value === 'published') return 'Publicat';
  if (value === 'archived') return 'Arhivat';
  return 'Ciornă';
}

function normalizeListing(row: any, kind: ListingKind) {
  return {
    ...emptyListing,
    ...row,
    kind,
    title: { ...localized, ...(row.title ?? {}) },
    description: { ...localized, ...(row.description ?? {}) },
    location: { ...localized, ...(row.location ?? {}) },
    amenities: { ro: [], en: [], ru: [], ...(row.amenities ?? {}) },
    highlights: { ro: [], en: [], ru: [], ...(row.highlights ?? {}) },
    images: row.images ?? [],
    price: row.price?.toString() ?? '',
    price_per_night: row.price_per_night?.toString() ?? '',
    discount_percent: row.discount_percent?.toString() ?? '0',
    duration_minutes: row.duration_minutes?.toString() ?? '',
    capacity: row.capacity?.toString() ?? '',
    sort_order: row.sort_order?.toString() ?? '100',
    status: row.status ?? (row.is_active === false ? 'draft' : 'published'),
    seo: {
      ro: { ...emptySeo.ro, ...(row.seo?.ro ?? {}) },
      en: { ...emptySeo.en, ...(row.seo?.en ?? {}) },
      ru: { ...emptySeo.ru, ...(row.seo?.ru ?? {}) }
    }
  };
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value ?? '', null, 2);
}

function parseTextValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (/^[\[{"]/.test(trimmed) || trimmed === 'true' || trimmed === 'false' || trimmed === 'null' || /^-?\d+(\.\d+)?$/.test(trimmed)) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
}

type AdminPanelProps = {
  initialSection?: Section;
  initialAction?: AdminAction;
  initialKind?: ListingKind;
  initialId?: string;
};

export function AdminPanel({
  initialSection = 'today',
  initialAction = 'list',
  initialKind = 'accommodation',
  initialId
}: AdminPanelProps) {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const router = useRouter();
  const section = initialSection;
  const action = initialAction;
  const kind = initialKind;
  const id = initialId;

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState<Lang>('ro');
  const [editorTab, setEditorTab] = useState<EditorTab>('data');
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('contact');
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [listingDraft, setListingDraft] = useState<any>(normalizeListing(emptyListing, 'accommodation'));
  const [texts, setTexts] = useState<any[]>([]);
  const [editingCell, setEditingCell] = useState<{ key: string; lang: Lang } | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [memberDraft, setMemberDraft] = useState({ email: '', password: '', full_name: '', role: 'editor' });
  const [contactSettings, setContactSettings] = useState<any>({
    phones: [''],
    emails: [''],
    address: { ...localized },
    map_url: '',
    social_links: [] as Array<{ network: string; url: string }>
  });
  const [aboutSettings, setAboutSettings] = useState<any>({
    headline: { ...localized },
    story: { ...localized },
    mission: { ...localized },
    image: ''
  });

  const go = useCallback(
    (nextSection: Section, params: { action?: AdminAction; kind?: ListingKind; id?: string } = {}) => {
      if (nextSection === 'accommodations') {
        if (params.action === 'new') {
          router.push('/admin/cazari/new');
          return;
        }
        if (params.action === 'edit' && params.id) {
          router.push(`/admin/cazari/${params.id}`);
          return;
        }
        router.push('/admin/cazari');
        return;
      }

      if (nextSection === 'experiences') {
        if (params.action === 'new') {
          router.push('/admin/experiente/new');
          return;
        }
        if (params.action === 'edit' && params.id) {
          router.push(`/admin/experiente/${params.id}`);
          return;
        }
        router.push('/admin/experiente');
        return;
      }

      router.push(`/admin/${nextSection}`);
    },
    [router]
  );

  const loadMembers = useCallback(async () => {
    if (!session) return;

    const response = await fetch('/api/admin/members', {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });

    if (response.ok) {
      const json = await response.json();
      setMembers(json.members ?? []);
    }
  }, [session]);

  const loadAll = useCallback(async () => {
    if (!supabase) return;

    setMessage('');
    const [accommodationResult, experienceResult, textResult, bookingResult, contactResult, aboutResult] = await Promise.all([
      supabase.from('accommodations').select('*').order('sort_order', { ascending: true }),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_texts').select('*').order('key', { ascending: true }),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('app_settings').select('*').eq('key', 'contact').maybeSingle(),
      supabase.from('app_settings').select('*').eq('key', 'about').maybeSingle()
    ]);

    if (accommodationResult.data) setAccommodations(accommodationResult.data);
    if (experienceResult.data) setExperiences(experienceResult.data);
    if (textResult.data) setTexts(textResult.data);
    if (bookingResult.data) setBookings(bookingResult.data);
    if (contactResult.data?.value) {
      setContactSettings((current: any) => {
        const value = contactResult.data.value as any;
        return {
          ...current,
          ...value,
          phones: value.phones ?? (value.phone ? [value.phone] : current.phones),
          emails: value.emails ?? (value.email ? [value.email] : current.emails),
          social_links: value.social_links ?? ['facebook', 'instagram', 'tiktok'].filter((key) => value[key]).map((key) => ({ network: key, url: value[key] }))
        };
      });
    }
    if (aboutResult.data?.value) setAboutSettings((current: any) => ({ ...current, ...aboutResult.data.value }));
    await loadMembers();
  }, [loadMembers, supabase]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (session) void loadAll();
  }, [loadAll, session]);

  useEffect(() => {
    if (action !== 'edit' && action !== 'new') return;

    if (action === 'new') {
      setListingDraft(normalizeListing(emptyListing, kind));
      setEditorTab('data');
      return;
    }

    const source = kind === 'accommodation' ? accommodations : experiences;
    const row = source.find((item) => item.id === id);
    if (row) {
      setListingDraft(normalizeListing(row, kind));
      setEditorTab('data');
    }
  }, [accommodations, action, experiences, id, kind]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    setSaving(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSaving(false);
    setMessage(error ? error.message : '');
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setSession(null);
  }

  async function uploadFiles(files: FileList | null) {
    if (!files || !supabase || !session) return [];

    const urls: string[] = [];
    setSaving(true);

    for (const file of Array.from(files)) {
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `${Date.now()}-${cleanName}`;
      const upload = await supabase.storage.from('media').upload(path, file, { upsert: true, contentType: file.type });

      if (upload.error) {
        setMessage(upload.error.message);
        continue;
      }

      const url = supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
      urls.push(url);
      await supabase.from('media_assets').insert({
        title: file.name,
        url,
        path,
        mime_type: file.type,
        size_bytes: file.size,
        created_by: session.user.id
      });
    }

    setSaving(false);
    await loadAll();
    return urls;
  }

  async function attachListingImages(files: FileList | null) {
    const urls = await uploadFiles(files);
    if (urls.length) {
      setListingDraft((current: any) => ({ ...current, images: [...(current.images ?? []), ...urls] }));
    }
  }

  async function saveListing(statusOverride?: string) {
    if (!supabase) return;

    setSaving(true);
    const isAccommodation = kind === 'accommodation';
    const nextSlug = listingDraft.slug || slugify(listingDraft.title.ro || listingDraft.title.en || listingDraft.title.ru || 'item');
    const payload: any = isAccommodation
      ? {
          slug: nextSlug,
          title: listingDraft.title,
          description: listingDraft.description,
          location: listingDraft.location,
          amenities: listingDraft.amenities,
          images: listingDraft.images,
          price_per_night: listingDraft.price_per_night ? Number(listingDraft.price_per_night) : null,
          discount_percent: Number(listingDraft.discount_percent || 0),
          currency: listingDraft.currency || 'lei',
          capacity: listingDraft.capacity ? Number(listingDraft.capacity) : null,
          sort_order: Number(listingDraft.sort_order || 100),
          status: statusOverride ?? listingDraft.status,
          is_active: (statusOverride ?? listingDraft.status) === 'published',
          seo: listingDraft.seo
        }
      : {
          slug: nextSlug,
          title: listingDraft.title,
          description: listingDraft.description,
          location: listingDraft.location,
          highlights: listingDraft.highlights,
          images: listingDraft.images,
          price: listingDraft.price ? Number(listingDraft.price) : null,
          currency: listingDraft.currency || 'lei',
          duration_minutes: listingDraft.duration_minutes ? Number(listingDraft.duration_minutes) : null,
          capacity: listingDraft.capacity ? Number(listingDraft.capacity) : null,
          sort_order: Number(listingDraft.sort_order || 100),
          status: statusOverride ?? listingDraft.status,
          seo: listingDraft.seo
        };

    const table = isAccommodation ? 'accommodations' : 'experiences';
    const query = listingDraft.id ? supabase.from(table).update(payload).eq('id', listingDraft.id) : supabase.from(table).insert(payload);
    const { error } = await query;

    setSaving(false);
    setMessage(error ? error.message : 'Salvat.');
    if (!error) {
      await loadAll();
      go(isAccommodation ? 'accommodations' : 'experiences');
    }
  }

  async function deleteListing(row: any, rowKind: ListingKind) {
    if (!supabase || !confirm('Ștergi această înregistrare?')) return;

    const table = rowKind === 'accommodation' ? 'accommodations' : 'experiences';
    const { error } = await supabase.from(table).delete().eq('id', row.id);
    setMessage(error ? error.message : 'Șters.');
    await loadAll();
  }

  async function seedTexts() {
    if (!supabase || !session) return;

    setSaving(true);
    const rows = getDefaultStaticTextRows()
      .filter((row) => !dynamicTextPrefixes.some((prefix) => row.key.startsWith(prefix)))
      .map((row) => ({ ...row, updated_by: session.user.id }));
    const { error } = await supabase.from('site_texts').upsert(rows);
    setSaving(false);
    setMessage(error ? error.message : 'Textele implicite au fost importate.');
    await loadAll();
  }

  async function saveTextCell(row: any, lang: Lang, value: string) {
    if (!supabase || !session) return;

    const column = `value_${lang}`;
    const next = { ...row, [column]: parseTextValue(value), updated_by: session.user.id };
    setTexts((items) => items.map((item) => (item.key === row.key ? next : item)));
    const { error } = await supabase.from('site_texts').upsert({
      key: row.key,
      value_ro: next.value_ro ?? '',
      value_en: next.value_en ?? '',
      value_ru: next.value_ru ?? '',
      updated_by: session.user.id
    });
    if (error) setMessage(error.message);
  }

  async function saveSettings(key: 'contact' | 'about', value: any) {
    if (!supabase || !session) return;

    setSaving(true);
    const { error } = await supabase.from('app_settings').upsert({ key, value, updated_by: session.user.id });
    setSaving(false);
    setMessage(error ? error.message : 'Setările au fost salvate.');
  }

  async function updateBookingStatus(bookingId: string, status: string) {
    if (!supabase) return;
    const { error } = await supabase.from('bookings').update({ status }).eq('id', bookingId);
    setMessage(error ? error.message : 'Rezervarea a fost actualizată.');
    await loadAll();
  }

  async function createMember(event: React.FormEvent) {
    event.preventDefault();
    if (!session) return;

    setSaving(true);
    const response = await fetch('/api/admin/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify(memberDraft)
    });
    const json = await response.json();
    setSaving(false);
    setMessage(response.ok ? 'Membrul a fost creat.' : json.error);
    if (response.ok) {
      setMemberDraft({ email: '', password: '', full_name: '', role: 'editor' });
      await loadMembers();
    }
  }

  async function deleteMember(memberId: string) {
    if (!session || !confirm('Ștergi acest membru?')) return;

    const response = await fetch(`/api/admin/members?id=${memberId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const json = await response.json();
    setMessage(response.ok ? 'Membrul a fost șters.' : json.error);
    await loadMembers();
  }

  const currentListingKind: ListingKind = section === 'experiences' ? 'experience' : 'accommodation';
  const currentListings = currentListingKind === 'accommodation' ? accommodations : experiences;
  const filteredListings = currentListings.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const filteredTexts = texts
    .filter((item) => !dynamicTextPrefixes.some((prefix) => item.key.startsWith(prefix)))
    .filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const filteredBookings = bookings.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const newBookings = bookings.filter((booking) => booking.status === 'new').length;

  if (loading) {
    return <div className="min-h-screen bg-white p-8 text-forest-dark">Se încarcă adminul...</div>;
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-stone-light p-8">
          <h1 className="mb-3 text-2xl font-bold text-forest-dark">Admin indisponibil</h1>
          <p className="text-stone-dark">Adaugă variabilele Supabase în `.env.local` sau în Vercel Environment Variables.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="grid min-h-screen bg-white lg:grid-cols-[55%_45%]">
        <div className="flex items-center justify-center px-6 py-12">
          <form onSubmit={signIn} className="w-full max-w-md">
            <div className="mb-10">
              <div className="mb-4 flex items-center gap-3 text-forest-dark">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-white">
                  <Home className="h-5 w-5" />
                </div>
                <span className="text-3xl font-extrabold">Grădina</span>
              </div>
              <span className="rounded-full border border-stone-light px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-stone-dark">Panou gazdă</span>
              <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-forest-dark">Intră în contul host</h1>
              <p className="mt-4 text-stone-dark">Gestionezi listările, textele, rezervările și echipa direct dintr-un singur loc.</p>
            </div>

            <div className="rounded-[24px] border border-stone-light p-7 shadow-sm">
              <label className="mb-5 block text-sm font-bold text-forest-dark">
                Email
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full rounded-2xl border border-stone-light px-4 py-4 outline-none focus:ring-2 focus:ring-forest" required />
              </label>
              <label className="mb-6 block text-sm font-bold text-forest-dark">
                Parolă
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full rounded-2xl border border-stone-light px-4 py-4 outline-none focus:ring-2 focus:ring-forest" required />
              </label>
              {message && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}
              <button disabled={saving} className="w-full rounded-2xl bg-forest px-5 py-4 font-bold text-white hover:bg-forest-light">
                {saving ? 'Se conectează...' : 'Conectare'}
              </button>
            </div>
          </form>
        </div>
        <div className="relative hidden overflow-hidden bg-forest-dark lg:block">
          <img src="/casa_mare_interior.jpg" alt="" className="h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-forest-dark/30" />
          <div className="absolute bottom-16 left-16 max-w-xl text-white">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.45em]">Sejururi Moldova</p>
            <h2 className="text-5xl font-extrabold leading-tight">Hosts, experiențe și calendar într-un dashboard care lucrează.</h2>
          </div>
        </div>
      </div>
    );
  }

  const isEditor = (section === 'accommodations' || section === 'experiences') && (action === 'new' || action === 'edit');

  return (
    <div className="min-h-screen bg-white text-forest-dark">
      <header className="sticky top-0 z-30 border-b border-stone-light bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <button onClick={() => go('today')} className="flex items-center gap-2 text-2xl font-extrabold">
            <Home className="h-7 w-7 text-forest" />
            Grădina
          </button>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => go(item.id)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${section === item.id ? 'bg-forest text-white' : 'text-stone-dark hover:bg-cream'}`}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={loadAll} className="hidden rounded-full border border-stone-light px-4 py-2 text-sm font-bold hover:bg-cream md:inline-flex">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reîncarcă
            </button>
            <button onClick={signOut} className="rounded-full bg-terracotta px-4 py-2 text-sm font-bold text-white">
              <LogOut className="mr-2 inline h-4 w-4" />
              Ieși
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 md:hidden">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${section === item.id ? 'bg-forest text-white' : 'bg-cream'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {!isEditor && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Caută peste tot în secțiunea curentă..." className="w-full rounded-xl border border-stone-light bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-forest" />
            </div>
            {(section === 'accommodations' || section === 'experiences') && (
              <div className="flex gap-2">
                <button onClick={() => go(section, { action: 'new', kind: currentListingKind })} className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white">
                  <Plus className="mr-2 inline h-4 w-4" />
                  {section === 'accommodations' ? 'Adaugă cazare' : 'Adaugă experiență'}
                </button>
              </div>
            )}
          </div>
        )}

        {message && <p className="mb-6 rounded-xl bg-cream px-4 py-3 text-sm font-semibold">{message}</p>}

        {section === 'today' && (
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone">Panou administrare</p>
            <h1 className="mt-3 text-4xl font-extrabold">Azi</h1>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <Metric title="Cazări" value={accommodations.length} />
              <Metric title="Experiențe" value={experiences.length} />
              <Metric title="Rezervări noi" value={newBookings} />
              <Metric title="Traduceri" value={texts.length} />
            </div>
          </section>
        )}

        {(section === 'accommodations' || section === 'experiences') && !isEditor && (
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone">{section === 'accommodations' ? 'Cazări' : 'Experiențe'}</p>
            <h1 className="mt-3 text-4xl font-extrabold">{section === 'accommodations' ? 'Lista de cazări' : 'Lista de experiențe'}</h1>
            <p className="mt-3 text-stone-dark">{section === 'accommodations' ? 'Aici se editează camerele, vilele, prețurile, facilitățile și pozele afișate pe site.' : 'Aici se editează experiențele afișate pe pagina Experiențe.'}</p>
            <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-light shadow-sm">
              <table className="w-full min-w-[860px] text-left">
                <thead className="bg-cream/70 text-xs uppercase tracking-wide text-stone-dark">
                  <tr>
                    <th className="px-6 py-4">Denumire</th>
                    <th className="px-6 py-4">Locație</th>
                    <th className="px-6 py-4">Preț</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((item) => (
                    <tr key={item.id} className="border-t border-stone-light hover:bg-cream/40">
                      <td className="px-6 py-5">
                        <button onClick={() => go(section, { action: 'edit', kind: currentListingKind, id: item.id })} className="flex items-center gap-4 text-left">
                          <img src={item.images?.[0] || '/casamare.jpg'} alt="" className="h-14 w-14 rounded-xl object-cover" />
                          <span>
                            <span className="block font-bold">{getLocalized(item.title, 'ro') || item.slug}</span>
                            <span className="text-sm text-stone-dark">{item.slug}</span>
                          </span>
                        </button>
                      </td>
                      <td className="px-6 py-5">{getLocalized(item.location, 'ro') || '-'}</td>
                      <td className="px-6 py-5">{money(currentListingKind === 'accommodation' ? item.price_per_night : item.price, item.currency)}</td>
                      <td className="px-6 py-5">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'draft' || item.is_active === false ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {statusLabel(item.status, item.is_active)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => go(section, { action: 'edit', kind: currentListingKind, id: item.id })} className="rounded-full border border-stone-light p-2 hover:bg-cream">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {(section === 'accommodations' || section === 'experiences') && isEditor && (
          <ListingEditor
            kind={currentListingKind}
            language={language}
            setLanguage={setLanguage}
            editorTab={editorTab}
            setEditorTab={setEditorTab}
            draft={listingDraft}
            setDraft={setListingDraft}
            saving={saving}
            onBack={() => go(section)}
            onSaveDraft={() => saveListing('draft')}
            onPublish={() => saveListing('published')}
            onDelete={listingDraft.id ? () => deleteListing(listingDraft, currentListingKind) : undefined}
            onUpload={attachListingImages}
          />
        )}

        {section === 'translations' && (
          <TranslationsTable
            rows={filteredTexts}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            onSave={saveTextCell}
            onSeed={seedTexts}
          />
        )}

        {section === 'bookings' && (
          <BookingsTable rows={filteredBookings} onStatus={updateBookingStatus} />
        )}

        {section === 'settings' && (
          <SettingsPage
            language={language}
            setLanguage={setLanguage}
            contact={contactSettings}
            setContact={setContactSettings}
            about={aboutSettings}
            setAbout={setAboutSettings}
            onUpload={uploadFiles}
            onSaveContact={() => saveSettings('contact', contactSettings)}
            onSaveAbout={() => saveSettings('about', aboutSettings)}
            settingsTab={settingsTab}
            setSettingsTab={setSettingsTab}
          />
        )}

        {section === 'members' && (
          <MembersPage members={members} draft={memberDraft} setDraft={setMemberDraft} onCreate={createMember} onDelete={deleteMember} saving={saving} />
        )}
      </main>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-stone-light p-5">
      <p className="text-sm font-bold text-stone">{title}</p>
      <p className="mt-2 text-4xl font-extrabold">{value}</p>
    </div>
  );
}

function LangTabs({ value, onChange }: { value: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((lang) => (
        <button key={lang.id} onClick={() => onChange(lang.id)} className={`rounded-full px-4 py-2 text-sm font-bold ${value === lang.id ? 'bg-yellow-400 text-forest-dark' : 'border border-stone-light hover:bg-cream'}`}>
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function ItemsEditor({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (items: string[]) => void; placeholder: string }) {
  function updateItem(index: number, value: string) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function addItem() {
    onChange([...items, '']);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold">{label}</h3>
        <button type="button" onClick={addItem} className="rounded-full border border-stone-light px-4 py-2 text-sm font-bold hover:bg-cream">
          <Plus className="mr-2 inline h-4 w-4" />
          Adaugă
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <input value={item} onChange={(event) => updateItem(index, event.target.value)} className="admin-input" placeholder={placeholder} />
            <button type="button" onClick={() => removeItem(index)} className="rounded-full bg-red-600 p-3 text-white">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {!items.length && <p className="rounded-2xl bg-cream p-4 text-sm text-stone-dark">Nu ai adăugat încă nimic.</p>}
      </div>
    </div>
  );
}

function ListingEditor(props: {
  kind: ListingKind;
  language: Lang;
  setLanguage: (lang: Lang) => void;
  editorTab: EditorTab;
  setEditorTab: (tab: EditorTab) => void;
  draft: any;
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  saving: boolean;
  onBack: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onDelete?: () => void;
  onUpload: (files: FileList | null) => void;
}) {
  const { kind, language, setLanguage, editorTab, setEditorTab, draft, setDraft, saving, onBack, onSaveDraft, onPublish, onDelete, onUpload } = props;
  const collectionKey = kind === 'accommodation' ? 'amenities' : 'highlights';

  function setLocalized(field: string, value: string) {
    setDraft((current: any) => ({ ...current, [field]: { ...current[field], [language]: value } }));
  }

  function setCollection(items: string[]) {
    setDraft((current: any) => ({
      ...current,
      [collectionKey]: { ...current[collectionKey], [language]: items }
    }));
  }

  function setSeo(field: string, value: string) {
    setDraft((current: any) => ({
      ...current,
      seo: {
        ...current.seo,
        [language]: { ...current.seo[language], [field]: value }
      }
    }));
  }

  return (
    <section>
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-light px-4 py-2 text-sm font-bold hover:bg-cream">
        <ArrowLeft className="h-4 w-4" />
        Înapoi la listă
      </button>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone">{kind === 'accommodation' ? 'Cazare' : 'Experiență'}</p>
          <h1 className="mt-2 text-4xl font-extrabold">{draft.id ? (kind === 'accommodation' ? 'Editează cazarea' : 'Editează experiența') : (kind === 'accommodation' ? 'Adaugă cazare' : 'Adaugă experiență')}</h1>
        </div>
        <div className="flex gap-2">
          {onDelete && (
            <button onClick={onDelete} className="rounded-full border border-red-200 px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50">
              <Trash2 className="mr-2 inline h-4 w-4" />
              Șterge
            </button>
          )}
          <button onClick={onSaveDraft} disabled={saving} className="rounded-full border border-stone-light px-5 py-3 text-sm font-bold hover:bg-cream">Salvează draft</button>
          <button onClick={onPublish} disabled={saving} className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white">Publică</button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setEditorTab('data')} className={`rounded-xl px-4 py-3 text-sm font-bold ${editorTab === 'data' ? 'bg-cream shadow-sm' : 'hover:bg-cream'}`}>
          <BedDouble className="mr-2 inline h-4 w-4" />
          Date
        </button>
        <button onClick={() => setEditorTab('seo')} className={`rounded-xl px-4 py-3 text-sm font-bold ${editorTab === 'seo' ? 'bg-cream shadow-sm' : 'hover:bg-cream'}`}>
          <FileText className="mr-2 inline h-4 w-4" />
          SEO
        </button>
      </div>

      <div className="space-y-6">
        {editorTab === 'data' && (
          <>
            <Panel title="Date principale">
              <LangTabs value={language} onChange={setLanguage} />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Titlu">
                  <input value={draft.title[language]} onChange={(event) => setLocalized('title', event.target.value)} className="admin-input" placeholder="Denumire" />
                </Field>
                <Field label="Locație">
                  <input value={draft.location[language]} onChange={(event) => setLocalized('location', event.target.value)} className="admin-input" placeholder="Vălcineț, Călărași" />
                </Field>
                <Field label="Status">
                  <select value={draft.status} onChange={(event) => setDraft((current: any) => ({ ...current, status: event.target.value }))} className="admin-input">
                    <option value="draft">Ciornă</option>
                    <option value="published">Publicat</option>
                    <option value="archived">Arhivat</option>
                  </select>
                </Field>
              </div>
              <Field label="Descriere">
                <textarea value={draft.description[language]} onChange={(event) => setLocalized('description', event.target.value)} rows={6} className="admin-input" />
              </Field>
            </Panel>

            <Panel title={kind === 'accommodation' ? 'Preț și facilități' : 'Preț și detalii'}>
              <LangTabs value={language} onChange={setLanguage} />
              <div className="grid gap-5 md:grid-cols-4">
                <Field label="Preț">
                  <input value={kind === 'accommodation' ? draft.price_per_night : draft.price} onChange={(event) => setDraft((current: any) => ({ ...current, [kind === 'accommodation' ? 'price_per_night' : 'price']: event.target.value }))} type="number" className="admin-input" />
                </Field>
                <Field label="Valută">
                  <input value={draft.currency} onChange={(event) => setDraft((current: any) => ({ ...current, currency: event.target.value }))} className="admin-input" />
                </Field>
                {kind === 'accommodation' && (
                  <Field label="Reducere %">
                    <input value={draft.discount_percent} onChange={(event) => setDraft((current: any) => ({ ...current, discount_percent: event.target.value }))} type="number" className="admin-input" />
                  </Field>
                )}
                {kind === 'experience' && (
                  <Field label="Durată minute">
                    <input value={draft.duration_minutes} onChange={(event) => setDraft((current: any) => ({ ...current, duration_minutes: event.target.value }))} type="number" className="admin-input" />
                  </Field>
                )}
                <Field label="Capacitate">
                  <input value={draft.capacity} onChange={(event) => setDraft((current: any) => ({ ...current, capacity: event.target.value }))} type="number" className="admin-input" />
                </Field>
              </div>
              <ItemsEditor
                label={kind === 'accommodation' ? 'Facilități' : 'Puncte importante'}
                items={draft[collectionKey][language] ?? []}
                onChange={setCollection}
                placeholder={kind === 'accommodation' ? 'Ex: Wi-Fi gratuit' : 'Ex: Cină la grătar'}
              />
            </Panel>

            <Panel title="Poze">
              <div className="grid gap-5 md:grid-cols-[1fr_280px]">
                <label className="flex min-h-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-stone-light p-6 hover:bg-cream">
                  <input type="file" multiple className="hidden" onChange={(event) => onUpload(event.target.files)} />
                  <span className="text-center font-bold">
                    <Upload className="mx-auto mb-2 h-7 w-7" />
                    Încarcă imagini din calculator
                  </span>
                </label>
                <Field label="Ordine">
                  <input value={draft.sort_order} onChange={(event) => setDraft((current: any) => ({ ...current, sort_order: event.target.value }))} type="number" className="admin-input" />
                </Field>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(draft.images ?? []).map((image: string, index: number) => (
                  <div key={image} className="group relative overflow-hidden rounded-2xl border border-stone-light">
                    <img src={image} alt="" className="h-44 w-full object-cover" />
                    <button onClick={() => setDraft((current: any) => ({ ...current, images: current.images.filter((_: string, imgIndex: number) => imgIndex !== index) }))} className="absolute right-2 top-2 rounded-full bg-white p-2 text-red-600 shadow">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Panel>
          </>
        )}

        {editorTab === 'seo' && (
            <Panel title="SEO">
              <LangTabs value={language} onChange={setLanguage} />
            <div className="grid gap-5">
              <Field label="Titlu SEO">
                <input value={draft.seo[language].title} onChange={(event) => setSeo('title', event.target.value)} className="admin-input" />
              </Field>
              <Field label="Descriere SEO">
                <textarea value={draft.seo[language].description} onChange={(event) => setSeo('description', event.target.value)} rows={5} className="admin-input" />
              </Field>
              <Field label="Cuvinte cheie SEO">
                <input value={draft.seo[language].keywords} onChange={(event) => setSeo('keywords', event.target.value)} className="admin-input" placeholder="cazare, pensiune, Vălcineț" />
              </Field>
            </div>
          </Panel>
        )}
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-stone-light p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-extrabold">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-bold">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function TranslationsTable(props: {
  rows: any[];
  editingCell: { key: string; lang: Lang } | null;
  setEditingCell: (cell: { key: string; lang: Lang } | null) => void;
  onSave: (row: any, lang: Lang, value: string) => void;
  onSeed: () => void;
}) {
  const { rows, editingCell, setEditingCell, onSave, onSeed } = props;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone">Texte statice</p>
          <h1 className="mt-2 text-4xl font-extrabold">Traduceri</h1>
          <p className="mt-3 text-stone-dark">Editează doar textele statice. Cazările și experiențele se traduc în paginile lor dedicate.</p>
        </div>
        <button onClick={onSeed} className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-forest-dark">Importă cheile implicite</button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-stone-light">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="bg-cream/80 text-xs uppercase tracking-wide text-stone-dark">
            <tr>
              <th className="px-5 py-4">Cheie</th>
              <th className="px-5 py-4">Română</th>
              <th className="px-5 py-4">English</th>
              <th className="px-5 py-4">Русский</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-stone-light hover:bg-cream/30">
                <td className="px-5 py-5 font-mono text-sm">{row.key}</td>
                {(['ro', 'en', 'ru'] as Lang[]).map((lang) => (
                  <EditableTranslationCell key={lang} row={row} lang={lang} editing={Boolean(editingCell && editingCell.key === row.key && editingCell.lang === lang)} onEdit={() => setEditingCell({ key: row.key, lang })} onDone={() => setEditingCell(null)} onSave={onSave} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EditableTranslationCell({ row, lang, editing, onEdit, onDone, onSave }: { row: any; lang: Lang; editing: boolean; onEdit: () => void; onDone: () => void; onSave: (row: any, lang: Lang, value: string) => void }) {
  const [value, setValue] = useState(textValue(row[`value_${lang}`]));

  useEffect(() => {
    setValue(textValue(row[`value_${lang}`]));
  }, [lang, row]);

  if (editing) {
    return (
      <td className="px-5 py-5 align-top">
        <div className="flex items-center gap-2">
          <textarea value={value} onChange={(event) => setValue(event.target.value)} autoFocus rows={2} className="w-full rounded-lg border-2 border-yellow-400 px-3 py-2 outline-none focus:ring-2 focus:ring-forest" />
          <button onClick={() => { onSave(row, lang, value); onDone(); }} className="rounded-full bg-forest p-2 text-white">
            <Check className="h-4 w-4" />
          </button>
        </div>
      </td>
    );
  }

  return (
    <td onClick={onEdit} className="cursor-text px-5 py-5 align-top hover:bg-yellow-50">
      <div className="line-clamp-3 whitespace-pre-wrap">{value}</div>
    </td>
  );
}

function BookingsTable({ rows, onStatus }: { rows: any[]; onStatus: (id: string, status: string) => void }) {
  return (
    <section>
      <h1 className="text-4xl font-extrabold">Rezervări</h1>
      <div className="mt-8 space-y-4">
        {rows.map((booking) => (
          <div key={booking.id} className="rounded-2xl border border-stone-light p-5">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{new Date(booking.created_at).toLocaleString('ro-MD')}</p>
                <h3 className="mt-1 text-xl font-extrabold">{booking.full_name}</h3>
                <p>{booking.checkin} - {booking.checkout}, {booking.guests} oaspeți</p>
                <p>{booking.phone} · {booking.email}</p>
                {booking.notes && <p className="mt-3 rounded-xl bg-cream p-3">{booking.notes}</p>}
              </div>
              <select value={booking.status} onChange={(event) => onStatus(booking.id, event.target.value)} className="admin-input md:w-48">
                <option value="new">Nouă</option>
                <option value="confirmed">Confirmată</option>
                <option value="cancelled">Anulată</option>
                <option value="archived">Arhivată</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SettingsPage(props: {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  settingsTab: SettingsTab;
  setSettingsTab: (tab: SettingsTab) => void;
  contact: any;
  setContact: React.Dispatch<React.SetStateAction<any>>;
  about: any;
  setAbout: React.Dispatch<React.SetStateAction<any>>;
  onUpload: (files: FileList | null) => Promise<string[]>;
  onSaveContact: () => void;
  onSaveAbout: () => void;
}) {
  const { language, setLanguage, settingsTab, setSettingsTab, contact, setContact, about, setAbout, onUpload, onSaveContact, onSaveAbout } = props;

  function updateSocial(index: number, key: 'network' | 'url', value: string) {
    setContact((current: any) => ({
      ...current,
      social_links: current.social_links.map((item: any, itemIndex: number) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-stone">Setări</p>
          <h1 className="mt-2 text-4xl font-extrabold">Setări site</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-stone-light p-3 shadow-sm">
          <button onClick={() => setSettingsTab('contact')} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${settingsTab === 'contact' ? 'bg-forest text-white' : 'hover:bg-cream'}`}>
            Contact
          </button>
          <button onClick={() => setSettingsTab('about')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${settingsTab === 'about' ? 'bg-forest text-white' : 'hover:bg-cream'}`}>
            Despre noi
          </button>
        </aside>

        {settingsTab === 'contact' && (
        <Panel title="Contact">
          <LangTabs value={language} onChange={setLanguage} />
          <ItemsEditor label="Telefoane" items={contact.phones ?? []} onChange={(items) => setContact((current: any) => ({ ...current, phones: items }))} placeholder="Ex: 060588845" />
          <ItemsEditor label="Emailuri" items={contact.emails ?? []} onChange={(items) => setContact((current: any) => ({ ...current, emails: items }))} placeholder="Ex: contact@site.md" />
          <Field label="Adresă">
            <input value={contact.address?.[language] ?? ''} onChange={(event) => setContact((current: any) => ({ ...current, address: { ...current.address, [language]: event.target.value } }))} className="admin-input" />
          </Field>
          <Field label="Google Map URL">
            <input value={contact.map_url} onChange={(event) => setContact((current: any) => ({ ...current, map_url: event.target.value }))} className="admin-input" />
          </Field>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold">Rețele sociale</h3>
              <button onClick={() => setContact((current: any) => ({ ...current, social_links: [...(current.social_links ?? []), { network: 'facebook', url: '' }] }))} className="rounded-full border border-stone-light px-4 py-2 text-sm font-bold hover:bg-cream">
                <Plus className="mr-2 inline h-4 w-4" />
                Adaugă
              </button>
            </div>
            <div className="space-y-3">
              {(contact.social_links ?? []).map((item: any, index: number) => (
                <div key={index} className="grid gap-3 md:grid-cols-[220px_1fr_auto]">
                  <select value={item.network} onChange={(event) => updateSocial(index, 'network', event.target.value)} className="admin-input">
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                  </select>
                  <input value={item.url} onChange={(event) => updateSocial(index, 'url', event.target.value)} className="admin-input" placeholder="https://..." />
                  <button onClick={() => setContact((current: any) => ({ ...current, social_links: current.social_links.filter((_: any, itemIndex: number) => itemIndex !== index) }))} className="rounded-full bg-red-600 p-3 text-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onSaveContact} className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"><Save className="mr-2 inline h-4 w-4" /> Salvează contact</button>
        </Panel>
        )}

        {settingsTab === 'about' && (
        <Panel title="Pagina Despre Noi">
          <LangTabs value={language} onChange={setLanguage} />
          <Field label="Titlu">
            <input value={about.headline?.[language] ?? ''} onChange={(event) => setAbout((current: any) => ({ ...current, headline: { ...current.headline, [language]: event.target.value } }))} className="admin-input" />
          </Field>
          <Field label="Poveste">
            <textarea value={about.story?.[language] ?? ''} onChange={(event) => setAbout((current: any) => ({ ...current, story: { ...current.story, [language]: event.target.value } }))} rows={6} className="admin-input" />
          </Field>
          <Field label="Misiune">
            <textarea value={about.mission?.[language] ?? ''} onChange={(event) => setAbout((current: any) => ({ ...current, mission: { ...current.mission, [language]: event.target.value } }))} rows={4} className="admin-input" />
          </Field>
          <label className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-stone-light p-6 hover:bg-cream">
            <input type="file" className="hidden" onChange={async (event) => {
              const urls = await onUpload(event.target.files);
              if (urls[0]) setAbout((current: any) => ({ ...current, image: urls[0] }));
            }} />
            <span className="font-bold"><Upload className="mr-2 inline h-4 w-4" /> Încarcă imagine</span>
          </label>
          {about.image && <img src={about.image} alt="" className="h-48 rounded-2xl object-cover" />}
          <button onClick={onSaveAbout} className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white"><Save className="mr-2 inline h-4 w-4" /> Salvează Despre Noi</button>
        </Panel>
        )}
      </div>
    </section>
  );
}

function MembersPage(props: { members: any[]; draft: any; setDraft: (draft: any) => void; onCreate: (event: React.FormEvent) => void; onDelete: (id: string) => void; saving: boolean }) {
  const { members, draft, setDraft, onCreate, onDelete, saving } = props;

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div>
        <h1 className="mb-8 text-4xl font-extrabold">Echipă</h1>
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-2xl border border-stone-light p-5">
              <div>
                <h3 className="font-extrabold">{member.full_name || member.email}</h3>
                <p className="text-sm">{member.email}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-terracotta">{member.role}</p>
              </div>
              <button onClick={() => onDelete(member.id)} className="rounded-full bg-red-600 p-3 text-white"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={onCreate} className="rounded-[28px] border border-stone-light p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-extrabold"><UserPlus className="mr-2 inline h-5 w-5" /> Adaugă membru</h2>
        <Field label="Nume"><input value={draft.full_name} onChange={(event) => setDraft({ ...draft, full_name: event.target.value })} className="admin-input" /></Field>
        <Field label="Email"><input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} type="email" className="admin-input" required /></Field>
        <Field label="Parolă temporară"><input value={draft.password} onChange={(event) => setDraft({ ...draft, password: event.target.value })} type="password" className="admin-input" required /></Field>
        <Field label="Rol">
          <select value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} className="admin-input">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </Field>
        <button disabled={saving} className="mt-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white">Creează cont</button>
      </form>
    </section>
  );
}

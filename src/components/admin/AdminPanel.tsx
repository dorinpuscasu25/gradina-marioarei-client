'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BedDouble,
  CalendarDays,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Upload,
  UserPlus,
  Users
} from 'lucide-react';
import { getBrowserSupabase } from '@/src/lib/supabase/client';
import { getDefaultStaticTextRows } from '@/src/lib/cms/default-texts';

type Tab = 'dashboard' | 'accommodations' | 'texts' | 'media' | 'bookings' | 'members';

type AccommodationDraft = {
  id?: string;
  slug: string;
  title_ro: string;
  title_en: string;
  title_ru: string;
  description_ro: string;
  description_en: string;
  description_ru: string;
  amenities_ro: string;
  amenities_en: string;
  amenities_ru: string;
  images: string;
  price_per_night: string;
  discount_percent: string;
  currency: string;
  capacity: string;
  sort_order: string;
  is_active: boolean;
};

const tabs: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'accommodations', label: 'Cazări', icon: BedDouble },
  { id: 'texts', label: 'Texte RO/EN/RU', icon: FileText },
  { id: 'media', label: 'Fișiere', icon: ImageIcon },
  { id: 'bookings', label: 'Rezervări', icon: CalendarDays },
  { id: 'members', label: 'Membri', icon: Users }
];

const emptyAccommodation: AccommodationDraft = {
  slug: '',
  title_ro: '',
  title_en: '',
  title_ru: '',
  description_ro: '',
  description_en: '',
  description_ru: '',
  amenities_ro: '',
  amenities_en: '',
  amenities_ru: '',
  images: '',
  price_per_night: '',
  discount_percent: '0',
  currency: 'lei',
  capacity: '',
  sort_order: '100',
  is_active: true
};

function lines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value ?? '', null, 2);
}

function parseTextValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (/^[\[{"]/.test(trimmed) || trimmed === 'true' || trimmed === 'false' || trimmed === 'null' || /^-?\d+(\.\d+)?$/.test(trimmed)) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }

  return value;
}

function accommodationToDraft(row: any): AccommodationDraft {
  return {
    id: row.id,
    slug: row.slug ?? '',
    title_ro: row.title?.ro ?? '',
    title_en: row.title?.en ?? '',
    title_ru: row.title?.ru ?? '',
    description_ro: row.description?.ro ?? '',
    description_en: row.description?.en ?? '',
    description_ru: row.description?.ru ?? '',
    amenities_ro: (row.amenities?.ro ?? []).join('\n'),
    amenities_en: (row.amenities?.en ?? []).join('\n'),
    amenities_ru: (row.amenities?.ru ?? []).join('\n'),
    images: (row.images ?? []).join('\n'),
    price_per_night: row.price_per_night?.toString() ?? '',
    discount_percent: row.discount_percent?.toString() ?? '0',
    currency: row.currency ?? 'lei',
    capacity: row.capacity?.toString() ?? '',
    sort_order: row.sort_order?.toString() ?? '100',
    is_active: row.is_active ?? true
  };
}

export function AdminPanel() {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [search, setSearch] = useState('');
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [accommodationDraft, setAccommodationDraft] = useState<AccommodationDraft>(emptyAccommodation);
  const [texts, setTexts] = useState<any[]>([]);
  const [textDraft, setTextDraft] = useState<any>({ key: '', value_ro: '', value_en: '', value_ru: '' });
  const [media, setMedia] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [memberDraft, setMemberDraft] = useState({ email: '', password: '', full_name: '', role: 'editor' });
  const [filePreview, setFilePreview] = useState('');

  const loadMembers = useCallback(async () => {
    if (!session) {
      return;
    }

    const response = await fetch('/api/admin/members', {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });

    if (response.ok) {
      const json = await response.json();
      setMembers(json.members ?? []);
    }
  }, [session]);

  const loadAll = useCallback(async () => {
    if (!supabase) {
      return;
    }

    setMessage('');
    const [accommodationResult, textResult, mediaResult, bookingResult] = await Promise.all([
      supabase.from('accommodations').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_texts').select('*').order('key', { ascending: true }),
      supabase.from('media_assets').select('*').order('created_at', { ascending: false }),
      supabase.from('bookings').select('*').order('created_at', { ascending: false })
    ]);

    if (accommodationResult.data) setAccommodations(accommodationResult.data);
    if (textResult.data) setTexts(textResult.data);
    if (mediaResult.data) setMedia(mediaResult.data);
    if (bookingResult.data) setBookings(bookingResult.data);
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
    if (session) {
      void loadAll();
    }
  }, [loadAll, session]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) {
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSaving(false);
    setMessage(error ? error.message : '');
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setSession(null);
  }

  async function saveAccommodation(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) {
      return;
    }

    setSaving(true);
    const payload = {
      slug: accommodationDraft.slug,
      title: {
        ro: accommodationDraft.title_ro,
        en: accommodationDraft.title_en,
        ru: accommodationDraft.title_ru
      },
      description: {
        ro: accommodationDraft.description_ro,
        en: accommodationDraft.description_en,
        ru: accommodationDraft.description_ru
      },
      amenities: {
        ro: lines(accommodationDraft.amenities_ro),
        en: lines(accommodationDraft.amenities_en),
        ru: lines(accommodationDraft.amenities_ru)
      },
      images: lines(accommodationDraft.images),
      price_per_night: accommodationDraft.price_per_night ? Number(accommodationDraft.price_per_night) : null,
      discount_percent: Number(accommodationDraft.discount_percent || 0),
      currency: accommodationDraft.currency || 'lei',
      capacity: accommodationDraft.capacity ? Number(accommodationDraft.capacity) : null,
      sort_order: Number(accommodationDraft.sort_order || 100),
      is_active: accommodationDraft.is_active
    };

    const query = accommodationDraft.id
      ? supabase.from('accommodations').update(payload).eq('id', accommodationDraft.id)
      : supabase.from('accommodations').insert(payload);
    const { error } = await query;

    setSaving(false);
    setMessage(error ? error.message : 'Cazarea a fost salvată.');
    if (!error) {
      setAccommodationDraft(emptyAccommodation);
      await loadAll();
    }
  }

  async function deleteAccommodation(id: string) {
    if (!supabase || !confirm('Ștergi această cazare?')) {
      return;
    }

    const { error } = await supabase.from('accommodations').delete().eq('id', id);
    setMessage(error ? error.message : 'Cazarea a fost ștearsă.');
    await loadAll();
  }

  async function saveText(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || !textDraft.key) {
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('site_texts').upsert({
      key: textDraft.key,
      value_ro: parseTextValue(textDraft.value_ro),
      value_en: parseTextValue(textDraft.value_en),
      value_ru: parseTextValue(textDraft.value_ru),
      updated_by: session.user.id
    });
    setSaving(false);
    setMessage(error ? error.message : 'Textul a fost salvat.');
    if (!error) {
      setTextDraft({ key: '', value_ro: '', value_en: '', value_ru: '' });
      await loadAll();
    }
  }

  async function seedTexts() {
    if (!supabase || !confirm('Import cheile implicite de traducere? Textele existente cu aceleași chei vor fi actualizate.')) {
      return;
    }

    setSaving(true);
    const rows = getDefaultStaticTextRows().map((row) => ({ ...row, updated_by: session.user.id }));
    const { error } = await supabase.from('site_texts').upsert(rows);
    setSaving(false);
    setMessage(error ? error.message : 'Textele implicite au fost importate.');
    await loadAll();
  }

  async function deleteText(key: string) {
    if (!supabase || !confirm(`Ștergi cheia ${key}?`)) {
      return;
    }

    const { error } = await supabase.from('site_texts').delete().eq('key', key);
    setMessage(error ? error.message : 'Textul a fost șters.');
    await loadAll();
  }

  async function uploadMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !supabase) {
      return;
    }

    setFilePreview(URL.createObjectURL(file));
    setSaving(true);
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${Date.now()}-${cleanName}`;
    const upload = await supabase.storage.from('media').upload(path, file, { upsert: true, contentType: file.type });

    if (upload.error) {
      setSaving(false);
      setMessage(upload.error.message);
      return;
    }

    const publicUrl = supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
    const { error } = await supabase.from('media_assets').insert({
      title: file.name,
      url: publicUrl,
      path,
      mime_type: file.type,
      size_bytes: file.size,
      created_by: session.user.id
    });

    setSaving(false);
    setMessage(error ? error.message : 'Fișierul a fost încărcat.');
    await loadAll();
  }

  async function deleteMedia(item: any) {
    if (!supabase || !confirm('Ștergi acest fișier?')) {
      return;
    }

    await supabase.storage.from('media').remove([item.path]);
    const { error } = await supabase.from('media_assets').delete().eq('id', item.id);
    setMessage(error ? error.message : 'Fișierul a fost șters.');
    await loadAll();
  }

  async function updateBookingStatus(id: string, status: string) {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    setMessage(error ? error.message : 'Rezervarea a fost actualizată.');
    await loadAll();
  }

  async function createMember(event: React.FormEvent) {
    event.preventDefault();
    if (!session) {
      return;
    }

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

  async function deleteMember(id: string) {
    if (!session || !confirm('Ștergi acest membru și contul lui de autentificare?')) {
      return;
    }

    const response = await fetch(`/api/admin/members?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const json = await response.json();
    setMessage(response.ok ? 'Membrul a fost șters.' : json.error);
    await loadMembers();
  }

  const filteredAccommodations = accommodations.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const filteredTexts = texts.filter((item) => item.key.toLowerCase().includes(search.toLowerCase()) || JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const filteredMedia = media.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const filteredBookings = bookings.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const newBookings = bookings.filter((booking) => booking.status === 'new').length;

  if (loading) {
    return <div className="min-h-screen bg-stone-100 p-8 text-stone-dark">Se încarcă adminul...</div>;
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-stone-100 p-8">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-forest-dark">Admin indisponibil</h1>
          <p className="text-stone-dark">
            Adaugă în Vercel/local env variabilele NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY, apoi rulează migrarea din
            <span className="font-mono"> supabase/migrations/0001_enterprise_cms.sql</span>.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-forest-dark px-4 py-12">
        <form onSubmit={signIn} className="mx-auto max-w-md rounded-lg bg-cream p-8 shadow-xl">
          <h1 className="mb-2 text-3xl font-bold text-forest-dark">Admin Grădina Mărioarei</h1>
          <p className="mb-6 text-sm text-stone-dark">Autentificare pentru editarea completă a site-ului.</p>
          <label className="mb-4 block text-sm font-semibold text-stone-dark">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-1 w-full rounded border border-stone-light px-3 py-2" required />
          </label>
          <label className="mb-6 block text-sm font-semibold text-stone-dark">
            Parolă
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-1 w-full rounded border border-stone-light px-3 py-2" required />
          </label>
          {message && <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{message}</p>}
          <button disabled={saving} className="btn-primary w-full">{saving ? 'Se intră...' : 'Intră în admin'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1] text-stone-dark">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-stone-light bg-white p-5 lg:block">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">CMS Enterprise</p>
          <h1 className="mt-1 text-xl font-bold text-forest-dark">Grădina Mărioarei</h1>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold transition ${activeTab === tab.id ? 'bg-forest text-white' : 'hover:bg-stone-light/40'}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-stone-light bg-white/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2 lg:hidden">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded px-3 py-2 text-xs font-bold ${activeTab === tab.id ? 'bg-forest text-white' : 'bg-stone-light/50'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative max-w-lg flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-stone" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Caută în lista curentă..." className="w-full rounded-md border border-stone-light bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-forest" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={loadAll} className="btn-outline gap-2 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Reîncarcă</button>
              <button onClick={signOut} className="btn-secondary gap-2 py-2 text-sm"><LogOut className="h-4 w-4" /> Ieși</button>
            </div>
          </div>
          {message && <p className="mt-3 rounded-md bg-cream px-3 py-2 text-sm text-forest-dark">{message}</p>}
        </header>

        <div className="p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-forest-dark">Control complet</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <Metric title="Cazări" value={accommodations.length} />
                <Metric title="Texte traduse" value={texts.length} />
                <Metric title="Fișiere" value={media.length} />
                <Metric title="Rezervări noi" value={newBookings} />
              </div>
              <div className="mt-8 rounded-lg border border-stone-light bg-white p-6">
                <h3 className="mb-3 text-lg font-bold text-forest-dark">Checklist inițial</h3>
                <ul className="space-y-2 text-sm">
                  <li>1. Rulează migrarea SQL în Supabase.</li>
                  <li>2. Creează primul utilizator în Supabase Auth și setează rolul owner în admin_profiles.</li>
                  <li>3. Importă textele implicite din tabul Texte.</li>
                  <li>4. Încarcă imagini în Fișiere și folosește URL-urile în cazări sau texte.</li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'accommodations' && (
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
              <div className="space-y-4">
                {filteredAccommodations.map((item) => (
                  <div key={item.id} className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{item.slug}</p>
                        <h3 className="text-xl font-bold text-forest-dark">{item.title?.ro || item.slug}</h3>
                        <p className="mt-2 line-clamp-2 text-sm">{item.description?.ro}</p>
                        <p className="mt-2 text-sm font-semibold">{item.price_per_night ?? '-'} {item.currency} {item.discount_percent ? `- ${item.discount_percent}%` : ''}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setAccommodationDraft(accommodationToDraft(item))} className="btn-outline py-2 text-sm">Editează</button>
                        <button onClick={() => deleteAccommodation(item.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={saveAccommodation} className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-forest-dark"><Plus className="h-4 w-4" /> {accommodationDraft.id ? 'Editează cazare' : 'Adaugă cazare'}</h3>
                <AdminInput label="Slug" value={accommodationDraft.slug} onChange={(value) => setAccommodationDraft({ ...accommodationDraft, slug: value })} required />
                <ThreeLangInputs label="Titlu" draft={accommodationDraft} keys={['title_ro', 'title_en', 'title_ru']} setDraft={setAccommodationDraft} />
                <ThreeLangAreas label="Descriere" draft={accommodationDraft} keys={['description_ro', 'description_en', 'description_ru']} setDraft={setAccommodationDraft} />
                <ThreeLangAreas label="Facilități, una pe linie" draft={accommodationDraft} keys={['amenities_ro', 'amenities_en', 'amenities_ru']} setDraft={setAccommodationDraft} />
                <AdminArea label="Imagini, un URL pe linie" value={accommodationDraft.images} onChange={(value) => setAccommodationDraft({ ...accommodationDraft, images: value })} />
                <div className="grid grid-cols-2 gap-3">
                  <AdminInput label="Preț" value={accommodationDraft.price_per_night} type="number" onChange={(value) => setAccommodationDraft({ ...accommodationDraft, price_per_night: value })} />
                  <AdminInput label="Reducere %" value={accommodationDraft.discount_percent} type="number" onChange={(value) => setAccommodationDraft({ ...accommodationDraft, discount_percent: value })} />
                  <AdminInput label="Valută" value={accommodationDraft.currency} onChange={(value) => setAccommodationDraft({ ...accommodationDraft, currency: value })} />
                  <AdminInput label="Capacitate" value={accommodationDraft.capacity} type="number" onChange={(value) => setAccommodationDraft({ ...accommodationDraft, capacity: value })} />
                  <AdminInput label="Ordine" value={accommodationDraft.sort_order} type="number" onChange={(value) => setAccommodationDraft({ ...accommodationDraft, sort_order: value })} />
                </div>
                <label className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={accommodationDraft.is_active} onChange={(event) => setAccommodationDraft({ ...accommodationDraft, is_active: event.target.checked })} />
                  Activ pe site
                </label>
                <div className="flex gap-2">
                  <button disabled={saving} className="btn-primary gap-2"><Save className="h-4 w-4" /> Salvează</button>
                  <button type="button" onClick={() => setAccommodationDraft(emptyAccommodation)} className="btn-outline">Curăță</button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'texts' && (
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
              <div className="space-y-3">
                <button onClick={seedTexts} className="btn-secondary gap-2 text-sm"><RefreshCw className="h-4 w-4" /> Importă textele implicite RO/EN/RU</button>
                {filteredTexts.map((item) => (
                  <div key={item.key} className="rounded-lg border border-stone-light bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs text-terracotta">{item.key}</p>
                        <p className="mt-1 line-clamp-2 text-sm">{textValue(item.value_ro)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setTextDraft({ key: item.key, value_ro: textValue(item.value_ro), value_en: textValue(item.value_en), value_ru: textValue(item.value_ru) })} className="btn-outline py-2 text-sm">Editează</button>
                        <button onClick={() => deleteText(item.key)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={saveText} className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-forest-dark">Text static / JSON</h3>
                <AdminInput label="Cheie, ex: hero.welcome" value={textDraft.key} onChange={(value) => setTextDraft({ ...textDraft, key: value })} required />
                <AdminArea label="RO" value={textDraft.value_ro} onChange={(value) => setTextDraft({ ...textDraft, value_ro: value })} />
                <AdminArea label="EN" value={textDraft.value_en} onChange={(value) => setTextDraft({ ...textDraft, value_en: value })} />
                <AdminArea label="RU" value={textDraft.value_ru} onChange={(value) => setTextDraft({ ...textDraft, value_ru: value })} />
                <button disabled={saving} className="btn-primary gap-2"><Save className="h-4 w-4" /> Salvează textul</button>
              </form>
            </section>
          )}

          {activeTab === 'media' && (
            <section>
              <div className="mb-6 rounded-lg border border-stone-light bg-white p-5">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-stone-light p-8 text-center hover:bg-cream">
                  <Upload className="mb-2 h-8 w-8 text-forest" />
                  <span className="font-semibold">Upload fișier cu preview</span>
                  <span className="text-sm text-stone">Imagine, PDF sau alt fișier acceptat de bucket</span>
                  <input type="file" onChange={uploadMedia} className="hidden" />
                </label>
                {filePreview && <img src={filePreview} alt="Preview upload" className="mt-4 h-40 rounded object-cover" />}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="rounded-lg border border-stone-light bg-white p-3 shadow-sm">
                    {item.mime_type?.startsWith('image/') ? <img src={item.url} alt={item.title} className="h-40 w-full rounded object-cover" /> : <div className="flex h-40 items-center justify-center rounded bg-cream"><FileText /></div>}
                    <p className="mt-3 truncate text-sm font-semibold">{item.title}</p>
                    <input readOnly value={item.url} className="mt-2 w-full rounded border border-stone-light px-2 py-1 text-xs" />
                    <button onClick={() => deleteMedia(item)} className="mt-3 flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"><Trash2 className="h-4 w-4" /> Șterge</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'bookings' && (
            <section className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-terracotta">{booking.status} · {new Date(booking.created_at).toLocaleString('ro-MD')}</p>
                      <h3 className="mt-1 text-xl font-bold text-forest-dark">{booking.full_name}</h3>
                      <p className="text-sm">{booking.checkin} - {booking.checkout}, {booking.guests} oaspeți</p>
                      <p className="text-sm">{booking.unit_label}</p>
                      <p className="mt-2 text-sm">{booking.phone} · {booking.email}</p>
                      {booking.notes && <p className="mt-2 rounded bg-cream p-3 text-sm">{booking.notes}</p>}
                    </div>
                    <select value={booking.status} onChange={(event) => updateBookingStatus(booking.id, event.target.value)} className="rounded border border-stone-light px-3 py-2 text-sm">
                      <option value="new">Nouă</option>
                      <option value="confirmed">Confirmată</option>
                      <option value="cancelled">Anulată</option>
                      <option value="archived">Arhivată</option>
                    </select>
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'members' && (
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="rounded-lg border border-stone-light bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-forest-dark">{member.full_name || member.email}</h3>
                        <p className="text-sm">{member.email}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-terracotta">{member.role}</p>
                      </div>
                      <button onClick={() => deleteMember(member.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={createMember} className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-forest-dark"><UserPlus className="h-4 w-4" /> Adaugă membru</h3>
                <AdminInput label="Nume" value={memberDraft.full_name} onChange={(value) => setMemberDraft({ ...memberDraft, full_name: value })} />
                <AdminInput label="Email" value={memberDraft.email} type="email" onChange={(value) => setMemberDraft({ ...memberDraft, email: value })} required />
                <AdminInput label="Parolă temporară" value={memberDraft.password} type="password" onChange={(value) => setMemberDraft({ ...memberDraft, password: value })} required />
                <label className="mb-4 block text-sm font-semibold text-stone-dark">
                  Rol
                  <select value={memberDraft.role} onChange={(event) => setMemberDraft({ ...memberDraft, role: event.target.value })} className="mt-1 w-full rounded border border-stone-light px-3 py-2">
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </label>
                <button disabled={saving} className="btn-primary gap-2"><UserPlus className="h-4 w-4" /> Creează cont</button>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg border border-stone-light bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-stone">{title}</p>
      <p className="mt-2 text-3xl font-bold text-forest-dark">{value}</p>
    </div>
  );
}

function AdminInput({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="mb-4 block text-sm font-semibold text-stone-dark">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} className="mt-1 w-full rounded border border-stone-light px-3 py-2 outline-none focus:ring-2 focus:ring-forest" />
    </label>
  );
}

function AdminArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mb-4 block text-sm font-semibold text-stone-dark">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-1 w-full rounded border border-stone-light px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-forest" />
    </label>
  );
}

function ThreeLangInputs({ label, draft, keys, setDraft }: { label: string; draft: AccommodationDraft; keys: Array<keyof AccommodationDraft>; setDraft: (draft: AccommodationDraft) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <AdminInput label={`${label} RO`} value={String(draft[keys[0]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[0]]: value })} />
      <AdminInput label={`${label} EN`} value={String(draft[keys[1]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[1]]: value })} />
      <AdminInput label={`${label} RU`} value={String(draft[keys[2]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[2]]: value })} />
    </div>
  );
}

function ThreeLangAreas({ label, draft, keys, setDraft }: { label: string; draft: AccommodationDraft; keys: Array<keyof AccommodationDraft>; setDraft: (draft: AccommodationDraft) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <AdminArea label={`${label} RO`} value={String(draft[keys[0]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[0]]: value })} />
      <AdminArea label={`${label} EN`} value={String(draft[keys[1]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[1]]: value })} />
      <AdminArea label={`${label} RU`} value={String(draft[keys[2]] ?? '')} onChange={(value) => setDraft({ ...draft, [keys[2]]: value })} />
    </div>
  );
}

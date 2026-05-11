import { createTranslator } from '@/src/i18n/server';
import type { Language } from '@/src/i18n/translations';
import { getPublicSupabase } from '@/src/lib/supabase/server';
import type { Accommodation, AccommodationRow, BookingUnit } from './types';

function localized<T>(value: Partial<Record<Language, T>> | null | undefined, lang: Language, fallback: T): T {
  return value?.[lang] ?? value?.ro ?? value?.en ?? fallback;
}

function money(amount: number | null | undefined, currency: string | null | undefined) {
  if (!amount) {
    return '';
  }

  return `${amount} ${currency || 'lei'}`;
}

export function getFallbackAccommodations(lang: Language): Accommodation[] {
  const t = createTranslator(lang);

  return [
    {
      id: 'vila',
      slug: 'vila-mare',
      title: t('accommodation.vila_mare.title'),
      description: t('accommodation.vila_mare.desc'),
      price: t('accommodation.vila_mare.price'),
      discountPercent: 0,
      capacity: null,
      currency: 'lei',
      features: t('accommodation.vila_mare.features'),
      images: ['/casamare.jpg', '/casa_mare_interior.jpg'],
      isActive: true,
      sortOrder: 10
    },
    {
      id: 'beci1',
      slug: 'casuta-beci',
      title: t('accommodation.beci1.title'),
      description: t('accommodation.beci1.desc'),
      price: t('accommodation.beci1.price'),
      discountPercent: 0,
      capacity: null,
      currency: 'lei',
      features: t('accommodation.beci1.features'),
      images: ['/casa_beci1.jpg', '/casusta_veci1.jpg'],
      isActive: true,
      sortOrder: 20
    },
    {
      id: 'beci2',
      slug: 'casuta-beci-2',
      title: t('accommodation.beci2.title'),
      description: t('accommodation.beci2.desc'),
      price: t('accommodation.beci2.price'),
      discountPercent: 0,
      capacity: null,
      currency: 'lei',
      features: t('accommodation.beci2.features'),
      images: ['/casuta_beci2.jpg', '/casuta_beci2_2.jpg', '/_MG_0206_copy.jpg'],
      isActive: true,
      sortOrder: 30
    }
  ];
}

export function mapAccommodation(row: AccommodationRow, lang: Language): Accommodation {
  const price = money(row.price_per_night, row.currency);
  const discount = row.discount_percent ?? 0;

  return {
    id: row.id,
    slug: row.slug,
    title: localized(row.title, lang, row.slug),
    description: localized(row.description, lang, ''),
    price: discount > 0 && price ? `${price} -${discount}%` : price,
    discountPercent: discount,
    capacity: row.capacity,
    currency: row.currency || 'lei',
    features: localized(row.amenities, lang, []),
    images: row.images?.length ? row.images : ['/casamare.jpg'],
    isActive: row.is_active,
    sortOrder: row.sort_order ?? 0
  };
}

export async function getAccommodations(lang: Language): Promise<Accommodation[]> {
  const fallback = getFallbackAccommodations(lang);
  const supabase = getPublicSupabase();

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error || !data?.length) {
    return fallback;
  }

  return (data as AccommodationRow[]).map((row) => mapAccommodation(row, lang));
}

export async function getBookingUnits(lang: Language): Promise<BookingUnit[]> {
  const accommodations = await getAccommodations(lang);

  return accommodations.map((unit) => ({
    id: unit.id,
    title: unit.title,
    price: unit.price
  }));
}

export async function createCmsTranslator(lang: Language) {
  const fallback = createTranslator(lang);
  const supabase = getPublicSupabase();

  if (!supabase) {
    return fallback;
  }

  const column = `value_${lang}`;
  const { data, error } = await supabase.from('site_texts').select('key,value_ro,value_en,value_ru');

  if (error || !data) {
    return fallback;
  }

  const overrides = new Map<string, unknown>();
  for (const row of data as unknown as Array<Record<string, unknown>>) {
    if (row[column] !== null && row[column] !== undefined && row[column] !== '') {
      overrides.set(String(row.key), row[column]);
    }
  }

  return (path: string) => overrides.get(path) ?? fallback(path);
}

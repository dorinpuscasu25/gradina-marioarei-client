import type { Language } from '@/src/i18n/translations';

export type LocalizedValue<T> = Record<Language, T>;

export type Accommodation = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  discountPercent: number;
  capacity: number | null;
  currency: string;
  features: string[];
  images: string[];
  isActive: boolean;
  sortOrder: number;
};

export type AccommodationRow = {
  id: string;
  slug: string;
  title: LocalizedValue<string>;
  description: LocalizedValue<string>;
  amenities: LocalizedValue<string[]>;
  images: string[];
  price_per_night: number | null;
  discount_percent: number | null;
  currency: string | null;
  capacity: number | null;
  is_active: boolean;
  sort_order: number | null;
};

export type Experience = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  highlights: string[];
  images: string[];
  price: string;
  capacity: number | null;
  durationMinutes: number | null;
  sortOrder: number;
};

export type ExperienceRow = {
  id: string;
  slug: string;
  title: LocalizedValue<string>;
  description: LocalizedValue<string>;
  location: LocalizedValue<string>;
  highlights: LocalizedValue<string[]>;
  images: string[];
  price: number | null;
  currency: string | null;
  duration_minutes: number | null;
  capacity: number | null;
  status: string;
  sort_order: number | null;
};

export type BookingUnit = {
  id: string;
  title: string;
  price: string;
};

export type StaticTextRow = {
  key: string;
  value_ro: unknown;
  value_en: unknown;
  value_ru: unknown;
  updated_at?: string;
};

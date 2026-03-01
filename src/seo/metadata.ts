import type { Metadata } from 'next';
import type { Language } from '@/src/i18n/translations';

export const SITE_NAME = 'Pensiunea Grădina Mărioarei';
export const SITE_DESCRIPTION =
  'Pensiunea Grădina Mărioarei din Vălcineț, raionul Călărași - cazare, ciubăr, zonă de grătar și experiențe autentice în natură.';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://gradinamarioarei.md';

const LOCALE_BY_LANG: Record<Language, string> = {
  ro: 'ro_MD',
  en: 'en_US',
  ru: 'ru_RU'
};

type PageKey =
  | 'home'
  | 'accommodation'
  | 'experiences'
  | 'discover'
  | 'about'
  | 'contact'
  | 'book';

type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
};

const PAGE_COPY: Record<PageKey, Record<Language, PageSeo>> = {
  home: {
    ro: {
      title: 'Pensiunea Grădina Mărioarei | Cazare în Vălcineț',
      description:
        'Descoperă Pensiunea Grădina Mărioarei: cazare autentică, ciubăr, zonă de grătar și experiențe în natură, în Vălcineț, raionul Călărași.',
      keywords: ['pensiune', 'cazare Vălcineț', 'agroturism Moldova', 'ciubăr', 'grătar']
    },
    en: {
      title: 'Pensiunea Grădina Mărioarei | Stay in Vălcineț',
      description:
        'Stay at Pensiunea Grădina Mărioarei in Vălcineț: authentic accommodation, hot tub, BBQ area, and countryside experiences.',
      keywords: ['guesthouse', 'Vălcineț stay', 'Moldova countryside', 'hot tub', 'bbq area']
    },
    ru: {
      title: 'Pensiunea Grădina Mărioarei | Отдых в Вэлчинец',
      description:
        'Pensiunea Grădina Mărioarei в Вэлчинец: уютное проживание, чан, зона барбекю и отдых на природе.',
      keywords: ['пансионат', 'Вэлчинец', 'агротуризм Молдова', 'чан', 'барбекю']
    }
  },
  accommodation: {
    ro: {
      title: 'Cazare | Pensiunea Grădina Mărioarei',
      description:
        'Vezi opțiunile de cazare: Vila Mare, Căsuța tip Beci și Căsuța tip Beci 2, cu prețuri clare și facilități complete.',
      keywords: ['cazare', 'Vila Mare', 'Căsuța tip Beci', 'preț cazare']
    },
    en: {
      title: 'Accommodation | Pensiunea Grădina Mărioarei',
      description:
        'Explore accommodation options: Grand Villa, Cellar Cottage, and Cellar Cottage 2 with prices and amenities.',
      keywords: ['accommodation', 'villa', 'cottage', 'prices']
    },
    ru: {
      title: 'Проживание | Pensiunea Grădina Mărioarei',
      description:
        'Варианты проживания: Большая Вилла, Домик типа Погреб и Домик типа Погреб 2 с ценами и удобствами.',
      keywords: ['проживание', 'вилла', 'домик', 'цены']
    }
  },
  experiences: {
    ro: {
      title: 'Experiențe | Pensiunea Grădina Mărioarei',
      description:
        'Activități și experiențe autentice la țară: relaxare, natură, seri la grătar și timp de calitate cu cei dragi.',
      keywords: ['experiențe', 'natură', 'relaxare', 'grătar']
    },
    en: {
      title: 'Experiences | Pensiunea Grădina Mărioarei',
      description:
        'Authentic countryside experiences: nature walks, relaxation, BBQ evenings, and quality time with family.',
      keywords: ['experiences', 'nature', 'relaxation', 'bbq']
    },
    ru: {
      title: 'Впечатления | Pensiunea Grădina Mărioarei',
      description:
        'Аутентичный отдых на природе: прогулки, релаксация, вечера барбекю и семейные моменты.',
      keywords: ['впечатления', 'природа', 'релакс', 'барбекю']
    }
  },
  discover: {
    ro: {
      title: 'Descoperă Zona | Pensiunea Grădina Mărioarei',
      description:
        'Explorează Vălcinețul și împrejurimile: peisaje, tradiții locale și povești ale locului.',
      keywords: ['Vălcineț', 'Călărași', 'tradiții', 'peisaje']
    },
    en: {
      title: 'Discover Area | Pensiunea Grădina Mărioarei',
      description:
        'Discover Vălcineț and nearby places: landscapes, local traditions, and stories of the region.',
      keywords: ['discover area', 'Vălcineț', 'traditions', 'landscapes']
    },
    ru: {
      title: 'О регионе | Pensiunea Grădina Mărioarei',
      description:
        'Откройте для себя Вэлчинец и окрестности: пейзажи, местные традиции и истории региона.',
      keywords: ['регион', 'Вэлчинец', 'традиции', 'пейзажи']
    }
  },
  about: {
    ro: {
      title: 'Despre Noi | Pensiunea Grădina Mărioarei',
      description:
        'Povestea Pensiunii Agroturistica Grădina Marioarei: locul unde tradiția, natura și confortul modern se întâlnesc.',
      keywords: ['despre pensiune', 'agroturism', 'Grădina Marioarei']
    },
    en: {
      title: 'About Us | Pensiunea Grădina Mărioarei',
      description:
        'The story of Pensiunea Grădina Mărioarei, where tradition, nature, and modern comfort come together.',
      keywords: ['about', 'guesthouse story', 'agrotourism']
    },
    ru: {
      title: 'О нас | Pensiunea Grădina Mărioarei',
      description:
        'История Pensiunea Grădina Mărioarei: место, где традиции, природа и современный комфорт сочетаются.',
      keywords: ['о нас', 'история пансионата', 'агротуризм']
    }
  },
  contact: {
    ro: {
      title: 'Contact | Pensiunea Grădina Mărioarei',
      description:
        'Date de contact pentru Pensiunea Grădina Mărioarei: telefon, email și adresă în Vălcineț, raionul Călărași.',
      keywords: ['contact', 'telefon pensiune', 'adresă Vălcineț']
    },
    en: {
      title: 'Contact | Pensiunea Grădina Mărioarei',
      description:
        'Contact details for Pensiunea Grădina Mărioarei: phone, email, and address in Vălcineț, Călărași district.',
      keywords: ['contact', 'phone', 'address']
    },
    ru: {
      title: 'Контакты | Pensiunea Grădina Mărioarei',
      description:
        'Контакты Pensiunea Grădina Mărioarei: телефон, email и адрес в Вэлчинец, район Кэлэрашь.',
      keywords: ['контакты', 'телефон', 'адрес']
    }
  },
  book: {
    ro: {
      title: 'Rezervă | Pensiunea Grădina Mărioarei',
      description:
        'Solicită rapid o rezervare pentru Vila Mare, Căsuța tip Beci sau Căsuța tip Beci 2 la Pensiunea Grădina Mărioarei.',
      keywords: ['rezervare', 'cazare', 'pensiune', 'Vălcineț']
    },
    en: {
      title: 'Book | Pensiunea Grădina Mărioarei',
      description:
        'Send a booking request for the Grand Villa or Cellar Cottages at Pensiunea Grădina Mărioarei.',
      keywords: ['booking', 'guesthouse', 'villa', 'cottages']
    },
    ru: {
      title: 'Бронирование | Pensiunea Grădina Mărioarei',
      description:
        'Отправьте запрос на бронирование Большой Виллы или домиков в Pensiunea Grădina Mărioarei.',
      keywords: ['бронирование', 'пансионат', 'вилла', 'домики']
    }
  }
};

const PAGE_PATH: Record<PageKey, string> = {
  home: '',
  accommodation: '/accommodation',
  experiences: '/experiences',
  discover: '/discover',
  about: '/about',
  contact: '/contact',
  book: '/book'
};

export function buildPageMetadata(page: PageKey, lang: Language): Metadata {
  const seo = PAGE_COPY[page][lang];
  const suffix = PAGE_PATH[page];
  const currentPath = `/${lang}${suffix}`;
  const absoluteUrl = `${SITE_URL}${currentPath}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: currentPath,
      languages: {
        ro: `/ro${suffix}`,
        en: `/en${suffix}`,
        ru: `/ru${suffix}`
      }
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      locale: LOCALE_BY_LANG[lang],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description
    }
  };
}

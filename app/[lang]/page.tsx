import type { Metadata } from 'next';
import { HomePage } from '@/src/views/HomePage';
import { notFound } from 'next/navigation';
import { isLanguage } from '@/src/i18n/server';
import { buildPageMetadata, SITE_NAME, SITE_URL } from '@/src/seo/metadata';
import { createCmsTranslator, getAccommodations } from '@/src/lib/cms/data';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    return {};
  }
  return buildPageMetadata('home', lang);
}

export default async function HomeRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await createCmsTranslator(lang);
  const accommodations = await getAccommodations(lang);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SITE_NAME,
    url: `${SITE_URL}/${lang}`,
    description: t('hero.subtitle'),
    telephone: '060588845',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'str. Ștefan cel Mare nr. 123',
      addressLocality: 'Vălcineț',
      addressRegion: 'raionul Călărași',
      addressCountry: 'MD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage lang={lang} t={t} accommodations={accommodations} />
    </>
  );
}

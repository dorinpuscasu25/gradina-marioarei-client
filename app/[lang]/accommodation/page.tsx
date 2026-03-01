import type { Metadata } from 'next';
import { AccommodationPage } from '@/src/views/AccommodationPage';
import { notFound } from 'next/navigation';
import { createTranslator, isLanguage } from '@/src/i18n/server';
import { buildPageMetadata } from '@/src/seo/metadata';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    return {};
  }
  return buildPageMetadata('accommodation', lang);
}

export default async function AccommodationRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = createTranslator(lang);
  return <AccommodationPage lang={lang} t={t} />;
}

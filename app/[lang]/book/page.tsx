import type { Metadata } from 'next';
import { BookPage } from '@/src/views/BookPage';
import { notFound } from 'next/navigation';
import { isLanguage } from '@/src/i18n/server';
import { buildPageMetadata } from '@/src/seo/metadata';
import { createCmsTranslator, getBookingUnits } from '@/src/lib/cms/data';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    return {};
  }
  return buildPageMetadata('book', lang);
}

export default async function BookRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await createCmsTranslator(lang);
  const units = await getBookingUnits(lang);
  return <BookPage lang={lang} t={t} units={units} />;
}

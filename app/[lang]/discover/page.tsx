import type { Metadata } from 'next';
import { DiscoverPage } from '@/src/views/DiscoverPage';
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
  return buildPageMetadata('discover', lang);
}

export default async function DiscoverRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = createTranslator(lang);
  return <DiscoverPage lang={lang} t={t} />;
}

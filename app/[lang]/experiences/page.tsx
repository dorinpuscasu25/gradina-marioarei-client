import type { Metadata } from 'next';
import { ExperiencesPage } from '@/src/views/ExperiencesPage';
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
  return buildPageMetadata('experiences', lang);
}

export default async function ExperiencesRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = createTranslator(lang);
  return <ExperiencesPage lang={lang} t={t} />;
}

import type { Metadata } from 'next';
import { AboutPage } from '@/src/views/AboutPage';
import { notFound } from 'next/navigation';
import { isLanguage } from '@/src/i18n/server';
import { buildPageMetadata } from '@/src/seo/metadata';
import { createCmsTranslator, getSiteSettings } from '@/src/lib/cms/data';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    return {};
  }
  return buildPageMetadata('about', lang);
}

export default async function AboutRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await createCmsTranslator(lang);
  const settings = await getSiteSettings();
  return <AboutPage lang={lang} t={t} settings={(settings as any).about} />;
}

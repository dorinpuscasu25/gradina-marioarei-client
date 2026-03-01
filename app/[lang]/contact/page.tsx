import type { Metadata } from 'next';
import { ContactPage } from '@/src/views/ContactPage';
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
  return buildPageMetadata('contact', lang);
}

export default async function ContactRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = createTranslator(lang);
  return <ContactPage lang={lang} t={t} />;
}

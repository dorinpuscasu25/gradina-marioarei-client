import type { Metadata } from 'next';
import { ContactPage } from '@/src/views/ContactPage';
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
  return buildPageMetadata('contact', lang);
}

export default async function ContactRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const t = await createCmsTranslator(lang);
  const settings = await getSiteSettings();
  return <ContactPage lang={lang} t={t} settings={(settings as any).contact} />;
}

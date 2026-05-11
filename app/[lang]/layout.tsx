import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { isLanguage } from '@/src/i18n/server';
import { createCmsTranslator } from '@/src/lib/cms/data';

export const dynamic = 'force-dynamic';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const t = await createCmsTranslator(lang);

  return (
    <div className="flex flex-col min-h-screen font-sans text-dark bg-cream selection:bg-terracotta selection:text-white">
      <Header
        lang={lang}
        labels={{
          home: t('nav.home'),
          accommodation: t('nav.accommodation'),
          experiences: t('nav.experiences'),
          discover: t('nav.discover'),
          about: t('nav.about'),
          contact: t('nav.contact'),
          book: t('nav.book'),
          language: t('footer.language')
        }}
      />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} t={t} />
    </div>
  );
}

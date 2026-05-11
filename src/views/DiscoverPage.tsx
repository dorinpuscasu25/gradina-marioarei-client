import React from 'react';
import { BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

type DiscoverPageProps = I18nProps & {
  settings?: any;
};

export function DiscoverPage({ lang, t, settings }: DiscoverPageProps) {
  const items = settings?.items?.length
    ? settings.items.map((item: any) => ({
        title: item.title?.[lang] ?? '',
        desc: item.description?.[lang] ?? ''
      }))
    : t('discover.articles');
  const images = settings?.images?.length ? settings.images : ['/Screenshot_2026-02-11_at_22.28.43.png'];
  const title = settings?.title?.[lang] || t('discover.title');
  const subtitle = settings?.subtitle?.[lang] || t('discover.subtitle');
  const legendTitle = settings?.legendTitle?.[lang] || t('discover.legends');
  const legendText = settings?.legendText?.[lang] || t('discover.legend_text');
  const legendLabel = settings?.legendLabel?.[lang] || t('discover.folklore');

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            {items.map((article: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-terracotta">
                  <h3 className="text-2xl font-serif font-bold text-forest-dark mb-3">{article.title}</h3>
                  <p className="text-stone-dark leading-relaxed">{article.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="sticky top-32">
              <img
                src={images[0]}
                alt="Vălcineț Landscape"
                className="rounded-xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal width="100%">
          <div className="bg-forest-dark text-cream rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-terracotta opacity-80" />
            <h3 className="text-3xl font-serif font-bold mb-6">{legendTitle}</h3>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-90">"{legendText}"</p>
            <div className="mt-8 text-sm text-stone-light uppercase tracking-widest">{legendLabel}</div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

import React from 'react';
import { BookOpen } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function DiscoverPage({ t }: I18nProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <SectionHeading title={t('discover.title')} subtitle={t('discover.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            {t('discover.articles').map((article: any, idx: number) => (
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
                src="/Screenshot_2026-02-11_at_22.28.43.png"
                alt="Vălcineț Landscape"
                className="rounded-xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal width="100%">
          <div className="bg-forest-dark text-cream rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-terracotta opacity-80" />
            <h3 className="text-3xl font-serif font-bold mb-6">{t('discover.legends')}</h3>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-90">"{t('discover.legend_text')}"</p>
            <div className="mt-8 text-sm text-stone-light uppercase tracking-widest">{t('discover.folklore')}</div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

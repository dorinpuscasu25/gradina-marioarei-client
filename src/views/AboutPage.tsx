import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function AboutPage({ t }: I18nProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={t('about.title')} subtitle={t('about.subtitle')} />

          <ScrollReveal>
            <div className="prose prose-lg prose-stone mx-auto text-stone-dark">
              <p className="text-xl font-serif leading-relaxed mb-8 text-forest-dark whitespace-pre-line">{t('about.story')}</p>

              <div className="my-12 rounded-xl overflow-hidden shadow-xl">
                <img src="/casa_mare_interior.jpg" alt="Grădina Mărioarei Interior" className="w-full h-auto" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-forest-dark mt-12 mb-4">{t('about.mission_label')}</h3>
              <p className="leading-relaxed">{t('about.mission')}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 not-prose">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <span className="block text-4xl mb-2">🌿</span>
                  <h4 className="font-bold text-forest mb-2">{t('about.nature_first')}</h4>
                  <p className="text-sm text-stone-dark">{t('about.nature_first_desc')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <span className="block text-4xl mb-2">🤝</span>
                  <h4 className="font-bold text-forest mb-2">{t('about.authenticity')}</h4>
                  <p className="text-sm text-stone-dark">{t('about.authenticity_desc')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

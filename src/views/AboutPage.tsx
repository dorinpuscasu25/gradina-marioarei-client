import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

type AboutPageProps = I18nProps & {
  settings?: any;
};

export function AboutPage({ lang, t, settings }: AboutPageProps) {
  const title = settings?.headline?.[lang] || t('about.title');
  const story = settings?.story?.[lang] || t('about.story');
  const mission = settings?.mission?.[lang] || t('about.mission');
  const image = settings?.image || '/casa_mare_interior.jpg';

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={title} subtitle={t('about.subtitle')} />

          <ScrollReveal>
            <div className="prose prose-lg prose-stone mx-auto text-stone-dark">
              <p className="text-xl font-serif leading-relaxed mb-8 text-forest-dark whitespace-pre-line">{story}</p>

              <div className="my-12 rounded-xl overflow-hidden shadow-xl">
                <img src={image} alt="Grădina Mărioarei Interior" className="w-full h-auto" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-forest-dark mt-12 mb-4">{t('about.mission_label')}</h3>
              <p className="leading-relaxed">{mission}</p>

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

import React from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function ExperiencesPage({ t }: I18nProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <SectionHeading title={t('experiences.title')} subtitle={t('experiences.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {t('experiences.items').map((item: any, idx: number) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-forest h-full hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl font-serif font-bold text-forest-dark mb-3">{item.title}</h3>
                <p className="text-stone-dark leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal width="100%">
          <div className="bg-cream rounded-2xl p-8 md:p-12 border border-stone-light/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full -mr-32 -mt-32" />

            <h3 className="text-3xl font-serif font-bold text-center mb-12 relative z-10">{t('experiences.itinerary')}</h3>

            <div className="space-y-8 relative z-10 max-w-3xl mx-auto">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-forest-dark mb-1">{t('experiences.morning_label')}</h4>
                  <p className="text-stone-dark">{t('experiences.morning')}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-forest-dark mb-1">{t('experiences.afternoon_label')}</h4>
                  <p className="text-stone-dark">{t('experiences.afternoon')}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-forest-dark mb-1">{t('experiences.evening_label')}</h4>
                  <p className="text-stone-dark">{t('experiences.evening')}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

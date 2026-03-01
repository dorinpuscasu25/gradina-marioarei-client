import React from 'react';
import { Flame } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ScrollReveal } from './ScrollReveal';
import type { Translator } from '../i18n/types';

type BarbecueSectionProps = {
  t: Translator;
};

// Add, remove, or reorder BBQ images here.
const bbqImages = ['/zona_pentru_rug.jpg', '/colage2.jpg', '/colage4.jpg'];

export function BarbecueSection({ t }: BarbecueSectionProps) {
  return (
    <section className="py-20 bg-stone-light/20">
      <div className="container-custom">
        <SectionHeading title={t('bbq.title')} subtitle={t('bbq.subtitle')} />

        <ScrollReveal width="100%">
          <div className="bg-white rounded-2xl p-8 border border-stone-light/40 shadow-sm mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-stone-dark text-lg leading-relaxed">{t('bbq.description')}</p>
                <p className="text-sm text-stone mt-3">{t('bbq.gallery_hint')}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bbqImages.map((src, idx) => (
            <ScrollReveal key={src} delay={idx * 0.1}>
              <div className="rounded-xl overflow-hidden shadow-md border border-stone-light/40 h-72">
                <img src={src} alt={`BBQ ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

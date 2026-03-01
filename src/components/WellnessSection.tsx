import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Thermometer, Users, Clock, Droplets, Wallet } from 'lucide-react';
import type { Translator } from '../i18n/types';

type WellnessSectionProps = {
  t: Translator;
};

export function WellnessSection({ t }: WellnessSectionProps) {
  return (
    <section className="py-20 bg-forest-dark text-cream relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white/10">
              <img src="/ciubar.jpg" alt="Ciubăr Wellness" className="w-full h-full object-cover min-h-[400px]" />
              <div className="absolute inset-0 bg-forest/20 mix-blend-multiply" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <span className="text-terracotta font-medium tracking-wider uppercase mb-2 block">Wellness</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">{t('wellness.title')}</h2>
              <p className="text-stone-light text-lg mb-8 leading-relaxed">{t('wellness.subtitle')}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <Users className="w-8 h-8 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('wellness.capacity_label')}</h4>
                    <p className="text-stone-light text-sm">{t('wellness.capacity')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <Thermometer className="w-8 h-8 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('wellness.temp_label')}</h4>
                    <p className="text-stone-light text-sm">{t('wellness.temp')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <Clock className="w-8 h-8 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('wellness.duration_label')}</h4>
                    <p className="text-stone-light text-sm">{t('wellness.duration')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <Droplets className="w-8 h-8 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('wellness.filter_label')}</h4>
                    <p className="text-stone-light text-sm">{t('wellness.filter')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors sm:col-span-2">
                  <Wallet className="w-8 h-8 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('wellness.price_label')}</h4>
                    <p className="text-stone-light text-sm">{t('wellness.price')}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

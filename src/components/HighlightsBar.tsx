import React from 'react';
import { Wifi, Utensils, Flame, Trees, Droplets } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import type { Translator } from '../i18n/types';

type HighlightsBarProps = {
  t: Translator;
};

export function HighlightsBar({ t }: HighlightsBarProps) {
  const highlights = [
    { icon: Wifi, label: t('highlights.wifi') },
    { icon: Utensils, label: t('highlights.kitchen') },
    { icon: Flame, label: t('highlights.bbq') },
    { icon: Trees, label: t('highlights.nature') },
    { icon: Droplets, label: t('highlights.wellness') }
  ];

  return (
    <div className="bg-cream border-b border-stone-light/30 py-12">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center mb-3 text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-stone-dark uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import type { I18nProps } from '../i18n/types';

interface AccommodationCardProps extends I18nProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  price: string;
  delay?: number;
}

export function AccommodationCard({
  lang,
  t,
  title,
  description,
  features,
  image,
  price,
  delay = 0
}: AccommodationCardProps) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-stone-light/30">
        <div className="relative h-64 overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-serif font-bold">{title}</h3>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-semibold text-sm mb-4">
            <span>{t('accommodation.price_label')}:</span>
            <span>{price}</span>
          </div>
          <p className="text-stone-dark mb-6 line-clamp-3">{description}</p>

          <div className="mb-8 flex-grow">
            <h4 className="text-sm font-bold text-forest uppercase tracking-wider mb-3">
              {t('accommodation.amenities')}
            </h4>
            <ul className="space-y-2">
              {features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-stone-dark">
                  <Check className="w-4 h-4 text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {features.length > 4 && <li className="text-sm text-stone-dark pl-6">+ {features.length - 4} ...</li>}
            </ul>
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <Link
              href={`/${lang}/book`}
              className="w-full py-3 bg-forest text-white text-center rounded hover:bg-forest-light transition-colors font-medium"
            >
              {t('accommodation.book_btn')}
            </Link>
            <Link
              href={`/${lang}/accommodation`}
              className="w-full py-3 border border-stone-light text-stone-dark text-center rounded hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              {t('accommodation.details')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

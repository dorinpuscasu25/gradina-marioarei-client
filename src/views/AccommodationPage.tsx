import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function AccommodationPage({ lang, t }: I18nProps) {
  const units = [
    {
      id: 'vila',
      title: t('accommodation.vila_mare.title'),
      desc: t('accommodation.vila_mare.desc'),
      price: t('accommodation.vila_mare.price'),
      features: t('accommodation.vila_mare.features'),
      images: ['/casamare.jpg', '/casa_mare_interior.jpg']
    },
    {
      id: 'beci1',
      title: t('accommodation.beci1.title'),
      desc: t('accommodation.beci1.desc'),
      price: t('accommodation.beci1.price'),
      features: t('accommodation.beci1.features'),
      images: ['/casa_beci1.jpg', '/casusta_veci1.jpg']
    },
    {
      id: 'beci2',
      title: t('accommodation.beci2.title'),
      desc: t('accommodation.beci2.desc'),
      price: t('accommodation.beci2.price'),
      features: t('accommodation.beci2.features'),
      images: ['/casuta_beci2.jpg', '/casuta_beci2_2.jpg', '/_MG_0206_copy.jpg']
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <SectionHeading title={t('accommodation.title')} subtitle={t('accommodation.subtitle')} />

        <div className="space-y-24">
          {units.map((unit, idx) => (
            <ScrollReveal key={unit.id} width="100%">
              <div className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start`}>
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                    <img
                      src={unit.images[0]}
                      alt={unit.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {unit.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {unit.images.slice(1, 3).map((img, imgIdx) => (
                        <div key={imgIdx} className="rounded-lg overflow-hidden h-40">
                          <img
                            src={img}
                            alt={`${unit.title} detail ${imgIdx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-1/2 pt-4">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-3xl font-serif font-bold text-forest-dark">{unit.title}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-semibold text-sm">
                      {t('accommodation.price_label')}: {unit.price}
                    </span>
                  </div>
                  <p className="text-stone-dark text-lg mb-8 leading-relaxed">{unit.desc}</p>

                  <div className="bg-white p-6 rounded-lg border border-stone-light/30 shadow-sm mb-8">
                    <h4 className="font-bold text-forest uppercase tracking-wider mb-4 text-sm">{t('accommodation.amenities')}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {unit.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-center text-stone-dark">
                          <Check className="w-4 h-4 text-terracotta mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/${lang}/book`} className="btn-primary flex items-center justify-center gap-2">
                      {t('accommodation.book_btn')} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:060588845" className="btn-outline flex items-center justify-center gap-2">
                      {t('accommodation.call_btn')}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

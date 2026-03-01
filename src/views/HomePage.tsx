import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { HighlightsBar } from '../components/HighlightsBar';
import { AccommodationCard } from '../components/AccommodationCard';
import { WellnessSection } from '../components/WellnessSection';
import { BarbecueSection } from '../components/BarbecueSection';
import { ContactStrip } from '../components/ContactStrip';
import { SectionHeading } from '../components/SectionHeading';
import { GalleryGrid } from '../components/GalleryGrid';
import type { I18nProps } from '../i18n/types';

export function HomePage({ lang, t }: I18nProps) {
  return (
    <div className="min-h-screen">
      <HeroSection
        lang={lang}
        welcome={t('hero.welcome')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.cta_primary')}
        ctaSecondary={t('hero.cta_secondary')}
      />
      <HighlightsBar t={t} />

      <section className="py-20 container-custom">
        <SectionHeading title={t('accommodation.title')} subtitle={t('accommodation.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AccommodationCard
            lang={lang}
            t={t}
            title={t('accommodation.vila_mare.title')}
            description={t('accommodation.vila_mare.desc')}
            features={t('accommodation.vila_mare.features')}
            image="/casamare.jpg"
            price={t('accommodation.vila_mare.price')}
            delay={0}
          />

          <AccommodationCard
            lang={lang}
            t={t}
            title={t('accommodation.beci1.title')}
            description={t('accommodation.beci1.desc')}
            features={t('accommodation.beci1.features')}
            image="/casa_beci1.jpg"
            price={t('accommodation.beci1.price')}
            delay={0.2}
          />

          <AccommodationCard
            lang={lang}
            t={t}
            title={t('accommodation.beci2.title')}
            description={t('accommodation.beci2.desc')}
            features={t('accommodation.beci2.features')}
            image="/casuta_beci2.jpg"
            price={t('accommodation.beci2.price')}
            delay={0.4}
          />
        </div>

        <div className="text-center mt-12">
          <Link href={`/${lang}/accommodation`} className="btn-outline">
            {t('accommodation.view_all')}
          </Link>
        </div>
      </section>

      <WellnessSection t={t} />

      <BarbecueSection t={t} />

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading title={t('experiences.title')} subtitle={t('experiences.subtitle')} center={false} />

              <ul className="space-y-4 mb-8">
                {t('experiences.items')
                  .slice(0, 4)
                  .map((item: any, idx: number) => (
                    <li key={idx} className="flex items-center text-stone-dark">
                      <div className="w-2 h-2 bg-terracotta rounded-full mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </li>
                  ))}
              </ul>
              <Link href={`/${lang}/experiences`} className="btn-secondary flex items-center gap-2 w-fit">
                {t('experiences.explore')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/zona_pentru_rug.jpg" alt="Experience 1" className="rounded-lg shadow-lg w-full h-64 object-cover mt-12" />
              <img src="/ciubar.jpg" alt="Experience 2" className="rounded-lg shadow-lg w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-light/30">
        <div className="container-custom text-center">
          <MapPin className="w-10 h-10 text-forest mx-auto mb-4" />
          <SectionHeading title={t('discover.title')} subtitle={t('discover.subtitle')} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {t('discover.articles').map((article: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-forest mb-3">{article.title}</h3>
                <p className="text-stone-dark">{article.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href={`/${lang}/discover`}
              className="text-terracotta font-bold hover:underline flex items-center justify-center gap-2"
            >
              {t('discover.read_stories')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 container-custom">
        <SectionHeading title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
        <GalleryGrid />
      </section>

      <ContactStrip t={t} />
    </div>
  );
}

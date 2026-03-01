import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import type { I18nProps } from '../i18n/types';

export function Footer({ lang, t }: I18nProps) {
  return (
    <footer className="bg-forest-dark text-cream pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Pensiunea Grădina Mărioarei</h3>
            <div className="space-y-4 text-stone-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-terracotta flex-shrink-0" />
                <p>{t('contact.address_val')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-terracotta flex-shrink-0" />
                <a href="mailto:gradinamarioarei@gmail.com" className="hover:text-white transition-colors">
                  gradinamarioarei@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1 text-terracotta flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:060588845" className="hover:text-white transition-colors">
                    060588845
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">{t('nav.discover')}</h4>
            <ul className="space-y-3 text-stone-light">
              <li>
                <Link href={`/${lang}/accommodation`} className="hover:text-terracotta transition-colors">
                  {t('nav.accommodation')}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/experiences`} className="hover:text-terracotta transition-colors">
                  {t('nav.experiences')}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-terracotta transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-terracotta transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/book`} className="hover:text-terracotta transition-colors">
                  {t('nav.book')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white">Social Media</h4>
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="p-2 bg-forest-light rounded-full hover:bg-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-forest-light rounded-full hover:bg-terracotta transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-stone-light text-sm opacity-80">{t('hero.subtitle')}</p>
          </div>
        </div>

        <div className="border-t border-forest-light pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-light opacity-60">
          <p>{t('footer.copyright')}</p>
          <div className="mt-4 md:mt-0">
            <span className="mr-2">{t('footer.language')}:</span>
            <span className="uppercase font-semibold">{lang}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

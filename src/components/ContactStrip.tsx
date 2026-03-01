import React from 'react';
import { Phone, Mail } from 'lucide-react';
import type { Translator } from '../i18n/types';

type ContactStripProps = {
  t: Translator;
};

export function ContactStrip({ t }: ContactStripProps) {
  return (
    <div className="bg-terracotta text-white py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">{t('hero.subtitle')}</h3>
            <p className="text-white/90">Vălcineț, Călărași</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:060588845"
              className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              <span>060588845</span>
            </a>
            <a
              href="mailto:gradinamarioarei@gmail.com"
              className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

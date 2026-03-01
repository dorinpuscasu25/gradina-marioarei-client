import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function ContactPage({ t }: I18nProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <SectionHeading title={t('contact.title')} subtitle="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm flex items-start space-x-4">
                <div className="bg-forest/10 p-3 rounded-full text-forest">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest-dark mb-2">{t('contact.address_label')}</h3>
                  <p className="text-stone-dark">{t('contact.address_val')}</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex items-start space-x-4">
                <div className="bg-forest/10 p-3 rounded-full text-forest">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest-dark mb-2">{t('contact.phone_label')}</h3>
                  <a href="tel:060588845" className="text-stone-dark hover:text-terracotta transition-colors">
                    060588845
                  </a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm flex items-start space-x-4">
                <div className="bg-forest/10 p-3 rounded-full text-forest">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest-dark mb-2">{t('contact.email_label')}</h3>
                  <a href="mailto:gradinamarioarei@gmail.com" className="text-stone-dark hover:text-terracotta transition-colors">
                    gradinamarioarei@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} width="100%">
            <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg border border-stone-light/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1939.7998114901357!2d28.127696051050208!3d47.26903757367802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cbaf0575e7cb31%3A0x79b8f18904674bdc!2sPensiunea%20Agroturistica%20Gradina%20Marioarei!5e1!3m2!1sen!2s!4v1772389410056!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

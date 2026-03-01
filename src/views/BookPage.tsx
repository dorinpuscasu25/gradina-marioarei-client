import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BookingForm } from '../components/BookingForm';
import { ScrollReveal } from '../components/ScrollReveal';
import type { I18nProps } from '../i18n/types';

export function BookPage({ t }: I18nProps) {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-cream">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title={t('booking.title')} subtitle="Reservations" />

          <ScrollReveal width="100%">
            <div className="max-w-2xl mx-auto">
              <BookingForm
                labels={{
                  title: t('booking.title'),
                  subtitle: t('booking.subtitle'),
                  thankYou: t('booking.thank_you'),
                  success: t('booking.success'),
                  sendAnother: t('booking.send_another'),
                  checkin: t('booking.checkin'),
                  checkout: t('booking.checkout'),
                  guests: t('booking.guests'),
                  unit: t('booking.unit'),
                  selectUnit: t('booking.select_unit'),
                  name: t('booking.name'),
                  phone: t('booking.phone'),
                  email: t('booking.email'),
                  notes: t('booking.notes'),
                  submit: t('booking.submit'),
                  sending: t('booking.sending')
                }}
              />

              <div className="mt-12 text-center text-stone-dark text-sm">
                <p>{t('booking.prefer_phone')}</p>
                <a href="tel:060588845" className="text-terracotta font-bold text-lg hover:underline mt-2 inline-block">
                  060588845
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

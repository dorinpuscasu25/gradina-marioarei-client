'use client';

import React, { useState } from 'react';
import { Calendar, Users, Home, MessageSquare, CheckCircle } from 'lucide-react';
import type { BookingUnit } from '@/src/lib/cms/types';

type BookingFormProps = {
  units: BookingUnit[];
  labels: {
    title: string;
    subtitle: string;
    thankYou: string;
    success: string;
    sendAnother: string;
    checkin: string;
    checkout: string;
    guests: string;
    unit: string;
    selectUnit: string;
    name: string;
    phone: string;
    email: string;
    notes: string;
    submit: string;
    sending: string;
  };
};

export function BookingForm({ labels, units }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const selectedUnit = units.find((unit) => unit.id === form.get('accommodation_id'));
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accommodation_id: form.get('accommodation_id'),
        unit_label: selectedUnit ? `${selectedUnit.title} - ${selectedUnit.price}` : '',
        checkin: form.get('checkin'),
        checkout: form.get('checkout'),
        guests: form.get('guests'),
        full_name: form.get('full_name'),
        phone: form.get('phone'),
        email: form.get('email'),
        notes: form.get('notes')
      })
    });

    if (response.ok) {
      setLoading(false);
      setSubmitted(true);
      e.currentTarget.reset();
      return;
    }

    const json = await response.json().catch(() => ({}));
    setError(json.error ?? 'Cererea nu a putut fi trimisă.');
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-forest/10 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-forest mb-4">{labels.thankYou}</h3>
        <p className="text-stone-dark mb-6">{labels.success}</p>
        <button onClick={() => setSubmitted(false)} className="text-terracotta font-medium hover:underline">
          {labels.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-t-4 border-terracotta">
      <h3 className="text-2xl font-serif font-bold text-forest-dark mb-2">{labels.title}</h3>
      <p className="text-stone-dark mb-6 text-sm">{labels.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.checkin}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-stone" />
              <input
                name="checkin"
                type="date"
                required
                className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.checkout}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-stone" />
              <input
                name="checkout"
                type="date"
                required
                className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.guests}</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-stone" />
              <select name="guests" className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all bg-white">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.unit}</label>
            <div className="relative">
              <Home className="absolute left-3 top-3 w-4 h-4 text-stone" />
              <select name="accommodation_id" className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all bg-white">
                <option value="">{labels.selectUnit}</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title} - {unit.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-dark mb-1">{labels.name}</label>
          <input
            name="full_name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.phone}</label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="060588845"
              className="w-full px-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.email}</label>
            <input
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              className="w-full px-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-dark mb-1">{labels.notes}</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-stone" />
            <textarea
              name="notes"
              rows={3}
              className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={loading} className="w-full btn-primary mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? labels.sending : labels.submit}
        </button>
      </form>
    </div>
  );
}

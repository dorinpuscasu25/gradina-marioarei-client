'use client';

import React, { useState } from 'react';
import { Calendar, Users, Home, MessageSquare, CheckCircle } from 'lucide-react';

type BookingFormProps = {
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

export function BookingForm({ labels }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
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
              <select className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all bg-white">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.unit}</label>
            <div className="relative">
              <Home className="absolute left-3 top-3 w-4 h-4 text-stone" />
              <select className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all bg-white">
                <option value="">{labels.selectUnit}</option>
                <option value="vila">Vila Mare - 7500 lei</option>
                <option value="beci1">Căsuța tip Beci - 2000 lei</option>
                <option value="beci2">Căsuța tip Beci 2 - 1500 lei</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-dark mb-1">{labels.name}</label>
          <input
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
              type="tel"
              required
              placeholder="060588845"
              className="w-full px-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-dark mb-1">{labels.email}</label>
            <input
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
              rows={3}
              className="w-full pl-10 pr-4 py-2 border border-stone-light rounded focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full btn-primary mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? labels.sending : labels.submit}
        </button>
      </form>
    </div>
  );
}

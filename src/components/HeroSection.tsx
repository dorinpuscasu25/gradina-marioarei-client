'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';

const heroImages = ['/colage1.jpg', '/colage2.jpg', '/colage4.jpg'];

type HeroSectionProps = {
  lang: 'ro' | 'ru' | 'en';
  welcome: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge?: string;
  phone?: string;
  images?: string[];
};

export function HeroSection({
  lang,
  welcome,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  badge = 'Vălcineț, Moldova',
  phone = '060588845',
  images = heroImages
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Pensiunea Grădina Mărioarei"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium tracking-wider uppercase mb-6 border border-white/30">
            {badge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
            {welcome}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/book`}
              className="w-full sm:w-auto px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {ctaPrimary}
            </Link>
            <a
              href={`tel:${phone}`}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-md font-medium text-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {ctaSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
const images = ["/ciubar.jpg", "/ciubar2.jpg", "/zona_pentru_rug.jpg", "/casamare.jpg", "/casa_mare_interior.jpg", "/Screenshot_2026-02-11_at_22.28.27.png", "/Screenshot_2026-02-11_at_22.28.32.png", "/Screenshot_2026-02-11_at_22.28.43.png"];









export function GalleryGrid({ items = images }: { items?: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const close = useCallback(() => setSelectedIndex(null), []);
  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
    prev !== null ? (prev + 1) % items.length : null
    );
  }, [items.length]);
  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
    prev !== null ? (prev - 1 + items.length) % items.length : null
    );
  }, [items.length]);
  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, close, goNext, goPrev]);
  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((src, idx) =>
        <ScrollReveal key={idx} delay={idx * 0.1}>
            <div
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
            onClick={() => setSelectedIndex(idx)}>

              <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  🔍 Click to enlarge
                </span>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null &&
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.25
          }}>

            {/* Backdrop */}
            <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={close} />


            {/* Close button */}
            <button
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close">

              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium">
              {selectedIndex + 1} / {items.length}
            </div>

            {/* Prev button */}
            <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image">

              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
            key={selectedIndex}
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            initial={{
              scale: 0.9,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.9,
              opacity: 0
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}
            onClick={(e) => e.stopPropagation()}>

              <img
              src={items[selectedIndex]}
              alt={`Gallery image ${selectedIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />

            </motion.div>

            {/* Next button */}
            <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image">

              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}

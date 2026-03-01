import React from 'react';
import { ScrollReveal } from './ScrollReveal';
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}
export function SectionHeading({
  title,
  subtitle,
  center = true,
  className = ''
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      width="100%"
      className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>

      {subtitle &&
      <span className="block text-terracotta font-medium tracking-wider text-sm uppercase mb-3">
          {subtitle}
        </span>
      }
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-forest-dark mb-4">
        {title}
      </h2>
      <div
        className={`h-1 w-20 bg-terracotta/30 rounded-full mt-4 ${center ? 'mx-auto' : ''}`} />

    </ScrollReveal>);

}
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';

type HeaderLabels = {
  home: string;
  accommodation: string;
  experiences: string;
  discover: string;
  about: string;
  contact: string;
  book: string;
  language: string;
};

type HeaderProps = {
  lang: 'ro' | 'ru' | 'en';
  labels: HeaderLabels;
};

export function Header({ lang, labels }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: `/${lang}`, label: labels.home },
    { path: `/${lang}/accommodation`, label: labels.accommodation },
    { path: `/${lang}/experiences`, label: labels.experiences },
    { path: `/${lang}/discover`, label: labels.discover },
    { path: `/${lang}/about`, label: labels.about },
    { path: `/${lang}/contact`, label: labels.contact }
  ];

  const isHome = pathname === `/${lang}/` || pathname === `/${lang}`;

  const handleLangSwitch = (newLang: 'ro' | 'ru' | 'en') => {
    const newPath = pathname.match(/^\/(ro|ru|en)(\/|$)/)
      ? pathname.replace(/^\/(ro|ru|en)(?=\/|$)/, `/${newLang}`)
      : `/${newLang}${pathname === '/' ? '' : pathname}`;

    setIsOpen(false);
    router.push(newPath);
  };

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`;
  const textClass = scrolled || !isHome ? 'text-forest-dark' : 'text-forest-dark md:text-white';
  const logoClass = scrolled || !isHome ? 'text-forest-dark' : 'text-forest-dark md:text-white';
  const buttonClass =
    scrolled || !isHome
      ? 'bg-forest text-white hover:bg-forest-light'
      : 'bg-white text-forest hover:bg-gray-100';

  return (
    <header className={headerClass}>
      <div className="container-custom flex justify-between items-center">
        <Link href={`/${lang}`} className={`text-2xl font-serif font-bold tracking-tight ${logoClass}`}>
          Pensiunea Grădina Mărioarei
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={`text-sm font-medium hover:opacity-80 transition-opacity ${textClass}`}>
              {link.label}
            </Link>
          ))}

          <div className="relative group">
            <button className={`flex items-center space-x-1 text-sm font-medium ${textClass}`}>
              <Globe className="w-4 h-4" />
              <span className="uppercase">{lang}</span>
            </button>
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
              {(['ro', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`block w-full text-left px-4 py-2 text-sm ${lang === l ? 'bg-gray-50 text-forest font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Link href={`/${lang}/book`} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md ${buttonClass}`}>
            {labels.book}
          </Link>
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded-md text-forest-dark"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream shadow-xl border-t border-stone-light py-4 px-4 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-forest-dark py-2 border-b border-stone-light/30"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center justify-between py-2 border-b border-stone-light/30">
            <span className="text-stone-dark font-medium">{labels.language}</span>
            <div className="flex space-x-4">
              {(['ro', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangSwitch(l)}
                  className={`text-sm font-bold uppercase ${lang === l ? 'text-forest' : 'text-stone'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Link href={`/${lang}/book`} onClick={() => setIsOpen(false)} className="w-full text-center btn-primary mt-4">
            {labels.book}
          </Link>
        </div>
      )}
    </header>
  );
}

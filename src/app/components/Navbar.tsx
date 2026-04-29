'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { locales } from '@/i18n';
import { useTheme } from './ThemeProvider';
import BrandLogo from './BrandLogo';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN', fr: 'FR', es: 'ES', de: 'DE', pt: 'PT',
};

function Flag({ code }: { code: string }) {
  const flags: Record<string, React.ReactNode> = {
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 32" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="60" height="32" fill="#B22234"/>
        <rect y="2.46" width="60" height="2.46" fill="#fff"/>
        <rect y="7.38" width="60" height="2.46" fill="#fff"/>
        <rect y="12.31" width="60" height="2.46" fill="#fff"/>
        <rect y="17.23" width="60" height="2.46" fill="#fff"/>
        <rect y="22.15" width="60" height="2.46" fill="#fff"/>
        <rect y="27.08" width="60" height="2.46" fill="#fff"/>
        <rect width="24" height="17.23" fill="#3C3B6E"/>
        <g fill="#fff">
          <circle cx="2" cy="1.7" r="1.1"/><circle cx="6.8" cy="1.7" r="1.1"/><circle cx="11.6" cy="1.7" r="1.1"/><circle cx="16.4" cy="1.7" r="1.1"/><circle cx="21.2" cy="1.7" r="1.1"/>
          <circle cx="4.4" cy="5.1" r="1.1"/><circle cx="9.2" cy="5.1" r="1.1"/><circle cx="14" cy="5.1" r="1.1"/><circle cx="18.8" cy="5.1" r="1.1"/>
          <circle cx="2" cy="8.5" r="1.1"/><circle cx="6.8" cy="8.5" r="1.1"/><circle cx="11.6" cy="8.5" r="1.1"/><circle cx="16.4" cy="8.5" r="1.1"/><circle cx="21.2" cy="8.5" r="1.1"/>
          <circle cx="4.4" cy="11.9" r="1.1"/><circle cx="9.2" cy="11.9" r="1.1"/><circle cx="14" cy="11.9" r="1.1"/><circle cx="18.8" cy="11.9" r="1.1"/>
          <circle cx="2" cy="15.3" r="1.1"/><circle cx="6.8" cy="15.3" r="1.1"/><circle cx="11.6" cy="15.3" r="1.1"/><circle cx="16.4" cy="15.3" r="1.1"/><circle cx="21.2" cy="15.3" r="1.1"/>
        </g>
      </svg>
    ),
    us: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 32" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="60" height="32" fill="#B22234"/>
        <path d="M0 2.46h60M0 7.38h60M0 12.31h60M0 17.23h60M0 22.15h60M0 27.08h60" stroke="#fff" strokeWidth="2.46"/>
        <rect width="24" height="17.23" fill="#3C3B6E"/>
        <g fill="#fff">
          {[...Array(5)].map((_,r)=>[...Array(r%2===0?6:5)].map((_,c)=>(
            <circle key={`${r}-${c}`} cx={(r%2===0?2:4.4)+c*4.8} cy={1.7+r*3.4} r="1"/>
          )))}
        </g>
      </svg>
    ),
    fr: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="1" height="2" fill="#002395"/>
        <rect x="1" width="1" height="2" fill="#fff"/>
        <rect x="2" width="1" height="2" fill="#ED2939"/>
      </svg>
    ),
    es: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="3" height="2" fill="#c60b1e"/>
        <rect y=".5" width="3" height="1" fill="#ffc400"/>
      </svg>
    ),
    de: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="5" height="3" fill="#ffce00"/>
        <rect width="5" height="2" fill="#d00"/>
        <rect width="5" height="1" fill="#000"/>
      </svg>
    ),
    pt: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-[13px] rounded-sm overflow-hidden">
        <rect width="900" height="600" fill="#f00"/>
        <rect width="360" height="600" fill="#060"/>
        <circle cx="360" cy="300" r="90" fill="#ff0" stroke="#00f" strokeWidth="20"/>
      </svg>
    ),
  };
  return <span className="inline-flex items-center shrink-0">{flags[code] ?? null}</span>;
}

const NAV_KEYS = ['about', 'services', 'skills', 'projects', 'pricing'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { theme, toggle } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchLocale = (next: string) => {
    setLangOpen(false);
    window.location.href = next === 'en' ? '/' : `/${next}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--navbar-scrolled)] backdrop-blur-md py-3 shadow-xl border-b border-[var(--border-color)]'
          : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <BrandLogo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="px-4 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-colors"
              >
                {t(key)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 transition-transform inline-block"
            >
              {t('hire')}
            </a>
          </li>

          {/* Theme toggle */}
          <li>
            <button
              onClick={toggle}
              className="ml-1 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </li>

          {/* Language switcher */}
          <li className="relative ml-1" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-colors"
              aria-label="Switch language"
            >
              <Flag code={locale} />
              <span>{LOCALE_LABELS[locale]}</span>
              <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-xl min-w-[110px]">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                      loc === locale ? 'text-cyan-500' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    <Flag code={loc} />
                    <span>{LOCALE_LABELS[loc]}</span>
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile right: hire + theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white gradient-bg shadow-md shadow-indigo-500/25 hover:-translate-y-0.5 transition-transform"
            onClick={() => setMenuOpen(false)}
          >
            {t('hire')}
          </a>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--text-primary)] rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--navbar-scrolled)] backdrop-blur-md border-b border-[var(--border-color)] px-6 py-2">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="block py-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-medium transition-colors border-b border-[var(--border-color)]"
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a
            href="#contact"
            className="block py-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-medium transition-colors border-b border-[var(--border-color)]"
            onClick={() => setMenuOpen(false)}
          >
            {t('hire')}
          </a>
          <div className="py-3 flex flex-wrap gap-2">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  loc === locale
                    ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/40'
                    : 'bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Flag code={loc} />
                <span>{LOCALE_LABELS[loc]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

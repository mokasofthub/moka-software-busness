'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  { key: 'about',      icon: '👤', href: '#about' },
  { key: 'services',  icon: '🔧', href: '#services' },
  { key: 'projects',  icon: '📂', href: '#projects' },
  { key: 'monitoring', icon: '📊', href: '#monitoring' },
  { key: 'pricing',   icon: '💰', href: '#pricing' },
  { key: 'hire',      icon: '✉️', href: '#contact' },
] as const;

export default function BottomNav() {
  const t = useTranslations('nav');
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = ['about', 'services', 'skills', 'monitoring', 'projects', 'pricing', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--navbar-scrolled)] backdrop-blur-md border-t border-[var(--border-color)] px-2 pb-safe">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(({ key, icon, href }) => {
          const sectionId = key === 'hire' ? 'contact' : key;
          const isActive = active === sectionId;
          return (
            <a
              key={key}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-3 px-3 min-w-0 flex-1 transition-colors ${
                isActive ? 'text-cyan-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[10px] font-medium truncate w-full text-center">{t(key)}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

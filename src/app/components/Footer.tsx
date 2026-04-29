'use client';
import { useTranslations } from 'next-intl';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] py-9 pb-24 md:pb-9">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <BrandLogo />
        <p className="text-[var(--text-muted)] text-sm">
          {t('rights')}
        </p>
        <div className="flex gap-5">
          {(['about', 'services', 'pricing', 'contact'] as const).map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors capitalize"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

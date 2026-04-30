'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

export default function About() {
  const t = useTranslations('about');
  const tags = t.raw('tags') as string[];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[var(--bg-section)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-center">

          {/* Visual */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar with animated glow ring */}
            <div className="relative group/avatar">
              <div className="w-44 h-44 rounded-full overflow-hidden avatar-glow border-2 border-cyan-400/40 relative group-hover/avatar:scale-[1.03] transition-transform duration-500">
                <Image
                  src="/images/profile.png"
                  alt="Bernard D. Mokalo"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              {/* Floating "Available" badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full px-3 py-1 text-xs font-semibold text-emerald-400 shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Available
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-[var(--text-muted)] bg-[var(--input-bg)] border border-[var(--border-color)] px-3 py-1.5 rounded-full hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">
              {t('label')}
            </p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight mb-5">
              {t('headline')}
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-4">
              {t('p1')}
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-8">
              {t('p2')}
            </p>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: '📍', text: t('fact_location') },
                { icon: '🕐', text: t('fact_turnaround') },
                { icon: '🤝', text: t('fact_partnership') },
              ].map(({ icon, text }) => (
                <Card3D
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2.5 rounded-xl hover:border-indigo-400/40 hover:text-[var(--text-secondary)] transition-colors cursor-default"
                >
                  <span className="text-base shrink-0">{icon}</span>
                  <span>{text}</span>
                </Card3D>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-block px-7 py-3.5 rounded-full font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transition-transform"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

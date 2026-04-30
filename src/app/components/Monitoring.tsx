'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const TECH_BADGES = [
  { label: 'AWS ECS',    color: 'bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-400' },
  { label: 'CloudFront', color: 'bg-sky-500/10 border-sky-500/40 text-sky-700 dark:text-sky-400' },
  { label: 'CloudWatch', color: 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-400' },
  { label: 'Grafana',    color: 'bg-orange-400/10 border-orange-400/40 text-orange-700 dark:text-orange-300' },
  { label: 'Jenkins',    color: 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-400' },
  { label: 'Docker',     color: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-700 dark:text-cyan-400' },
  { label: 'Fargate',    color: 'bg-violet-500/10 border-violet-500/40 text-violet-700 dark:text-violet-400' },
];

const HIGHLIGHT_ICONS = ['🚀', '🔁', '📊', '🔔'] as const;

export default function Monitoring() {
  const t = useTranslations('monitoring');
  const { ref, visible } = useInView();

  const fadeUp = (delay: number) =>
    `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
    + ` [transition-delay:${delay}ms]`;

  return (
    <section id="monitoring" className="py-16 sm:py-24 px-4 bg-[var(--bg-section)]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 ${fadeUp(0)}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-green-500/10 border border-green-600/30 text-green-700 dark:text-green-400 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Card */}
        <div className={`relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--card-shadow)] overflow-hidden ${fadeUp(150)}`}>
          {/* Animated top gradient strip */}
          <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-sky-400 to-violet-500 bg-[length:200%_100%] animate-[gradient-shift_4s_ease_infinite]" />

          <div className="p-5 sm:p-8 md:p-10">
            {/* Tech badges — staggered */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {TECH_BADGES.map((b, i) => (
                <span
                  key={b.label}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${b.color} transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}`}
                  style={{ transitionDelay: `${250 + i * 60}ms` }}
                >
                  {b.label}
                </span>
              ))}
            </div>

            {/* Highlights grid — staggered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {HIGHLIGHT_ICONS.map((icon, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${500 + i * 100}ms` }}
                >
                  <span className="text-lg sm:text-xl mt-0.5 shrink-0">{icon}</span>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{t(`highlight_${i + 1}` as `highlight_${1 | 2 | 3 | 4}`)}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`${fadeUp(900)}`}>
              <a
                href="https://mokasoftwarebusness.grafana.net/public-dashboards/dbed62c3868144f19ad729f899a32f78"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-sky-500 hover:from-orange-400 hover:to-sky-400 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-md hover:shadow-orange-500/30 w-full sm:w-auto justify-center sm:justify-start"
              >
                <span>{t('cta')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

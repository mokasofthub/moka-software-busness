'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

interface ServiceItem {
  title: string;
  description: string;
}

const SERVICE_ICONS = [
  '🔄', '☁️', '☸️', '🌐', '📱', '🔌',
  '📐', '📊', '🔒', '🗄️', '⚡', '👥',
];

const SERVICE_CONFIG = [
  { from: 'from-violet-500', to: 'to-indigo-500',  bg: 'bg-violet-500/10',  text: 'text-violet-400',  glow: 'shadow-violet-500/20',  border: 'hover:border-violet-500/40'  },
  { from: 'from-sky-400',    to: 'to-cyan-500',    bg: 'bg-sky-500/10',     text: 'text-sky-400',     glow: 'shadow-sky-400/20',     border: 'hover:border-sky-400/40'     },
  { from: 'from-blue-500',   to: 'to-indigo-500',  bg: 'bg-blue-500/10',    text: 'text-blue-400',    glow: 'shadow-blue-500/20',    border: 'hover:border-blue-500/40'    },
  { from: 'from-emerald-500',to: 'to-teal-400',    bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/20', border: 'hover:border-emerald-400/40' },
  { from: 'from-orange-400', to: 'to-amber-400',   bg: 'bg-orange-500/10',  text: 'text-orange-400',  glow: 'shadow-orange-400/20',  border: 'hover:border-orange-400/40'  },
  { from: 'from-pink-500',   to: 'to-rose-400',    bg: 'bg-pink-500/10',    text: 'text-pink-400',    glow: 'shadow-pink-500/20',    border: 'hover:border-pink-400/40'    },
  { from: 'from-purple-500', to: 'to-violet-400',  bg: 'bg-purple-500/10',  text: 'text-purple-400',  glow: 'shadow-purple-500/20',  border: 'hover:border-purple-400/40'  },
  { from: 'from-indigo-500', to: 'to-blue-400',    bg: 'bg-indigo-500/10',  text: 'text-indigo-400',  glow: 'shadow-indigo-500/20',  border: 'hover:border-indigo-400/40'  },
  { from: 'from-rose-500',   to: 'to-pink-400',    bg: 'bg-rose-500/10',    text: 'text-rose-400',    glow: 'shadow-rose-500/20',    border: 'hover:border-rose-400/40'    },
  { from: 'from-teal-500',   to: 'to-emerald-400', bg: 'bg-teal-500/10',    text: 'text-teal-400',    glow: 'shadow-teal-500/20',    border: 'hover:border-teal-400/40'    },
  { from: 'from-amber-500',  to: 'to-yellow-400',  bg: 'bg-amber-500/10',   text: 'text-amber-400',   glow: 'shadow-amber-500/20',   border: 'hover:border-amber-400/40'   },
  { from: 'from-cyan-500',   to: 'to-sky-400',     bg: 'bg-cyan-500/10',    text: 'text-cyan-400',    glow: 'shadow-cyan-500/20',    border: 'hover:border-cyan-400/40'    },
] as const;

function ServiceCard({ s, i, cfg, animated = true }: {
  s: ServiceItem;
  i: number;
  cfg: typeof SERVICE_CONFIG[number];
  animated?: boolean;
}) {
  const animClass = animated ? `card-enter ${['', 'card-enter-d1', 'card-enter-d2'][i % 3]}` : '';
  return (
    <Card3D
      className={`service-card ${animClass} group relative bg-[var(--bg-card)] border border-[var(--border-color)] ${cfg.border} shadow-[var(--card-shadow)] overflow-hidden transition-colors duration-300 flex flex-col`}
    >
      {/* Left neon accent bar */}
      <div className={`absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b ${cfg.from} ${cfg.to} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Scanline sweep on hover */}
      <div className="absolute left-[2px] right-0 h-16 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent -translate-y-16 group-hover:translate-y-[400px] transition-transform duration-700 ease-in-out pointer-events-none" />

      {/* BG gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.from} ${cfg.to} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`} />

      {/* Corner brackets — top-right */}
      <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r border-current ${cfg.text} opacity-20 group-hover:opacity-70 transition-opacity duration-300`} />
      {/* Corner brackets — bottom-left (offset past the accent bar) */}
      <div className={`absolute bottom-3 left-5 w-4 h-4 border-b border-l border-current ${cfg.text} opacity-10 group-hover:opacity-50 transition-opacity duration-300`} />

      <div className="relative z-10 p-5 pl-7 flex flex-col flex-1">
        {/* Icon + index */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-10 h-10 flex items-center justify-center text-lg ${cfg.bg} border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300`}>
            <span>{SERVICE_ICONS[i % SERVICE_ICONS.length]}</span>
          </div>
          <span className={`font-mono text-[10px] tracking-[0.2em] ${cfg.text} opacity-25 group-hover:opacity-60 transition-opacity duration-300 mt-1`}>
            {'//'+String(i + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-[var(--text-primary)] text-[0.95rem] mb-1.5 leading-snug">
          {s.title}
        </h3>

        {/* Accent line — grows on hover */}
        <div className={`h-px w-6 bg-gradient-to-r ${cfg.from} ${cfg.to} mb-3.5 group-hover:w-14 transition-all duration-300`} />

        {/* Description */}
        <p className="text-[var(--text-muted)] text-xs leading-relaxed flex-1">{s.description}</p>

        {/* Status row — no useless arrow, just a pinging dot + data line */}
        <div className={`flex items-center gap-2.5 mt-4 pt-3 border-t border-[var(--border-color)] ${cfg.text}`}>
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current opacity-35 group-hover:opacity-90 transition-opacity duration-300" />
          </span>
          <div className={`flex-1 h-px bg-gradient-to-r ${cfg.from} ${cfg.to} opacity-15 group-hover:opacity-35 transition-opacity duration-300`} />
          <span className="font-mono text-[8px] tracking-widest opacity-20 group-hover:opacity-50 transition-opacity duration-300 uppercase">SYS</span>
        </div>
      </div>
    </Card3D>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const rawItems = t.raw('items') as ServiceItem[];
  const [expanded, setExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const VISIBLE = 6;
  const hiddenCount = rawItems.length - VISIBLE;
  const gridRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.service-card:not(.visible)');
    if (!cards?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 text-center">
          {t('label')}
        </p>
        <h2 className="font-heading font-bold text-4xl text-[var(--text-primary)] text-center mb-3">
          {t('headline')}
        </h2>
        <p className="text-[var(--text-muted)] text-center max-w-xl mx-auto mb-12">
          {t('subheading')}
        </p>

        {/* ── Mobile: horizontal snap carousel ───────────────────────────── */}
        <div
          ref={carouselRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardWidth = el.scrollWidth / rawItems.length;
            setActiveSlide(Math.round(el.scrollLeft / cardWidth));
          }}
          className="md:hidden -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rawItems.map((s, i) => {
            const cfg = SERVICE_CONFIG[i % SERVICE_CONFIG.length];
            return (
              <div key={i} className="carousel-card snap-start shrink-0 w-[88vw] max-w-[340px]">
                <div className="carousel-card-inner relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden flex flex-col">
                  {/* Gradient header */}
                  <div className="relative h-[72px] flex items-center px-5">
                    <div className={`absolute inset-0 bg-gradient-to-r ${cfg.from} ${cfg.to} opacity-[0.12]`} />
                    <div className={`relative w-11 h-11 flex items-center justify-center text-xl ${cfg.bg} rounded-xl border border-white/10 shrink-0`}>
                      {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    </div>
                    <span className={`absolute top-3 right-4 font-mono text-[10px] tracking-[0.2em] ${cfg.text} opacity-40`}>
                      {'//'+String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`absolute top-2 right-12 w-3 h-3 border-t border-r border-current ${cfg.text} opacity-25`} />
                    <div className={`absolute bottom-2 left-16 w-3 h-3 border-b border-l border-current ${cfg.text} opacity-15`} />
                  </div>
                  {/* Divider */}
                  <div className={`h-px mx-5 bg-gradient-to-r ${cfg.from} ${cfg.to} opacity-20`} />
                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-heading font-semibold text-[var(--text-primary)] text-[0.95rem] leading-snug">{s.title}</h3>
                    <div className={`h-px w-8 bg-gradient-to-r ${cfg.from} ${cfg.to}`} />
                    <p className="text-[var(--text-muted)] text-xs leading-relaxed">{s.description}</p>
                    <div className={`flex items-center gap-2 mt-2 pt-3 border-t border-[var(--border-color)] ${cfg.text}`}>
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current opacity-80" />
                      </span>
                      <div className={`flex-1 h-px bg-gradient-to-r ${cfg.from} ${cfg.to} opacity-25`} />
                      <span className="font-mono text-[8px] tracking-widest opacity-40 uppercase">SYS</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-4" />
        </div>

        {/* ── Segmented indicator ── */}
        <div className="md:hidden flex items-center justify-center gap-3 mt-4 mb-1">
          <div className="flex gap-1 items-center">
            {rawItems.map((_, i) => (
              <span key={i} className={`block h-[3px] rounded-full transition-all duration-300 ${
                i === activeSlide
                  ? 'w-7 bg-cyan-400 shadow-[0_0_8px] shadow-cyan-400/60'
                  : Math.abs(i - activeSlide) === 1
                  ? 'w-2 bg-cyan-400/30'
                  : 'w-1.5 bg-[var(--border-color)]'
              }`} />
            ))}
          </div>
          <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]/50">
            {String(activeSlide + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(rawItems.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Desktop: grid with expand/collapse ──────────────────────────── */}
        <div ref={gridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawItems.slice(0, VISIBLE).map((s, i) => {
            const cfg = SERVICE_CONFIG[i % SERVICE_CONFIG.length];
            return <ServiceCard key={i} s={s} i={i} cfg={cfg} />;
          })}
        </div>

        {hiddenCount > 0 && (
          <div
            ref={extraRef}
            className="hidden md:block overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
            style={{ maxHeight: expanded ? '4000px' : '0px', opacity: expanded ? 1 : 0 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {rawItems.slice(VISIBLE).map((s, j) => {
                const i = VISIBLE + j;
                const cfg = SERVICE_CONFIG[i % SERVICE_CONFIG.length];
                return <ServiceCard key={i} s={s} i={i} cfg={cfg} animated={false} />;
              })}
            </div>
          </div>
        )}

        {hiddenCount > 0 && (
          <div className="hidden md:flex mt-10 justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--border-color)] text-sm font-semibold text-[var(--text-muted)] hover:border-cyan-400/50 hover:text-cyan-400 bg-[var(--bg-card)] shadow-[var(--card-shadow)] transition-all duration-300"
            >
              {expanded ? (
                <>
                  {t('show_less')}
                  <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  {t('show_more', { count: hiddenCount })}
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}



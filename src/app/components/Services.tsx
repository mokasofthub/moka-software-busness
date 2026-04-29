'use client';
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

// Each service gets its own accent color palette
const SERVICE_CONFIG = [
  { from: 'from-violet-500', to: 'to-indigo-500',  bg: 'bg-violet-500/10', text: 'text-violet-500', hoverBorder: 'hover:border-violet-500/40' },
  { from: 'from-sky-400',    to: 'to-cyan-500',    bg: 'bg-sky-500/10',    text: 'text-sky-400',    hoverBorder: 'hover:border-sky-400/40'    },
  { from: 'from-blue-500',   to: 'to-indigo-500',  bg: 'bg-blue-500/10',   text: 'text-blue-400',   hoverBorder: 'hover:border-blue-500/40'   },
  { from: 'from-emerald-500',to: 'to-teal-400',    bg: 'bg-emerald-500/10',text: 'text-emerald-500',hoverBorder: 'hover:border-emerald-400/40' },
  { from: 'from-orange-400', to: 'to-amber-400',   bg: 'bg-orange-500/10', text: 'text-orange-400', hoverBorder: 'hover:border-orange-400/40' },
  { from: 'from-pink-500',   to: 'to-rose-400',    bg: 'bg-pink-500/10',   text: 'text-pink-400',   hoverBorder: 'hover:border-pink-400/40'   },
  { from: 'from-purple-500', to: 'to-violet-400',  bg: 'bg-purple-500/10', text: 'text-purple-400', hoverBorder: 'hover:border-purple-400/40' },
  { from: 'from-indigo-500', to: 'to-blue-400',    bg: 'bg-indigo-500/10', text: 'text-indigo-400', hoverBorder: 'hover:border-indigo-400/40' },
  { from: 'from-rose-500',   to: 'to-pink-400',    bg: 'bg-rose-500/10',   text: 'text-rose-400',   hoverBorder: 'hover:border-rose-400/40'   },
  { from: 'from-teal-500',   to: 'to-emerald-400', bg: 'bg-teal-500/10',   text: 'text-teal-400',   hoverBorder: 'hover:border-teal-400/40'   },
  { from: 'from-amber-500',  to: 'to-yellow-400',  bg: 'bg-amber-500/10',  text: 'text-amber-400',  hoverBorder: 'hover:border-amber-400/40'  },
  { from: 'from-cyan-500',   to: 'to-sky-400',     bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   hoverBorder: 'hover:border-cyan-400/40'   },
] as const;

export default function Services() {
  const t = useTranslations('services');
  const rawItems = t.raw('items') as ServiceItem[];

  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 text-center">
          {t('label')}
        </p>
        <h2 className="font-heading font-bold text-4xl text-[var(--text-primary)] text-center mb-3">
          {t('headline')}
        </h2>
        <p className="text-[var(--text-muted)] text-center max-w-xl mx-auto mb-14">
          {t('subheading')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawItems.map((s, i) => {
            const cfg = SERVICE_CONFIG[i % SERVICE_CONFIG.length];
            return (
              <Card3D
                key={i}
                className={`group relative bg-[var(--bg-card)] rounded-card p-8 border border-[var(--border-color)] ${cfg.hoverBorder} shadow-[var(--card-shadow)] overflow-hidden transition-all duration-300`}
              >
                {/* Color accent line — slides in on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.from} ${cfg.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon container */}
                <div className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center text-xl mb-5`}>
                  <span className={cfg.text}>{SERVICE_ICONS[i]}</span>
                </div>

                <h3 className="font-heading font-semibold text-[var(--text-primary)] text-lg mb-2.5">
                  {s.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {s.description}
                </p>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}

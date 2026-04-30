'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STATS = [
  { value: '10+', labelKey: 'stat_years' },
  { value: '60+', labelKey: 'stat_projects' },
  { value: '99.9%', labelKey: 'stat_uptime' },
  { value: '30+', labelKey: 'stat_clients' },
] as const;

const PIPELINE_STAGES = [
  { stage: 'build',    status: 'passed', pulse: false },
  { stage: 'test',     status: 'passed', pulse: false },
  { stage: 'security', status: 'passed', pulse: false },
  { stage: 'deploy',   status: 'live',   pulse: true  },
] as const;

const METRICS = [
  { label: 'CPU Usage',   pct: 18, color: 'bg-emerald-400' },
  { label: 'Memory',      pct: 42, color: 'bg-cyan-400'    },
  { label: 'Network I/O', pct: 67, color: 'bg-indigo-400'  },
] as const;

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-radial pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-center">

          {/* ── Left: content ── */}
          <div>
            {/* Badge */}
            <div className="badge-available inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
              <span className="badge-dot w-2 h-2 rounded-full animate-pulse-dot" />
              {t('badge')}
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[var(--text-primary)] mb-6 max-w-3xl">
              {t('headline1')}<br />
              <span className="gradient-text">{t('headline2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[var(--text-muted)] text-base font-semibold tracking-wide uppercase mb-3">
              {t('title')}
            </p>
            <p
              className="text-[var(--text-muted)] text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
              dangerouslySetInnerHTML={{ __html: t.raw('sub') as string }}
            />

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                className="px-7 py-3.5 rounded-full font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transition-transform"
              >
                {t('cta_primary')}
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full font-semibold text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-indigo-400 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all"
              >
                {t('cta_secondary')}
              </a>
            </div>

            {/* Stats — inline bar, no card borders */}
            <div className="flex flex-wrap gap-x-0 gap-y-4">
              {STATS.map((stat, i) => (
                <div key={stat.labelKey} className="flex items-center">
                  <div className="px-6 first:pl-0 text-center">
                    <span className="block font-heading font-bold text-2xl gradient-text">{stat.value}</span>
                    <p className="text-[var(--text-muted)] text-xs mt-0.5 leading-snug whitespace-nowrap">{t(stat.labelKey)}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <span className="w-px h-8 bg-[var(--border-color)] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: floating dashboard (xl+ only) ── */}
          <div className="hidden xl:flex flex-col gap-4 animate-float-slow">

            {/* Profile card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-[var(--card-shadow)] flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/50 shrink-0">
                <Image
                  src="/images/profile.png"
                  alt="Bernard D. Mokalo"
                  width={128}
                  height={102}
                  className="object-cover h-full"
                  style={{ marginLeft: '0px', marginTop: '0px' }}
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Bernard D. Mokalo</p>
                <p className="text-xs text-cyan-400 font-medium">Principal Engineer</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">DevOps · Cloud · Full-Stack</p>
              </div>
            </div>

            {/* Pipeline card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-[var(--card-shadow-hover)]">
              {/* Titlebar dots */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-[var(--text-muted)] text-xs ml-2 font-mono">deploy.pipeline.yml</span>
              </div>

              {/* Stages */}
              <div className="font-mono text-xs space-y-2.5">
                <p className="text-[var(--text-muted)]">
                  <span className="text-indigo-400">pipeline</span>:
                </p>
                {PIPELINE_STAGES.map(({ stage, status, pulse }) => (
                  <div key={stage} className="pl-4 flex items-center justify-between">
                    <span>
                      <span className="text-cyan-400">{stage}</span>:
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block${pulse ? ' animate-pulse' : ''}`} />
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">v2.14.1 · 2s ago</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  All systems operational
                </span>
              </div>
            </div>

            {/* Metrics card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 shadow-[var(--card-shadow)]">
              <p className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-widest mb-4">
                Infrastructure Health
              </p>
              <div className="space-y-3.5">
                {METRICS.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[var(--text-muted)]">{m.label}</span>
                      <span className="text-xs font-medium text-[var(--text-secondary)]">{m.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--input-bg)] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${m.color} rounded-full`}
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-9 rounded-xl border-2 border-[var(--border-color)] relative">
          <span className="absolute left-1/2 -translate-x-1/2 w-1 h-2 bg-cyan-400 rounded-sm animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}

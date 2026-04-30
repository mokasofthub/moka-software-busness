'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

interface Project {
  title: string;
  description: string;
  tech: string[];
}

interface CaseStudy {
  challenge: string;
  solution: string;
  outcome: string[];
}

const PROJECT_CONFIG = [
  {
    gradient: 'from-violet-600 via-indigo-500 to-cyan-400',
    tagBg: 'bg-violet-500/10 border-violet-400/30 text-violet-700 dark:text-violet-300',
    modalAccent: 'from-violet-600 via-indigo-500 to-cyan-400',
    labelKey: 'CI/CD',
  },
  {
    gradient: 'from-sky-500 via-cyan-400 to-teal-400',
    tagBg: 'bg-sky-500/10 border-sky-400/30 text-sky-700 dark:text-sky-300',
    modalAccent: 'from-sky-500 via-cyan-400 to-teal-400',
    labelKey: 'Web Platform',
  },
  {
    gradient: 'from-pink-500 via-rose-400 to-orange-300',
    tagBg: 'bg-pink-500/10 border-pink-400/30 text-pink-700 dark:text-pink-300',
    modalAccent: 'from-pink-500 via-rose-400 to-orange-300',
    labelKey: 'SaaS Backend',
  },
] as const;

function CaseStudyModal({
  project,
  caseStudy,
  config,
  t,
  onClose,
}: {
  project: Project;
  caseStudy: CaseStudy;
  config: typeof PROJECT_CONFIG[number];
  t: ReturnType<typeof useTranslations<'projects'>>;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className={`h-2 bg-gradient-to-r ${config.modalAccent} rounded-t-2xl`} />

        <div className="p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1 block">
                {config.labelKey}
              </span>
              <h3 className="font-heading font-bold text-2xl text-[var(--text-primary)]">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-indigo-400 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tag) => (
              <span key={tag} className={`text-xs border px-2.5 py-1 rounded-full ${config.tagBg}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Challenge */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              {t('modal_challenge')}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              {t('modal_solution')}
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          {/* Outcomes */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
              {t('modal_outcomes')}
            </p>
            <ul className="space-y-2.5">
              {caseStudy.outcome.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-[10px] font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="w-full block text-center py-3.5 rounded-full font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 transition-transform"
          >
            {t('modal_cta')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const t = useTranslations('projects');
  const rawItems = t.raw('items') as Project[];
  const caseStudies = t.raw('case_studies') as CaseStudy[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-24">
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

        {/* ── Mobile: horizontal snap carousel ── */}
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
          {rawItems.map((p, i) => {
            const cfg = PROJECT_CONFIG[i % PROJECT_CONFIG.length];
            return (
              <div
                key={i}
                className="carousel-card snap-center shrink-0 w-[88vw] max-w-[340px] relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden flex flex-col shadow-[var(--card-shadow)] carousel-card-inner"
              >
                {/* Gradient banner */}
                <div className={`h-28 bg-gradient-to-br ${cfg.gradient} relative flex items-end px-5 pb-4`}>
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-widest bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {cfg.labelKey}
                  </span>
                  <span className="absolute top-4 right-5 font-mono text-xs font-bold text-white/30">
                    {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(rawItems.length).padStart(2, '0')}
                  </span>
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")'
                  }} />
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col gap-2.5 flex-1">
                  <div className="flex gap-1.5 flex-wrap">
                    {p.tech.map((tag) => (
                      <span key={tag} className={`text-xs border px-2 py-0.5 rounded-full ${cfg.tagBg}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading font-semibold text-[var(--text-primary)] text-base leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1 line-clamp-3">
                    {p.description}
                  </p>
                  <button
                    onClick={() => setOpenIndex(i)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 mt-1"
                  >
                    {t('view_case_study')}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-4" />
        </div>

        {/* ── Segmented indicator ── */}
        <div className="md:hidden flex items-center justify-center gap-3 mt-4 mb-2">
          <div className="flex gap-1 items-center">
            {rawItems.map((_, i) => (
              <span key={i} className={`block h-[3px] rounded-full transition-all duration-300 ${
                i === activeSlide
                  ? 'w-7 bg-indigo-400 shadow-[0_0_8px] shadow-indigo-400/60'
                  : Math.abs(i - activeSlide) === 1
                  ? 'w-2 bg-indigo-400/30'
                  : 'w-1.5 bg-[var(--border-color)]'
              }`} />
            ))}
          </div>
          <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]/50">
            {String(activeSlide + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(rawItems.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-7">
          {rawItems.map((p, i) => {
            const cfg = PROJECT_CONFIG[i % PROJECT_CONFIG.length];
            return (
              <Card3D
                key={i}
                className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-card overflow-hidden flex flex-col shadow-[var(--card-shadow)] hover:border-indigo-500/30 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
              >
                {/* Gradient banner */}
                <div className={`h-28 bg-gradient-to-br ${cfg.gradient} relative flex items-end px-6 pb-4`}>
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-widest bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {cfg.labelKey}
                  </span>
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")'
                  }} />
                </div>
                {/* Content */}
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div className="flex gap-1.5 flex-wrap">
                    {p.tech.map((tag) => (
                      <span key={tag} className={`text-xs border px-2.5 py-0.5 rounded-full ${cfg.tagBg}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading font-semibold text-[var(--text-primary)] text-lg leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <button
                    onClick={() => setOpenIndex(i)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors mt-1 group/link"
                  >
                    {t('view_case_study')}
                    <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>

      {/* Case study modal */}
      {openIndex !== null && (
        <CaseStudyModal
          project={rawItems[openIndex]}
          caseStudy={caseStudies[openIndex % caseStudies.length]}
          config={PROJECT_CONFIG[openIndex % PROJECT_CONFIG.length]}
          t={t}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}


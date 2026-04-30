'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

type Tab = 'web' | 'engineering' | 'support';

interface CatalogCard {
  icon: string;
  title: string;
  description: string;
  items: string[];
  popular?: boolean;
}

const TABS: { id: Tab; labelKey: string }[] = [
  { id: 'web',         labelKey: 'tab_web' },
  { id: 'engineering', labelKey: 'tab_engineering' },
  { id: 'support',     labelKey: 'tab_support' },
];

function savePrefill(c: CatalogCard) {
  const data = {
    serviceHint: c.title,
    message: `${c.title}\n\n${c.description}`,
  };
  sessionStorage.setItem('contact_prefill', JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('contact:prefill', { detail: data }));
}

function CardGrid({
  cards,
  t,
}: {
  cards: CatalogCard[];
  t: ReturnType<typeof useTranslations<'pricing'>>;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Mobile: horizontal snap carousel ── */}
      <div
        ref={carouselRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const cardWidth = el.scrollWidth / cards.length;
          setActiveSlide(Math.round(el.scrollLeft / cardWidth));
        }}
        className="sm:hidden -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, idx) => (
          <div
            key={c.title}
            onClick={() => {
              savePrefill(c);
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`carousel-card carousel-card-inner snap-center shrink-0 w-[88vw] max-w-[340px] relative rounded-2xl border flex flex-col overflow-hidden active:scale-[0.98] transition-transform cursor-pointer ${
              c.popular
                ? 'border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 shadow-xl shadow-indigo-500/20'
                : 'bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)]'
            }`}
          >
            {/* Top accent line for popular */}
            {c.popular && <div className="absolute top-0 inset-x-0 h-[2px] gradient-bg" />}
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-start gap-3">
              <span className={`text-2xl w-11 h-11 flex items-center justify-center rounded-xl shrink-0 text-center ${
                c.popular ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-[var(--input-bg)] border border-[var(--border-color)]'
              }`}>{c.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-[var(--text-primary)] text-sm leading-snug">{c.title}</h3>
                {c.popular && (
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{t('popular')}</span>
                )}
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)]/40 tabular-nums shrink-0">{String(idx + 1).padStart(2,'0')}</span>
            </div>
            {/* Divider */}
            <div className="h-px mx-5 bg-[var(--border-color)]" />
            {/* Description */}
            <p className="px-5 pt-3 text-[var(--text-muted)] text-xs leading-relaxed line-clamp-2">{c.description}</p>
            {/* Items */}
            <ul className="px-5 pt-2 pb-3 space-y-1.5 flex-1">
              {c.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-[var(--text-muted)] text-xs">
                  <span className={`font-bold mt-0.5 shrink-0 ${c.popular ? 'text-indigo-400' : 'text-cyan-400'}`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {/* CTA */}
            <div className="px-5 pb-5 mt-auto">
              <div className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold ${
                c.popular
                  ? 'gradient-bg text-white shadow-lg shadow-indigo-500/30'
                  : 'border border-[var(--border-color)] text-[var(--text-muted)]'
              }`}>
                {t('cta_book')}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-4" />
      </div>

      {/* ── Segmented indicator ── */}
      <div className="sm:hidden flex items-center justify-center gap-3 mt-4 mb-1">
        <div className="flex gap-1 items-center">
          {cards.map((_, i) => (
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
          {String(activeSlide + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(cards.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Desktop: grid ── */}
      <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card3D
            key={c.title}
            className={`relative rounded-card border flex flex-col gap-3 ${
              c.popular
                ? 'p-8 border-indigo-500/50 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-500/10 dark:to-cyan-500/5 shadow-xl shadow-indigo-500/20 dark:shadow-indigo-500/30'
                : 'p-8 bg-[var(--bg-card)] border-[var(--border-color)] shadow-[var(--card-shadow)] hover:border-indigo-500/30'
            }`}
          >
            {c.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-indigo-500/40">
                {t('popular')}
              </span>
            )}
            <span className="text-3xl">{c.icon}</span>
            <h3 className="font-heading font-semibold text-[var(--text-primary)]">{c.title}</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{c.description}</p>
            <ul className="space-y-1.5 flex-1">
              {c.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[var(--text-muted)] text-sm">
                  <span className={`font-bold mt-0.5 shrink-0 ${c.popular ? 'text-indigo-500' : 'text-cyan-400'}`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                savePrefill(c);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`mt-2 text-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                c.popular
                  ? 'gradient-bg text-white hover:-translate-y-0.5'
                  : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-indigo-400 hover:text-indigo-400'
              }`}
            >
              {t('cta_book')}
            </button>
          </Card3D>
        ))}
      </div>
    </>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('web');
  const t = useTranslations('pricing');

  const webItems         = t.raw('web_items')         as CatalogCard[];
  const engineeringItems = t.raw('engineering_items') as CatalogCard[];
  const supportItems     = t.raw('support_items')     as CatalogCard[];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 text-center">
          {t('label')}
        </p>
        <h2 className="font-heading font-bold text-4xl text-[var(--text-primary)] text-center mb-3">
          {t('headline')}
        </h2>
        <p className="text-[var(--text-muted)] text-center max-w-xl mx-auto mb-10">
          {t('subheading')}
        </p>

        <div className="flex justify-center mb-10">
          <div className="flex gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'gradient-bg text-white shadow-lg shadow-indigo-500/20'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {t(tab.labelKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        <div key={activeTab} className="tab-enter">
          {activeTab === 'web'         && <CardGrid cards={webItems}         t={t} />}
          {activeTab === 'engineering' && <CardGrid cards={engineeringItems} t={t} />}
          {activeTab === 'support'     && <CardGrid cards={supportItems}     t={t} />}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]/60 mt-8">
          {t('note_estimate')}
        </p>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

type Tab = 'quick' | 'packages' | 'retainer';

interface PricingCard {
  icon: string;
  title: string;
  price: string;
  price_suffix?: string;
  description: string;
  items: string[];
  popular?: boolean;
}

const TABS: { id: Tab; labelKey: string }[] = [
  { id: 'quick',    labelKey: 'tab_quick' },
  { id: 'packages', labelKey: 'tab_packages' },
  { id: 'retainer', labelKey: 'tab_retainer' },
];

function savePrefill(c: PricingCard) {
  const data = {
    serviceHint: c.title,
    message: `${c.title} (${c.price})\n\n${c.description}`,
  };
  sessionStorage.setItem('contact_prefill', JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('contact:prefill', { detail: data }));
}

function CardGrid({
  cards,
  twoCol,
  t,
  ctaKey,
}: {
  cards: PricingCard[];
  twoCol?: boolean;
  t: ReturnType<typeof useTranslations<'pricing'>>;
  ctaKey: string;
}) {
  return (
    <div
      className={`grid gap-6 ${
        twoCol
          ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {cards.map((c) => (
        <Card3D
          key={c.title}
          className={`relative rounded-card p-8 border flex flex-col gap-3 shadow-[var(--card-shadow)] ${
            c.popular
              ? 'border-indigo-500/40 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-500/10 dark:to-cyan-500/5'
              : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-indigo-500/30'
          }`}
        >
          {c.popular && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full">
              {t('popular')}
            </span>
          )}
          <span className="text-3xl">{c.icon}</span>
          <h3 className="font-heading font-semibold text-[var(--text-primary)]">{c.title}</h3>
          <div className="text-[var(--text-muted)] text-sm">
            <span className="font-heading font-bold text-2xl text-cyan-400">{c.price}</span>
            {c.price_suffix && (
              <span className="text-[var(--text-muted)] text-sm ml-1">{c.price_suffix}</span>
            )}
          </div>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">{c.description}</p>
          <ul className="space-y-1.5 flex-1">
            {c.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[var(--text-muted)] text-sm">
                <span className="text-cyan-400 font-bold mt-0.5 shrink-0">✓</span>
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
            {t(ctaKey as Parameters<typeof t>[0])}
          </button>
        </Card3D>
      ))}
    </div>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('quick');
  const t = useTranslations('pricing');

  const quickItems    = t.raw('quick_items')    as PricingCard[];
  const packageItems  = t.raw('package_items')  as PricingCard[];
  const retainerItems = t.raw('retainer_items') as PricingCard[];

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

        {activeTab === 'quick'    && <CardGrid cards={quickItems}    t={t} ctaKey="cta_quote" />}
        {activeTab === 'packages' && <CardGrid cards={packageItems}  t={t} ctaKey="cta_quote" />}
        {activeTab === 'retainer' && <CardGrid cards={retainerItems} t={t} ctaKey="cta_book" twoCol />}

        <p className="text-center text-xs text-[var(--text-muted)]/60 mt-8">
          {t('note_estimate')}
        </p>
      </div>
    </section>
  );
}

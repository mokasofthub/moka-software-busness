'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { isValidEmail } from '@/lib/utils';

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function Contact() {
  const t = useTranslations('contact');
  const services = t.raw('services') as string[];

  const [form, setForm] = useState<FormState>({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    function applyPrefill(serviceHint: string, message: string) {
      const hint = serviceHint.toLowerCase();
      const matched =
        services.find((s) =>
          hint
            .split(/\W+/)
            .filter((w) => w.length > 3)
            .some((w) => s.toLowerCase().includes(w))
        ) ?? '';
      setForm((prev) => ({ ...prev, service: matched, message }));
    }

    // Handle same-page scroll (component already mounted)
    function onPrefillEvent(e: Event) {
      const { serviceHint, message } = (e as CustomEvent<{ serviceHint: string; message: string }>).detail;
      sessionStorage.removeItem('contact_prefill');
      applyPrefill(serviceHint, message);
    }
    window.addEventListener('contact:prefill', onPrefillEvent);

    // Handle direct navigation / page refresh
    const raw = sessionStorage.getItem('contact_prefill');
    if (raw) {
      try {
        const prefill = JSON.parse(raw) as { serviceHint: string; message: string };
        sessionStorage.removeItem('contact_prefill');
        applyPrefill(prefill.serviceHint, prefill.message);
      } catch {
        sessionStorage.removeItem('contact_prefill');
      }
    }

    return () => window.removeEventListener('contact:prefill', onPrefillEvent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg(t('error_generic'));
      return;
    }
    if (!isValidEmail(form.email)) {
      setStatus('error');
      setErrorMsg(t('error_generic'));
      return;
    }

    setStatus('loading');
    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
        const errs = (data as { errors?: { message: string }[] }).errors;
        setErrorMsg(errs?.[0]?.message ?? t('error_generic'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(t('error_generic'));
    }
  };

  const inputClass =
    'w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20';

  return (
    <section id="contact" className="py-24 bg-[var(--bg-section)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Info */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">
              {t('label')}
            </p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight mb-5">
              {t('headline')}
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-10">
              {t('subheading')}
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: '📧',
                  label: t('email_label'),
                  value: 'contact@mokasoftwarebusness.com',
                  href: 'mailto:contact@mokasoftwarebusness.com',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A66C2]" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  label: t('linkedin_label'),
                  value: 'linkedin.com/in/bernard-mokalo-93a592186',
                  href: 'https://linkedin.com/in/bernard-mokalo-93a592186',
                },
                {
                  icon: '🌍',
                  label: t('availability_label'),
                  value: t('availability_value'),
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-lg shadow-[var(--card-shadow)]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[var(--text-secondary)] text-sm hover:text-cyan-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[var(--text-secondary)] text-sm">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-card p-10 space-y-5 shadow-[var(--card-shadow)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-medium text-[var(--text-muted)]">
                  {t('name_label')} <span className="text-rose-400">*</span>
                </label>
                <input
                  id="name" name="name" type="text" required
                  value={form.name} onChange={handleChange}
                  placeholder={t('name_placeholder')} className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-medium text-[var(--text-muted)]">
                  {t('email_label')} <span className="text-rose-400">*</span>
                </label>
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder={t('email_placeholder')} className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="service" className="text-xs font-medium text-[var(--text-muted)]">
                {t('service_label')}
              </label>
              <select
                id="service" name="service"
                value={form.service} onChange={handleChange}
                className={`${inputClass} pr-10 cursor-pointer`}
              >
                <option value="">{t('service_placeholder')}</option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-[var(--bg-card)]">{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-medium text-[var(--text-muted)]">
                {t('message_label')} <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="message" name="message" rows={5} required
                value={form.message} onChange={handleChange}
                placeholder={t('message_placeholder')}
                className={`${inputClass} resize-vertical`}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/25 px-4 py-3 rounded-lg">
                {errorMsg}
              </p>
            )}
            {status === 'success' && (
              <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-3 rounded-lg">
                <strong className="block mb-0.5">{t('success_title')}</strong>
                {t('success_body')}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', email: '', service: '', message: '' });
                  setStatus('idle');
                  setErrorMsg('');
                }}
                className="px-6 py-3.5 rounded-full font-semibold text-sm border border-[var(--border-color)] text-[var(--text-muted)] hover:border-rose-400 hover:text-rose-400 transition-all"
              >
                {t('clear')}
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 py-3.5 rounded-full font-semibold text-white gradient-bg shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {status === 'loading' ? t('sending') : t('submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

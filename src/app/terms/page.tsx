import type { Metadata } from 'next'
import Link from 'next/link'
import { terms, resolveLang, SUPPORT_EMAIL, LAST_UPDATED } from './translations'

export const metadata: Metadata = {
  title: 'Terms of Service — Financeo',
  description: 'Terms and conditions for using the Financeo personal finance application.',
}

export default function TermsOfService({
  searchParams,
}: {
  searchParams: { lang?: string }
}) {
  const lang = resolveLang(searchParams.lang)
  const t = terms[lang]

  return (
    <main className="min-h-screen bg-[#060D1A] text-slate-300 py-16 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <Link href="/" className="text-cyan-400 text-sm hover:underline">{t.back}</Link>
          <div className="flex items-center gap-3 mt-6 mb-2">
            <div
              className="flex items-center justify-center rounded-[14px] w-[44px] h-[44px] shrink-0"
              style={{ background: 'linear-gradient(145deg,#0B1628,#182030)', border: '1.5px solid rgba(34,211,238,0.32)', boxShadow: '0 8px 24px rgba(6,182,212,0.35)' }}
            >
              <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-label="Financeo">
                <path d="M12 54 L12 10 L40 10 M12 32 L33 32" stroke="white" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 51 L47 33" stroke="#22D3EE" strokeWidth="3.2" strokeLinecap="round" opacity={0.38}/>
                <path d="M47 33 L50 23" stroke="#22D3EE" strokeWidth="3.2" strokeLinecap="round" opacity={0.8}/>
                <path d="M52 14 L54 24 L46 22 Z" fill="#22D3EE"/>
                <circle cx="47" cy="33" r="2.2" fill="#22D3EE" opacity={0.72}/>
                <circle cx="51" cy="18" r="3" fill="#22D3EE"/>
              </svg>
            </div>
            <span className="text-white text-2xl font-bold">Financeo</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-4">{t.title}</h1>
          <p className="text-slate-500 text-sm mt-1">{t.subtitle}: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.acceptance.h}</h2>
            <p>{t.sections.acceptance.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.service.h}</h2>
            <p>{t.sections.service.p}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {t.sections.service.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.account.h}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.account.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.acceptable.h}</h2>
            <p>{t.sections.acceptable.p}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {t.sections.acceptable.prohibited.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.financial.h}</h2>
            <p>{t.sections.financial.p1}</p>
            <p className="mt-3">{t.sections.financial.p2}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.ip.h}</h2>
            <p>{t.sections.ip.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.termination.h}</h2>
            <p>{t.sections.termination.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.disclaimer.h}</h2>
            <p>{t.sections.disclaimer.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.liability.h}</h2>
            <p>{t.sections.liability.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.changes.h}</h2>
            <p>{t.sections.changes.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.governing.h}</h2>
            <p>{t.sections.governing.p}</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-semibold mb-3">{t.sections.contactSection.h}</h2>
            <p>
              {t.sections.contactSection.p}{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:underline">{SUPPORT_EMAIL}</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex gap-6 text-sm text-slate-500">
          <Link href={`/privacy?lang=${lang}`} className="hover:text-cyan-400 transition-colors">{t.footer.privacy}</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-cyan-400 transition-colors">{t.footer.contact}</a>
        </div>

      </div>
    </main>
  )
}

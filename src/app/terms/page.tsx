import type { Metadata } from 'next'
import LegalPageLayout, { LegalCard, LegalBulletList, LegalFooter } from '../components/LegalPageLayout'
import { terms, resolveLang, SUPPORT_EMAIL, LAST_UPDATED } from './translations'

export const metadata: Metadata = {
  title: 'Terms of Service — MokaSoftware',
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
    <LegalPageLayout
      title={t.title}
      badge={`${t.subtitle}: ${LAST_UPDATED}`}
    >

      <LegalCard num={1} title={t.sections.acceptance.h} accent="check">
        <p>{t.sections.acceptance.p}</p>
      </LegalCard>

      <LegalCard num={2} title={t.sections.service.h} accent="device">
        <p className="mb-4">{t.sections.service.p}</p>
        <LegalBulletList items={t.sections.service.items} />
      </LegalCard>

      <LegalCard num={3} title={t.sections.account.h} accent="key">
        <LegalBulletList items={t.sections.account.items} />
      </LegalCard>

      <LegalCard num={4} title={t.sections.acceptable.h} accent="document">
        <p className="mb-4">{t.sections.acceptable.p}</p>
        <LegalBulletList items={t.sections.acceptable.prohibited} />
      </LegalCard>

      <LegalCard num={5} title={t.sections.financial.h} accent="shield">
        <p className="mb-3">{t.sections.financial.p1}</p>
        <p>{t.sections.financial.p2}</p>
      </LegalCard>

      <LegalCard num={6} title={t.sections.ip.h} accent="lock">
        <p>{t.sections.ip.p}</p>
      </LegalCard>

      <LegalCard num={7} title={t.sections.termination.h} accent="ban">
        <p>{t.sections.termination.p}</p>
      </LegalCard>

      <LegalCard num={8} title={t.sections.disclaimer.h} accent="warning">
        <p>{t.sections.disclaimer.p}</p>
      </LegalCard>

      <LegalCard num={9} title={t.sections.liability.h} accent="scale">
        <p>{t.sections.liability.p}</p>
      </LegalCard>

      <LegalCard num={10} title={t.sections.changes.h} accent="refresh">
        <p>{t.sections.changes.p}</p>
      </LegalCard>

      <LegalCard num={11} title={t.sections.governing.h} accent="globe">
        <p>{t.sections.governing.p}</p>
      </LegalCard>

      <LegalCard num={12} title={t.sections.contactSection.h} accent="mail">
        <p>
          {t.sections.contactSection.p}{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </LegalCard>

      <LegalFooter
        privacyHref={`/privacy?lang=${lang}`}
        privacyLabel={t.footer.privacy}
        contactEmail={SUPPORT_EMAIL}
        contactLabel={t.footer.contact}
      />

    </LegalPageLayout>
  )
}



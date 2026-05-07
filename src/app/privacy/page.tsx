import type { Metadata } from 'next'
import LegalPageLayout, { LegalCard, LegalBulletList, LegalFooter } from '../components/LegalPageLayout'
import { privacy, resolveLang, SUPPORT_EMAIL, LAST_UPDATED } from './translations'

export const metadata: Metadata = {
  title: 'Privacy Policy — MokaSoftware',
  description: 'Privacy Policy for the Financeo personal finance application.',
}

export default function PrivacyPolicy({
  searchParams,
}: {
  searchParams: { lang?: string }
}) {
  const lang = resolveLang(searchParams.lang)
  const t = privacy[lang]

  return (
    <LegalPageLayout
      title={t.title}
      badge={`${t.subtitle}: ${LAST_UPDATED}`}
      intro={t.intro}
    >

      <LegalCard num={1} title={t.sections.collect.h} accent="database">
        <p className="mb-4">{t.sections.collect.p}</p>
        <LegalBulletList items={t.sections.collect.items} />
      </LegalCard>

      <LegalCard num={2} title={t.sections.use.h} accent="cog">
        <p className="mb-4">{t.sections.use.p}</p>
        <LegalBulletList items={t.sections.use.items} />
      </LegalCard>

      <LegalCard num={3} title={t.sections.storage.h} accent="shield">
        <p>{t.sections.storage.p}</p>
      </LegalCard>

      <LegalCard num={4} title={t.sections.sharing.h} accent="users">
        <p className="mb-4">{t.sections.sharing.p}</p>
        <LegalBulletList items={t.sections.sharing.items} />
      </LegalCard>

      <LegalCard num={5} title={t.sections.rights.h} accent="star">
        <p className="mb-4">{t.sections.rights.p}</p>
        <LegalBulletList items={t.sections.rights.items} />
      </LegalCard>

      <LegalCard num={6} title={t.sections.children.h} accent="heart">
        <p>{t.sections.children.p}</p>
      </LegalCard>

      <LegalCard num={7} title={t.sections.changes.h} accent="bell">
        <p>{t.sections.changes.p}</p>
      </LegalCard>

      <LegalCard num={8} title={t.sections.contact.h} accent="mail">
        <p>
          {t.sections.contact.p}{' '}
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
        termsHref={`/terms?lang=${lang}`}
        termsLabel={t.footer.terms}
        contactEmail={SUPPORT_EMAIL}
        contactLabel={t.footer.contact}
      />

    </LegalPageLayout>
  )
}


/**
 * LegalPageLayout — shared layout for Privacy Policy and Terms of Service pages.
 * Uses CSS custom properties for light/dark mode via prefers-color-scheme.
 * These pages live outside the [locale] layout so theme is handled here directly.
 * CSS is loaded via src/app/legal.css (imported in the root layout).
 */
import Link from 'next/link'

// ─── Brand header ───────────────────────────────────────────────────────────
function BrandHeader() {
  return (
    <nav
      style={{ borderBottom: '1px solid var(--nav-b)', background: 'var(--nav)' }}
      className="sticky top-0 z-10 backdrop-blur-sm px-6 py-4"
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">

        {/* MokaSoftware logo */}
        <Link
          href="/"
          className="flex flex-col leading-none gap-[3px] no-underline"
          style={{ color: 'var(--brand)', fontWeight: 600 }}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg leading-none" style={{ color: 'var(--accent)' }}>⬡</span>
            <span style={{ fontSize: 14, letterSpacing: '0.01em' }}>
              MokaSoftware<strong style={{ color: 'var(--accent)' }}>Busness</strong>
            </span>
          </span>
          <span className="flex items-center gap-1 w-full">
            <span className="flex-1" style={{ height: 1, background: 'var(--ac-b)' }} />
            <span style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.6, lineHeight: 1 }}>∞</span>
            <span className="flex-1" style={{ height: 1, background: 'var(--ac-b)' }} />
          </span>
        </Link>

      </div>
    </nav>
  )
}

// ─── Section icons ─────────────────────────────────────────────────────────
const I = (path: React.ReactNode) => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--accent)' }}>
    {path}
  </svg>
)

const SECTION_ICONS = {
  // Privacy
  database: I(<path fillRule="evenodd" d="M3 5c0-1.657 3.134-3 7-3s7 1.343 7 3-3.134 3-7 3-7-1.343-7-3zM3 8.236V10c0 1.657 3.134 3 7 3s7-1.343 7-3V8.236C15.642 9.298 12.948 10 10 10s-5.642-.702-7-1.764zM3 13.236V15c0 1.657 3.134 3 7 3s7-1.343 7-3v-1.764C15.642 14.298 12.948 15 10 15s-5.642-.702-7-1.764z" clipRule="evenodd" />),
  cog: I(<path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />),
  shield: I(<path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />),
  users: I(<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />),
  star: I(<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />),
  heart: I(<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />),
  bell: I(<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />),
  mail: I(<><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></>),
  // Terms
  check: I(<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />),
  device: I(<path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />),
  key: I(<path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />),
  document: I(<path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />),
  lock: I(<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />),
  ban: I(<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />),
  warning: I(<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />),
  scale: I(<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 14a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 5.477V7a1 1 0 11-2 0V5.477L6.237 7.1l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 14a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 3.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />),
  globe: I(<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />),
  refresh: I(<path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />),
} as const

export function LegalCard({
  num, title, children, accent,
}: {
  num: number
  title: string
  children: React.ReactNode
  accent?: keyof typeof SECTION_ICONS
}) {
  const icon = accent ? SECTION_ICONS[accent] : null
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--card-b)' }}
    >
      {/* Section header */}
      <div
        className="px-6 sm:px-8 pt-6 pb-5"
        style={{ borderBottom: '1px solid var(--card-b)' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0"
            style={{ background: 'var(--ac-soft)', border: '1px solid var(--ac-b)' }}
          >
            {icon
              ? icon
              : <span className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>{num}</span>
            }
          </div>
          <h2
            className="font-bold text-[19px] leading-snug"
            style={{ color: 'var(--heading)', letterSpacing: '-0.01em' }}
          >
            {title}
          </h2>
        </div>
      </div>
      {/* Section content */}
      <div className="px-6 sm:px-8 py-6 text-[15px] leading-[1.8]" style={{ color: 'var(--text)' }}>
        {children}
      </div>
    </div>
  )
}

// ─── Bullet list ────────────────────────────────────────────────────────────
export function LegalBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text)' }}>
          <svg
            className="mt-[5px] shrink-0"
            width="12" height="12" viewBox="0 0 12 12"
            fill="currentColor"
            style={{ color: 'var(--check)' }}
          >
            <path d="M10.28 2.28a.75.75 0 00-1.06 0L4.5 7 2.78 5.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── Page footer ────────────────────────────────────────────────────────────
export function LegalFooter({
  privacyHref, termsHref, privacyLabel, termsLabel, contactEmail, contactLabel,
}: {
  privacyHref?: string
  termsHref?: string
  privacyLabel?: string
  termsLabel?: string
  contactEmail: string
  contactLabel: string
}) {
  return (
    <footer
      className="max-w-3xl mx-auto px-6 py-8"
      style={{ borderTop: '1px solid var(--nav-b)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
        <span className="text-xs" style={{ color: 'var(--copy)' }}>
          © {new Date().getFullYear()} MokaSoftware
        </span>
        <div className="flex items-center gap-4 text-sm">
          {termsHref && termsLabel && (
            <Link href={termsHref} style={{ color: 'var(--muted)' }} className="hover:underline transition-colors">
              {termsLabel}
            </Link>
          )}
          {privacyHref && privacyLabel && (
            <Link href={privacyHref} style={{ color: 'var(--muted)' }} className="hover:underline transition-colors">
              {privacyLabel}
            </Link>
          )}
          {(termsHref || privacyHref) && (
            <span style={{ color: 'var(--sep)' }}>·</span>
          )}
          <a href={`mailto:${contactEmail}`} style={{ color: 'var(--muted)' }} className="hover:underline transition-colors">
            {contactLabel}
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── Main layout wrapper ────────────────────────────────────────────────────
export default function LegalPageLayout({
  title,
  badge,
  intro,
  children,
}: {
  title: string
  badge?: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div className="lgl min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 440,
          background: 'radial-gradient(ellipse, var(--glow) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <BrandHeader />

        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12" style={{ borderBottom: '1px solid var(--card-b)' }}>

          {/* Financeo app identity */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="flex items-center justify-center rounded-2xl w-16 h-16"
              style={{
                background: 'var(--ac-soft)',
                border: '1px solid var(--ac-b)',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
                <path d="M12 54 L12 10 L40 10 M12 32 L33 32" stroke="var(--heading)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 51 L47 33" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" opacity={0.4}/>
                <path d="M47 33 L50 23" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" opacity={0.85}/>
                <path d="M52 14 L54 24 L46 22 Z" fill="var(--accent)"/>
                <circle cx="47" cy="33" r="2.2" fill="var(--accent)" opacity={0.7}/>
                <circle cx="51" cy="18" r="3" fill="var(--accent)"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="font-bold text-base leading-none" style={{ color: 'var(--heading)' }}>Financeo</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Personal Finance App</div>
            </div>
          </div>

          {badge && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-md px-2.5 py-1 mb-5"
              style={{ color: 'var(--accent)', background: 'var(--ac-soft)', border: '1px solid var(--ac-b)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              {badge}
            </div>
          )}
          <h1
            className="text-4xl sm:text-[42px] font-extrabold tracking-tight leading-[1.1] mb-5"
            style={{ color: 'var(--heading)' }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="text-base leading-7 max-w-2xl pl-4"
              style={{ color: 'var(--muted)', borderLeft: '3px solid var(--ac-b)' }}
            >
              {intro}
            </p>
          )}
        </header>

        {/* Page-specific content */}
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}

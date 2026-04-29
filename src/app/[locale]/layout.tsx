import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import ThemeProvider from '../components/ThemeProvider';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MokaSoftware Business – Bernard D. Mokalo',
  description:
    'Freelance Software Engineer & DevOps/Cloud specialist. CI/CD automation, AWS cloud migration, Kubernetes setup, backend development in Java, Go, Python.',
  keywords: [
    'DevOps', 'AWS', 'Kubernetes', 'CI/CD', 'Software Engineer',
    'Freelance', 'Docker', 'Terraform', 'Jenkins', 'GitLab CI',
  ],
  openGraph: {
    title: 'MokaSoftware Business – Bernard D. Mokalo',
    description: 'Freelance Software Engineer & DevOps/Cloud specialist.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MokaSoftware Business – Bernard D. Mokalo',
    description: 'Freelance Software Engineer & DevOps/Cloud specialist.',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(params.locale);
  const messages = await getMessages();
  return (
    <html
      lang={params.locale}
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})()`
          }}
        />
      </head>
      <body
        className="bg-[var(--bg-base)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

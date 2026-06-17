import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = 'https://openworld-india.dev';
const siteName = 'OpenWorld India';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: { default: siteName, template: `%s | ${siteName}` },
  description: "Explore India Through Maps, Stories, Culture, and History. India's most comprehensive open-source digital atlas and cultural encyclopedia.",
  keywords: ['India', 'states', 'cities', 'monuments', 'culture', 'history', 'food', 'festivals', 'travel', 'heritage', 'open source', 'atlas'],
  authors: [{ name: 'OpenWorld India' }],
  creator: 'OpenWorld India',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: "Explore India Through Maps, Stories, Culture, and History. India's most comprehensive open-source digital atlas.",
    url: siteUrl,
    siteName,
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: siteName }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: "Explore India Through Maps, Stories, Culture, and History.",
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/app-icon.svg',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try { if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch(e) {}`
        }} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

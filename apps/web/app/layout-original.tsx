import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HORUS ZENITH | Tanti Interior StudioOS',
  description: 'Enterprise AI Operating System for Interior Design Studios',
  keywords: ['interior design', 'AI', 'studio management', 'CRM', 'enterprise'],
  authors: [{ name: 'Tanti Interior' }],
  creator: 'Tanti Interior',
  metadataBase: new URL('https://tanti.studio'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tanti.studio',
    title: 'HORUS ZENITH | Tanti Interior StudioOS',
    description: 'Enterprise AI Operating System for Interior Design Studios',
    siteName: 'Tanti Interior StudioOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HORUS ZENITH | Tanti Interior StudioOS',
    description: 'Enterprise AI Operating System for Interior Design Studios',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E4E3E0' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${mono.variable} ${serif.variable} bg-[#E4E3E0] text-[#141414] font-sans antialiased`}
    >
      {children}
    </body>
  );
}

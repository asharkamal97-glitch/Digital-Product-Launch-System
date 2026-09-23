import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/siteConfig';

// Portal and verification routes read Prisma at request time; never execute them during deployment prerendering.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: [
    'Digital Product Launch System',
    'sell digital products',
    'digital product business',
    'AI agents',
    'ready to post reels',
    'digital product courses',
    'Canva templates commercial use',
    'Notion templates',
    'organic traffic strategy',
    'Stan Store setup',
    'Gumroad templates',
  ],
  authors: [{ name: 'Digital Product Launch System' }],
  creator: 'Digital Product Launch System',
  publisher: 'Digital Product Launch System',
  metadataBase: new URL('https://launchsystem.io'),
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: 'https://launchsystem.io',
    siteName: 'Digital Product Launch System',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark-950 text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import { cn } from '@uniqueeest/utils';

import './globals.css';
import '@uniqueeest/token/css';

import { Header } from '@widgets/Header';
import { Footer } from '@widgets/Footer';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '400 500 700',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'uniqueeest',
  description: 'korea chill guy',
  icons: {
    icon: '/uniqueeest.png',
  },
  openGraph: {
    title: 'uniqueeest',
    description: 'korea chill guy',
    images: [
      {
        url: '/meta-image.png',
        width: 1200,
        height: 630,
        alt: 'Be uniqueeest',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'uniqueeest',
    description: 'korea chill guy',
    images: ['/meta-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, 'flex flex-col min-h-screen')}>
        <Header />
        <main className="flex-1 mt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}

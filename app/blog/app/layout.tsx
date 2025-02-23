import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { Footer, Header } from '@components/layout';
import { cn } from '@utils';

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
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { Footer, Header } from '@components/layout';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '400 500 700',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'uniqueeest',
  icons: {
    icon: '/uniqueeest.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

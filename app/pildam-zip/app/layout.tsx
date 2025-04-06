import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cn } from '@uniqueeest/utils';

import './globals.css';
import '@uniqueeest/token/css';

import { Header } from '@/widgets';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '400 500 700',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: '필담집',
  description: '필담집 - 생각을 공유하는 공간',
  openGraph: {
    title: '필담집',
    description: '필담집 - 생각을 공유하는 공간',
    images: [
      {
        url: '/meta-image.png',
        width: 1200,
        height: 630,
        alt: '필담집',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '필담집',
    description: '필담집 - 생각을 공유하는 공간',
    images: ['/meta-image.png'],
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
        <main className="flex-1 mt-16 pb-20 pt-9 px-4">{children}</main>
      </body>
    </html>
  );
}

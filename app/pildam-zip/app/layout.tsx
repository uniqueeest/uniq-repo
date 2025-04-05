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
        <main className="flex-1 mt-16 pb-20 lg:pt-9">{children}</main>
      </body>
    </html>
  );
}

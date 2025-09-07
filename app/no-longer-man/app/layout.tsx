import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '미국 뉴스 요약',
  description:
    '링크를 붙여넣으면 신뢰할 수 있는 요약을 실시간으로 제공합니다. 데이터는 저장하지 않습니다.',
  icons: {
    icon: '/no-longer-man.png',
  },
  keywords: [
    '미국 뉴스 요약',
    '미국 뉴스 요약 서비스',
    '미국 뉴스 요약 도구',
    '미국 뉴스 요약 툴',
    '미국 뉴스 요약 프로그램',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

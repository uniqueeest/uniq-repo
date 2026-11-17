import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';

import './globals.css';

import { Header } from '@widgets/Header';
import { Footer } from '@widgets/Footer';
import { themeScript } from '@features/ThemeToggle';
import { BLOG_URL } from '@shared/constants/url';
import { NICKNAME } from '@shared/constants/nickname';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

// 코드 블록 전용. next/font가 빌드 때 받아 자체 호스팅한다
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const DESCRIPTION = '프론트엔드 엔지니어 최윤재의 블로그. 개발, AI, 그리고 일하며 생각한 것들을 기록합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: { default: NICKNAME, template: `%s | ${NICKNAME}` },
  description: DESCRIPTION,
  authors: [{ name: '최윤재', url: `${BLOG_URL}/about` }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: NICKNAME }] },
  },
  openGraph: { siteName: NICKNAME, locale: 'ko_KR', type: 'website' },
  twitter: { card: 'summary_large_image' },
  verification: { google: process.env.NEXT_PUBLIC_GSC_ID },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

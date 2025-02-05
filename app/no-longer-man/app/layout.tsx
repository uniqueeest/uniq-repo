import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '인간실격 | 부정을 긍정으로 바꾸는 공간',
  description:
    '당신의 우울한 하루를 동물들의 긍정적인 시선으로 바라보세요. 인간실격을 선언한 당신을 위한 유쾌한 위로의 공간입니다.',
  icons: {
    icon: '/no-longer-man.png',
  },
  keywords: [
    '인간실격',
    '다자이 오사무',
    '위로',
    '긍정',
    '힐링',
    '동물',
    '유머',
    '위트',
    '마음치료',
    '우울',
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
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

import { Metadata } from 'next';
import { Navigation } from '@features/Navigation';
import { cn } from '@uniqueeest/utils';
import { BLOG_URL } from '@shared/constants/url';
import { NICKNAME } from '@shared/constants/nickname';

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: 'uniqueeest',
  description:
    '프로덕트의 방향성을 함께 고민하고 비즈니스 가치 창출에 기여하는 개발자를 지향합니다.',
  openGraph: {
    title: 'uniqueeest',
    url: `${BLOG_URL}/about`,
    siteName: NICKNAME,
    type: 'website',
    images: [
      {
        url: '/meta-image.png',
        width: 1200,
        height: 630,
        alt: 'About uniqueeest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'uniqueeest',
    description:
      '프로덕트의 방향성을 함께 고민하고 비즈니스 가치 창출에 기여하는 개발자를 지향합니다.',
    images: ['/meta-image.png'],
  },
};

export default function About() {
  return (
    <section className="px-3 py-3 lg:py-5 lg:center-720">
      <Navigation className="mb-6" />
      <article className={cn('flex flex-col gap-2')}>
        <h2 className={cn('text-xl lg:text-2xl font-semibold')}>최윤재</h2>
        <h3 className="text-sm lg:text-base">Front-end Engineer</h3>
        <p className="text-sm lg:text-base">
          프로덕트의 방향성을 함께 고민하고 비즈니스 가치 창출에 기여하는
          개발자를 지향합니다.
        </p>
      </article>
    </section>
  );
}

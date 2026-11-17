import type { Metadata } from 'next';
import { CONTACT_LIST } from '@shared/constants/contact';

export const metadata: Metadata = {
  title: '소개',
  description: '프론트엔드 엔지니어 최윤재가 그때그때 끄적이는 공간.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 sm:pt-20">
      <h1 className="text-3xl font-medium tracking-[-0.015em] sm:text-4xl">최윤재</h1>

      <div className="prose mt-10">
        <p>
          프론트엔드 엔지니어로 일하고 있습니다. 프로덕트의 방향성을 함께
          고민하고 비즈니스 가치 창출에 기여하는 개발자를 지향합니다.
        </p>
        <p>
          이곳은 그때그때 끄적이는 공간입니다. 일하다 부딪힌 문제를 끝까지
          파고든 기록도 있고, AI와 함께 일하는 방식에 대한 생각, 해마다 남기는
          회고도 있습니다.
        </p>
        <p>요즘은 러닝과 헬스, 그리고 다양한 분야의 책 읽기를 붙잡고 있습니다.</p>
      </div>

      <ul className="mt-12 flex gap-5 text-[15px]">
        {[...CONTACT_LIST, { label: 'RSS', link: '/feed.xml' }].map(({ label, link }) => (
          <li key={label}>
            <a
              href={link}
              className="text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-current"
              {...(link.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

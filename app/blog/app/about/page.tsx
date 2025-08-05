import { Navigation } from '@shared/ui/Navigation';
import { cn } from '@uniqueeest/utils';

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

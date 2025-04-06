import { cn } from '@uniqueeest/utils';

export default function AboutPage() {
  return (
    <section className={cn('flex flex-col gap-4', 'center-700')}>
      <article className="flex flex-col">
        <p className="font-medium">필담 (筆談)</p>
        <p>
          서로 말이 통하지 않거나 입으로 말을 할 수 없는 경우에, 글을 써 가며
          의견이나 생각을 주고받는 것.
        </p>
      </article>
      <article>
        <p>필담을 나눠요.</p>
      </article>
    </section>
  );
}

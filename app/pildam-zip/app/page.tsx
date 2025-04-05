import { cn } from '@uniqueeest/utils';

import { PostCard } from '@/entities/post';

export default function Home() {
  return (
    <section className="center-700">
      <article className={cn('grid grid-cols-1 gap-10', 'md:grid-cols-2')}>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            title="안녕"
            description="안녕"
            date="2021-01-01"
            slug={`${index}`}
          />
        ))}
      </article>
    </section>
  );
}

import { cn } from '@uniqueeest/utils';

import { getAllPosts } from '@entities/posts/api';
import { PostCard } from '@entities/posts/ui/PostCard';

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <section className="px-3 py-3 lg:py-5 lg:center-720">
      <article className={cn('flex flex-col gap-3')}>
        {allPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </article>
    </section>
  );
}

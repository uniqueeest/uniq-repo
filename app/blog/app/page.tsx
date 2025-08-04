import { cn } from '@uniqueeest/utils';
import { PostCard } from '@entities/posts/ui/PostCard';
import { getSortedPosts } from '@shared/lib/posts';
import { Navigation } from '@shared/ui/Navigation';

export default function Home() {
  const sortedPosts = getSortedPosts();

  return (
    <section className="px-3 py-3 lg:py-5 lg:center-720">
      <Navigation className="mb-6" />
      <article className={cn('flex flex-col gap-3')}>
        {sortedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </article>
    </section>
  );
}

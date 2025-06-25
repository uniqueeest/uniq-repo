import { cn } from '@uniqueeest/utils';
import { posts } from '@/.velite';
import { PostCard } from '@entities/posts/ui/PostCard';

// 정적 생성을 위한 설정
export const revalidate = 3600; // 1시간마다 재검증

export default function Home() {
  return (
    <section className="px-3 py-3 lg:py-5 lg:center-720">
      <article className={cn('flex flex-col gap-3')}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </article>
    </section>
  );
}

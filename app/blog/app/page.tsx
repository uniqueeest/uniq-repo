import Link from 'next/link';
import { PostList } from '@entities/posts/ui/PostList';
import { getSortedPosts } from '@shared/lib/posts';

const RECENT_COUNT = 5;

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="pt-14 pb-14 sm:pt-20 sm:pb-20">
        <h1 className="text-[1.6rem] leading-[1.4] font-medium tracking-[-0.015em] text-balance sm:text-[1.9rem]">
          개발과 AI, 그리고 일하며 생각한 것들을 기록합니다.
        </h1>
      </section>

      <section aria-labelledby="recent">
        <h2 id="recent" className="mb-8 text-sm text-subtle">
          최근 글
        </h2>
        <PostList posts={posts.slice(0, RECENT_COUNT)} />
        <Link
          href="/posts"
          className="mt-8 inline-block text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-current"
        >
          글 {posts.length}편 모두 보기 →
        </Link>
      </section>
    </div>
  );
}

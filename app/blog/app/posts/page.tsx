import type { Metadata } from 'next';
import { PostList } from '@entities/posts/ui/PostList';
import { getSortedPosts } from '@shared/lib/posts';

export const metadata: Metadata = {
  title: '글',
  alternates: { canonical: '/posts' },
};

export default function Posts() {
  const posts = getSortedPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 sm:pt-20">
      <h1 className="text-3xl font-medium tracking-[-0.015em] sm:text-4xl">글</h1>
      <p className="mt-3 pb-10 text-muted">
        <span className="tabular">{posts.length}</span>편의 글
      </p>
      <PostList posts={posts} />
    </div>
  );
}

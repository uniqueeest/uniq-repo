import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostList } from '@entities/posts/ui/PostList';
import { getAllTags, getSortedPosts } from '@shared/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(([tag]) => ({ tag }));
}

const decode = async (params: PageProps<'/tags/[tag]'>['params']) =>
  decodeURIComponent((await params).tag);

export async function generateMetadata({
  params,
}: PageProps<'/tags/[tag]'>): Promise<Metadata> {
  const tag = await decode(params);
  return {
    title: `#${tag}`,
    alternates: { canonical: `/tags/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({ params }: PageProps<'/tags/[tag]'>) {
  const tag = await decode(params);
  const posts = getSortedPosts().filter((post) => post.tag.includes(tag));
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 pt-14 sm:pt-20">
      <Link href="/posts" className="text-sm text-muted hover:text-ink">
        ← 모든 글
      </Link>
      <h1 className="mt-4 text-3xl font-medium tracking-[-0.015em] sm:text-4xl">
        #{tag}
      </h1>
      <p className="mt-3 pb-10 text-muted">
        <span className="tabular">{posts.length}</span>편의 글
      </p>
      <PostList posts={posts} />
    </div>
  );
}

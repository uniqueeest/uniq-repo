'use client';

import Link from 'next/link';

import { PostCard } from '@components/ui';
import { Post } from '@interface/post';

interface HomePageProps {
  posts: Post[];
}

export const HomePage = ({ posts }: HomePageProps) => {
  return (
    <section className="py-5 lg:center-1280">
      <article>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </article>
    </section>
  );
};
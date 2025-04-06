import { notFound } from 'next/navigation';
import { posts } from '@/.velite';

import { PostHeader } from '@/entities/post/ui';
import { MDXContent } from '@/shared/ui/mdx';

interface PostProps {
  params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.id === slug);
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (post == null) {
    return notFound();
  }

  return (
    <>
      <PostHeader
        title={post.title}
        date={post.date}
        thumbnailUrl={post.thumbnailUrl ? post.thumbnailUrl : '/pildam-zip.png'}
      />
      <section className="mt-[100vh]">
        <article className="center-700 mt-16">
          <div className="prose mx-auto px-4">
            <MDXContent code={post.body} />
          </div>
        </article>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (post == null) {
    return {};
  }

  return { title: post.title, description: post.description };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.id }));
}

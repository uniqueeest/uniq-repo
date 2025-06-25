import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '@/.velite';
import { getReadingTime } from '@entities/posts/lib/calculateReadingTime';
import { PostContent } from '@entities/posts/ui/PostContent';
import { PostHead } from '@entities/posts/ui/PostHead';
import { BLOG_URL } from '@shared/constants/url';
import { NICKNAME } from '@shared/constants/nickname';

interface PostProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({
    id: post.slug,
  }));
}

export default async function Post(props: PostProps) {
  const params = await props.params;
  const post = posts.find((p) => p.slug === params.id);

  if (!post) {
    return notFound();
  }

  const readTime = getReadingTime(post.content);

  return (
    <section className="px-3 md:px-5">
      <PostHead
        title={post.title}
        date={post.date}
        tagList={post.tag}
        readTime={readTime}
      />
      <PostContent content={post.content} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const id = (await params).id;
  const post = posts.find((p) => p.slug === id);

  if (!post) {
    throw new Error('글이 존재하지 않습니다.');
  }

  return {
    metadataBase: new URL(BLOG_URL),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      url: `${BLOG_URL}/posts/${id}`,
      siteName: NICKNAME,
      type: 'article',
      images: [
        {
          url: '/meta-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/meta-image.png'],
    },
  };
}

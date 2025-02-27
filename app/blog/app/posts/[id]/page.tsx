import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPostBySlug, markdownToHtml } from '@lib';
import { Content, PostHead } from './components';
import { BLOG_URL } from '@constants/url';
import { NICKNAME } from '@constants/nickname';
import { getReadingTime } from '@utils';

interface PostProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Post(props: PostProps) {
  const params = await props.params;
  const post = getPostBySlug(params.id);

  if (!post) {
    return notFound();
  }

  const readTime = getReadingTime(post.content);
  const content = await markdownToHtml(post.content || '');

  return (
    <section className="px-3 md:px-5">
      <PostHead
        title={post.title}
        date={post.date}
        tagList={post.tag}
        readTime={readTime}
      />
      <Content content={content} />
    </section>
  );
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  const post = getPostBySlug(id);

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
      type: 'website',
    },
  };
}

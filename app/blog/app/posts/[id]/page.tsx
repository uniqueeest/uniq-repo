import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@lib';
import { Content, PostHead } from './components';

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

  const content = await markdownToHtml(post.content || '');

  return (
    <section>
      <PostHead title={post.title} date={post.date} />
      <Content content={content} />
    </section>
  );
}

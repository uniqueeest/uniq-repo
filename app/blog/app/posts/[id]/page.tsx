import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@lib';

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
      <div>{content}</div>
    </section>
  );
}

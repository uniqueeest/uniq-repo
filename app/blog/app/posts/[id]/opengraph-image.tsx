import { OG_SIZE, renderOgImage } from '@shared/lib/og';
import { getPost, getSortedPosts } from '@shared/lib/posts';

export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ id: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const post = getPost((await params).id);
  return renderOgImage(post?.title ?? 'uniqueeest', post?.description);
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXContent } from '@entities/posts/ui/MDXContent';
import { PostMeta } from '@entities/posts/ui/PostMeta';
import { Tag } from '@entities/posts/ui/Tag';
import { TocAside, TocInline } from '@entities/posts/ui/TableOfContents';
import { getPost, getRelatedPosts, getSortedPosts } from '@shared/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ id: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/posts/[id]'>): Promise<Metadata> {
  const post = getPost((await params).id);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tag,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tag,
    },
  };
}

export default async function PostPage({ params }: PageProps<'/posts/[id]'>) {
  const post = getPost((await params).id);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <div className="relative mx-auto max-w-3xl px-5 pt-14 sm:pt-20">
      <article className="min-w-0">
        <header className="border-b border-line pb-10">
          <h1 className="text-[1.85rem] leading-[1.3] font-medium tracking-[-0.015em] text-balance sm:text-[2.25rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
          <div className="mt-6">
            <PostMeta post={post} />
          </div>
          {post.tag.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {post.tag.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="mt-10 xl:hidden">
          <TocInline toc={post.toc} />
        </div>

        <div className="prose mt-10 xl:mt-12">
          <MDXContent code={post.body} />
        </div>

        {related.length > 0 && (
          <nav aria-labelledby="related" className="mt-24 border-t border-line pt-10">
            <h2 id="related" className="text-sm text-subtle">
              관련 글
            </h2>
            <ul className="mt-5 space-y-5">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}`} className="group block">
                    <span className="text-[17px] font-medium group-hover:text-accent">{p.title}</span>
                    <span className="mt-1 block text-[15px] text-muted">{p.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>

      {/* 본문은 가운데 그대로 두고, 목차는 오른쪽 여백에 띄운다 */}
      <aside className="absolute top-0 bottom-0 left-full ml-6 hidden w-56 pt-20 xl:block">
        <TocAside toc={post.toc} />
      </aside>
    </div>
  );
}

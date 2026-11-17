import Link from 'next/link';
import { formatDate, type Post } from '@shared/lib/posts';
import { Tag } from './Tag';

export const PostList = ({ posts }: { posts: Post[] }) => (
  <ul className="space-y-9">
    {posts.map((post) => (
      <li key={post.slug} className="grid gap-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-0">
        <time dateTime={post.date} className="pt-[3px] text-[13px] text-subtle">
          {formatDate(post.date)}
        </time>
        <div>
          <h3 className="text-lg leading-snug font-medium">
            <Link href={`/posts/${post.slug}`} className="hover:text-accent">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{post.description}</p>
          {post.tag.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
              {post.tag.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

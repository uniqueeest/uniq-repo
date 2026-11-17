import { NICKNAME } from '@shared/constants/nickname';
import { formatDate, type Post } from '@shared/lib/posts';

export const PostMeta = ({ post }: { post: Post }) => (
  <p className="text-[13px] text-subtle">
    <span className="italic">by</span> {NICKNAME}
    <span className="mx-2" aria-hidden="true">·</span>
    <time dateTime={post.date}>{formatDate(post.date)}</time>
  </p>
);

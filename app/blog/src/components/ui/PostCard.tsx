import Link from 'next/link';
import dayjs from 'dayjs';

import { NICKNAME } from '@constants/nickname';
import { Post } from '@interface/post';
import { cn } from '@utils';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, date, slug } = post;

  return (
    <div className={cn('flex flex-col', 'lg:py-5 lg:px-2', 'hover:bg-gray-3')}>
      <Link href={`/posts/${slug}`}>
        <h3 className={cn('mb-5', 'text-2xl font-semibold')}>{title}</h3>
        <p className="font-medium">{NICKNAME}</p>
        <p className="text-sm text-gray-11">
          {dayjs(date).format('YYYY.MM.DD')}
        </p>
      </Link>
    </div>
  );
};

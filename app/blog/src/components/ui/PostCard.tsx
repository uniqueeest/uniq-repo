import Link from 'next/link';
import dayjs from 'dayjs';

import { NICKNAME } from '@constants/nickname';
import { Post } from '@interface/post';
import { cn } from '@utils';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, description, date, slug } = post;

  return (
    <div
      className={cn('flex flex-col', 'py-3 px-2 lg:py-5', 'hover:bg-gray-3')}
    >
      <Link href={`/posts/${slug}`}>
        <h3 className={cn('mb-4', 'text-xl lg:text-2xl font-semibold')}>
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              'mb-1',
              'text-sm break-keep lg:text-base text-blue-12',
            )}
          >
            {description}
          </p>
        )}
        <p className="text-sm lg:text-base font-medium">{NICKNAME}</p>
        <p className="text-xs lg:text-sm text-gray-11">
          {dayjs(date).format('YYYY.MM.DD')}
        </p>
      </Link>
    </div>
  );
};

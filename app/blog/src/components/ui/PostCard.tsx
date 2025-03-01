import Link from 'next/link';
import dayjs from 'dayjs';
import { cn } from '@uniqueeest/utils';

import { NICKNAME } from '@constants/nickname';
import { Post } from '@interface/post';
import { Tag } from './Tag';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, description, date, slug, tag: tagList } = post;

  return (
    <div
      className={cn('flex flex-col', 'p-3 md:px-5 lg:py-5', 'hover:bg-gray-3')}
    >
      <Link href={`/posts/${slug}`}>
        <h3 className={cn('mb-4', 'text-xl lg:text-2xl font-semibold')}>
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              'mb-1',
              'text-sm break-keep lg:text-base text-blue-10',
            )}
          >
            {description}
          </p>
        )}
        {tagList && (
          <div className={cn('flex gap-1', 'mt-3 mb-1')}>
            {tagList.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        )}
        <p className="text-sm lg:text-base font-medium">{NICKNAME}</p>
        <p className="text-xs lg:text-sm text-gray-11">
          {dayjs(date).format('YYYY.MM.DD')}
        </p>
      </Link>
    </div>
  );
};

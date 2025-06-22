import Link from 'next/link';
import dayjs from 'dayjs';
import { cn } from '@uniqueeest/utils';

import { Post } from '../model/types';
import { Tag } from './Tag';
import { getReadingTime } from '../lib/calculateReadingTime';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, description, date, slug, tag: tagList, content } = post;

  const readTime = getReadingTime(content);

  return (
    <div
      className={cn(
        'flex flex-col',
        'p-3 md:px-5 lg:py-5',
        'rounded-[4px]',
        'hover:bg-gray-3',
      )}
    >
      <Link href={`/posts/${slug}`}>
        <div
          className={cn(
            'flex items-center gap-2',
            'mb-4',
            'text-xs lg:text-sm text-gray-9',
          )}
        >
          {tagList && (
            <div className="flex gap-2">
              {tagList.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          )}
          <p>{readTime}</p>
          <p>·</p>
          <p>{dayjs(date).format('YYYY.MM.DD')}</p>
        </div>
        <h3 className={cn('mb-3', 'text-xl lg:text-2xl font-semibold')}>
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
      </Link>
    </div>
  );
};

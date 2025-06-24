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
    <Link
      href={`/posts/${slug}`}
      className="block focus:outline-none"
      aria-label={`${title} 포스트 읽기 - ${readTime}, ${dayjs(date).format('YYYY년 MM월 DD일')}`}
    >
      <div
        className={cn(
          'flex flex-col',
          'p-3 md:px-5 lg:py-5',
          'border border-gray-5',
          'rounded-[4px]',
          'hover:bg-gray-3',
          'transition-colors duration-200',
        )}
      >
        <header className="mb-4">
          <div
            className={cn(
              'flex items-center gap-2',
              'text-xs lg:text-sm text-gray-9',
            )}
          >
            {tagList && (
              <div className="flex gap-2" role="list" aria-label="태그 목록">
                {tagList.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            )}
            <p className="text-gray-9">{readTime}</p>
            <span aria-hidden="true">·</span>
            <p className="text-gray-9">{dayjs(date).format('YYYY.MM.DD')}</p>
          </div>
        </header>

        <div>
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
        </div>
      </div>
    </Link>
  );
};

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@uniqueeest/utils';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  thumbnail?: string;
}

export const PostCard = ({
  title,
  description,
  date,
  slug,
  thumbnail,
}: PostCardProps) => {
  return (
    <Link href={`/${slug}`} className="block group">
      <article className={cn('flex flex-col gap-4', 'w-full')}>
        <div className="aspect-w-1 aspect-h-1 bg-gray-2 overflow-hidden">
          <Image
            src={thumbnail ? thumbnail : '/pildam-zip.png'}
            alt={title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
            )}
            width={1020}
            height={1020}
          />
        </div>
        <div className={cn('flex flex-col gap-3')}>
          <h3 className={cn('text-xl group-hover:text-blue-5')}>{title}</h3>
          <p className={cn('text-sm text-gray-7 font-light line-clamp-2')}>
            {description}
          </p>
        </div>
        <p className="text-sm text-gray-7 font-light">{date}</p>
      </article>
    </Link>
  );
};

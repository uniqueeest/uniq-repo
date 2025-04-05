import Image from 'next/image';
import { cn } from '@uniqueeest/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface PostHeaderProps {
  title: string;
  author: string;
  date: string;
  thumbnailUrl: string;
}

export const PostHeader = ({
  title,
  author,
  date,
  thumbnailUrl,
}: PostHeaderProps) => {
  return (
    <div className={cn('absolute inset-0', 'h-screen w-full')}>
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover brightness-[0.6]"
        priority
      />
      <div
        className={cn(
          'absolute inset-0 z-10',
          'flex items-center justify-center',
        )}
      >
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            {title}
          </h1>
          <p className="text-gray-3 font-light">
            {dayjs(date).format('YYYY.MM.DD')}
          </p>
        </div>
      </div>
    </div>
  );
};

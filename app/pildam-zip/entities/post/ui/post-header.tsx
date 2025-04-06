import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@uniqueeest/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface PostHeaderProps {
  title: string;
  date: string;
  thumbnailUrl: string;
}

export const PostHeader = ({ title, date, thumbnailUrl }: PostHeaderProps) => {
  return (
    <div className={cn('absolute inset-0', 'h-screen w-full')}>
      <div
        className={cn(
          'sticky top-0 left-0 right-0 z-20',
          'flex items-center justify-between',
          'h-16 px-4 lg:px-10',
        )}
      >
        <Link href="/" className="font-bold text-xl lg:text-2xl text-white">
          필담집
        </Link>
      </div>
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

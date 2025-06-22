import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { cn } from '@uniqueeest/utils';

import { Tag } from '@entities/posts/ui/Tag';

interface PostHeadProps {
  title: string;
  date: string;
  readTime: string;
  tagList?: string[];
}

export const PostHead = ({ title, date, readTime, tagList }: PostHeadProps) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-4',
        'py-6 lg:py-8 lg:center-1020',
        'border-b border-b-gray-8',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2',
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
      <h2 className="font-bold text-gray-10 text-3xl leading-normal lg:text-size-36">
        {title}
      </h2>
    </section>
  );
};

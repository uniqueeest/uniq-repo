import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { Tag } from '@components/ui';
import { NICKNAME } from '@constants/nickname';
import { cn } from '@utils';

interface PostHeadProps {
  title: string;
  date: string;
  tagList?: string[];
}

export const PostHead = ({ title, date, tagList }: PostHeadProps) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-4',
        'pt-3 pb-5 lg:pt-5 lg:pb-10 lg:center-1020',
        'border-b border-b-gray-8',
      )}
    >
      <div className="flex flex-col items-end gap-2 lg:flex-row lg:justify-between lg:items-end">
        {tagList ? (
          <div className="flex gap-2 lg:gap-3">
            {tagList.map((tag) => (
              <Tag className="lg:text-lg" key={tag} tag={tag} />
            ))}
          </div>
        ) : (
          <div />
        )}
        <div className="flex flex-col gap-1 text-end">
          <p className="text-xs lg:text-sm text-gray-9">
            {dayjs(date).format('YYYY년 MM월 DD일')}
          </p>
          <p className="text-base lg:text-xl text-blue-10 font-semibold">
            {NICKNAME}
          </p>
        </div>
      </div>
      <h2 className="font-bold text-gray-10 text-3xl leading-normal lg:text-[50px]">
        {title}
      </h2>
    </section>
  );
};

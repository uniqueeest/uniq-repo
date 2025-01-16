import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { cn } from '@utils';
import { NICKNAME } from '@constants/nickname';

interface PostHeadProps {
  title: string;
  date: string;
}

export const PostHead = ({ title, date }: PostHeadProps) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-4',
        'pt-3 pb-5 px-3 lg:pt-5 lg:pb-10 lg:center-1280',
        'border-b border-b-gray-8',
      )}
    >
      <div className="flex flex-col gap-1 text-end">
        <p className="text-xs lg:text-sm text-gray-9">
          {dayjs(date).format('YYYY년 MM월 DD일')}
        </p>
        <p className="text-base lg:text-xl text-blue-10 font-semibold">
          {NICKNAME}
        </p>
      </div>
      <h2 className="font-bold text-gray-10 text-3xl lg:text-[50px]">
        {title}
      </h2>
    </section>
  );
};

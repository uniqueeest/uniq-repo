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
        'lg:pt-5 lg:pb-10 lg:center-1280',
        'border-b border-b-gray-8',
      )}
    >
      <div className="flex flex-col gap-1 text-end">
        <p className="text-sm text-gray-10">
          {dayjs(date).format('YYYY년 MM월 DD일')}
        </p>
        <p className="text-xl text-blue-12 font-semibold">{NICKNAME}</p>
      </div>
      <h2 className="font-bold text-gray-12 text-[60px]">{title}</h2>
    </section>
  );
};

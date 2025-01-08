import { cn } from '@lib';

import markdownStyles from './markdown-styles.module.css';

interface ContentProps {
  content: string;
}

export const Content = ({ content }: ContentProps) => {
  return (
    <section
      className={cn(
        'flex items-center gap-5',
        'lg:py-10 lg:mx-auto lg:w-[1280px]',
      )}
    >
      <article
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

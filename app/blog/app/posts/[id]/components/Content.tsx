import { cn } from '@utils';

import markdownStyles from './markdown-styles.module.css';

interface ContentProps {
  content: string;
}

export const Content = ({ content }: ContentProps) => {
  return (
    <section
      className={cn('flex items-center gap-5', 'py-5 lg:py-10 lg:center-1020')}
    >
      <article
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

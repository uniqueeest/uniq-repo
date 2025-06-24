import { cn } from '@uniqueeest/utils';

import markdownStyles from './markdown-styles.module.css';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <section
      className={cn('flex items-center gap-5', 'py-5 lg:py-10 lg:center-720')}
    >
      <article
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

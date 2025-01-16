import { cn } from '@utils';

export const Footer = () => {
  return (
    <footer
      className={cn(
        'relative',
        'lg:py-5 h-24 lg:h-72',
        'bg-gray-4',
        'overflow-hidden',
      )}
    >
      <h3
        className={cn(
          'absolute top-3 left-3 lg:top-0 lg:left-10',
          'text-[80px] font-bold text-gray-12 lg:text-[300px]',
        )}
      >
        FOOTER
      </h3>
      <p
        className={cn(
          'absolute top-3 right-3 lg:top-8 lg:right-12',
          'text-sm lg:text-xl text-gray-11 lg:font-medium',
        )}
      >
        dbswo9795@gmail.com
      </p>
    </footer>
  );
};

import { cn } from '@utils';

export const Footer = () => {
  return (
    <footer
      className={cn(
        'relative',
        'lg:py-5 lg:h-72',
        'bg-gray-4',
        'lg:overflow-hidden',
      )}
    >
      <h3
        className={cn(
          'absolute top-0 left-10',
          'lg:text-[300px] text-gray-12 lg:font-bold',
        )}
      >
        FOOTER
      </h3>
      <p
        className={cn(
          'absolute top-8 right-12',
          'lg:text-xl text-gray-11 lg:font-medium',
        )}
      >
        dbswo9795@gmail.com
      </p>
    </footer>
  );
};

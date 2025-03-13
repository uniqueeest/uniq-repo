import { cn } from '@uniqueeest/utils';

export const Footer = () => {
  return (
    <footer
      className={cn(
        'relative',
        'lg:py-5 h-28 lg:h-72',
        'bg-gray-4',
        'overflow-hidden',
      )}
    >
      <h3
        className={cn(
          'absolute top-3 left-3 lg:top-0 lg:left-10',
          'text-[100px] font-bold text-gray-10 lg:text-[300px]',
        )}
      >
        FOOTER
      </h3>
      <p
        className={cn(
          'absolute top-3 right-3 lg:top-8 lg:right-12',
          'text-sm lg:text-base text-gray-9 lg:font-medium',
        )}
      >
        © 2024 Yoonjae Choi. All rights reserved
      </p>
    </footer>
  );
};

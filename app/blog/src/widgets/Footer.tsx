import { cn } from '@uniqueeest/utils';

export const Footer = () => {
  return (
    <footer className={cn('relative', 'py-6', 'border-t border-gray-5')}>
      <div
        className={cn(
          'flex justify-between items-center',
          'px-4 lg:center-720',
          'h-full',
        )}
      >
        <p className="text-sm text-gray-9">
          © 2024 Yoonjae Choi. All rights reserved
        </p>
      </div>
    </footer>
  );
};

import Image from 'next/image';

import { cn } from '@lib';

export const Header = () => {
  return (
    <header className={cn('lg:py-5', 'bg-gray-4 border-b border-b-gray-7')}>
      <div
        className={cn('flex items-center gap-5', 'lg:mx-auto lg:w-[1280px]')}
      >
        <Image src="/uniqueeest.png" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-medium">uniqueeest</h1>
      </div>
    </header>
  );
};

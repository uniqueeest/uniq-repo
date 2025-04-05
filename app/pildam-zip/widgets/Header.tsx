'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@uniqueeest/utils';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0',
        'h-16 lg:px-10',
        'bg-white/80 backdrop-blur-sm z-50 border-b border-gray-3',
      )}
    >
      <div className={cn('flex items-center justify-between', 'h-full')}>
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-2xl text-gray-10">
            필담집
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink href="/" isActive={pathname === '/'}>
              홈
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'}>
              소개
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'text-gray-8 hover:text-gray-10 transition-colors',
        isActive && 'text-gray-10 font-medium',
      )}
    >
      {children}
    </Link>
  );
}

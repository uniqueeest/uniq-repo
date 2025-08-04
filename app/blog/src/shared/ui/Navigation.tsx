'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@uniqueeest/utils';

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className={cn('border-b border-gray-200', className)}>
      <div className="flex items-center gap-6 lg:gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative py-3',
                'text-sm',
                'transition-colors duration-200',
                'border-b-2 border-transparent',
                isActive
                  ? 'text-gray-9 border-green-9'
                  : 'text-gray-8 hover:text-gray-9',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

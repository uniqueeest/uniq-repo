'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@features/ThemeToggle';
import { NICKNAME } from '@shared/constants/nickname';

const NAV_ITEMS = [
  { href: '/posts', label: '글' },
  { href: '/about', label: '소개' },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
        <Link href="/" className="text-[15px] font-bold tracking-[-0.01em]">
          {NICKNAME}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-2.5 py-5 text-sm transition-colors ${
                  isActive
                    ? 'text-ink after:absolute after:inset-x-1 after:bottom-[-1px] after:h-0.5 after:bg-accent'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

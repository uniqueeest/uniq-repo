'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { cn } from '@uniqueeest/utils';
import { useScrollDirection } from '@uniqueeest/hooks';

import { CONTACT_LIST } from '../shared/constants/contact';

export const Header = () => {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();

  const isArticlePage = pathname.startsWith('/posts');
  const shouldHiding =
    scrollDirection === 'down' ? '-translate-y-[64px]' : 'translate-y-0';

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('이메일 주소가 복사되었습니다.');
    } catch (e) {
      toast.error('다시 시도해주세요.');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0',
        'h-16 px-4 lg:px-10',
        'bg-white/80 backdrop-blur-sm z-40 border-b border-gray-3',
        'transition-all duration-300',
        isArticlePage && shouldHiding,
      )}
    >
      <div
        className={cn(
          'flex justify-between items-center',
          'h-full lg:center-1020',
        )}
      >
        <Link
          href="/"
          className={cn('flex items-center gap-5', 'cursor-pointer')}
        >
          <Image src="/uniqueeest.png" alt="logo" width={32} height={32} />
          <h1 className="hidden lg:block text-xl font-medium">uniqueeest</h1>
        </Link>
        <div className="flex items-center gap-4 lg:gap-6">
          {CONTACT_LIST.map((contact) => (
            <div key={contact.label}>
              {contact.label === 'mail' ? (
                <button
                  className="block"
                  onClick={() => handleCopyEmail(contact.link)}
                >
                  <Image
                    src={contact.img}
                    alt={contact.label}
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    width={0}
                    height={0}
                  />
                </button>
              ) : (
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={contact.img}
                    alt={contact.label}
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    width={0}
                    height={0}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

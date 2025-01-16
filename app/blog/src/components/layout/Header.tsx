'use client';

import Link from 'next/link';
import Image from 'next/image';

import { CONTACT_LIST } from '@constants/contact';
import { cn } from '@utils';

export const Header = () => {
  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      //TODO: 이후 토스트로 변경 필요
      alert('복사되었습니다.');
    } catch (e) {
      alert('실패했습니다.');
    }
  };

  return (
    <header className={cn('p-3 lg:py-5', 'bg-gray-3 border-b border-b-gray-5')}>
      <div className="flex justify-between lg:center-1280">
        <Link
          href="/"
          className={cn('flex items-center gap-5', 'cursor-pointer')}
        >
          <Image src="/uniqueeest.png" alt="logo" width={40} height={40} />
          <h1 className="hidden lg:block text-2xl font-medium">uniqueeest</h1>
        </Link>
        <div className="flex items-center gap-1 lg:gap-2">
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
                    className="w-[30px] h-[30px] lg:w-[38px] lg:h-[38px]"
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
                    className="w-8 h-8 lg:w-10 lg:h-10"
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

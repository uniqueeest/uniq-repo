import Link from 'next/link';
import { CONTACT_LIST } from '@shared/constants/contact';
import { NICKNAME } from '@shared/constants/nickname';

export const Footer = () => (
  <footer className="mt-24 border-t border-line">
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        <span className="font-bold text-ink">{NICKNAME}</span>
        <span className="mx-2 text-line">|</span>
        개발, AI, 일과 생각에 대한 기록.
      </p>
      <ul className="flex gap-5">
        {CONTACT_LIST.map(({ label, link }) => (
          <li key={label}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link href="/feed.xml" className="hover:text-ink">
            RSS
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

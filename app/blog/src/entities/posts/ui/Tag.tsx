import Link from 'next/link';

export const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}`;

export const Tag = ({ tag }: { tag: string }) => (
  <Link href={tagHref(tag)} className="text-[13px] text-subtle transition-colors hover:text-ink">
    #{tag}
  </Link>
);

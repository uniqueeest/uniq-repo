import type { Post } from '@shared/lib/posts';

type TocItem = Post['toc'][number];

const TocList = ({ items, depth = 0 }: { items: TocItem[]; depth?: number }) => (
  <ul className={depth ? 'mt-2 space-y-2 pl-3' : 'space-y-2.5'}>
    {items.map((item) => (
      <li key={item.url}>
        <a href={item.url} className="text-muted transition-colors hover:text-ink">
          {item.title}
        </a>
        {item.items.length > 0 && <TocList items={item.items} depth={depth + 1} />}
      </li>
    ))}
  </ul>
);

/** 넓은 화면: 본문 오른쪽에 고정 */
export const TocAside = ({ toc }: { toc: TocItem[] }) =>
  toc.length > 0 && (
    <nav
      aria-label="목차"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-line pl-5 text-[13px] leading-snug"
    >
      <p className="mb-4 text-[12px] font-bold text-subtle">목차</p>
      <TocList items={toc} />
    </nav>
  );

/** 좁은 화면: 본문 위 접이식 */
export const TocInline = ({ toc }: { toc: TocItem[] }) =>
  toc.length > 0 && (
    <details className="group mb-10 border-b border-line pb-3 text-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-muted [&::-webkit-details-marker]:hidden">
        목차
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-4 pb-2">
        <TocList items={toc} />
      </div>
    </details>
  );

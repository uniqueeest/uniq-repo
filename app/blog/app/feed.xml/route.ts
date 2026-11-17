import { BLOG_URL } from '@shared/constants/url';
import { NICKNAME } from '@shared/constants/nickname';
import { getSortedPosts } from '@shared/lib/posts';

export const dynamic = 'force-static';

const escape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export function GET() {
  const items = getSortedPosts()
    .map(
      (post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${BLOG_URL}/posts/${post.slug}</link>
      <guid>${BLOG_URL}/posts/${post.slug}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tag.map((t) => `<category>${escape(t)}</category>`).join('')}
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${NICKNAME}</title>
    <link>${BLOG_URL}</link>
    <description>개발, AI, 그리고 일하며 생각한 것들에 대한 기록</description>
    <language>ko</language>
    <atom:link href="${BLOG_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

import type { MetadataRoute } from 'next';
import { BLOG_URL } from '@shared/constants/url';
import { getAllTags, getSortedPosts } from '@shared/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPosts();
  const latest = posts[0]?.date;

  return [
    { url: BLOG_URL, lastModified: latest },
    { url: `${BLOG_URL}/about` },
    ...getAllTags().map(([tag]) => ({
      url: `${BLOG_URL}/tags/${encodeURIComponent(tag)}`,
    })),
    ...posts.map((post) => ({
      url: `${BLOG_URL}/posts/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}

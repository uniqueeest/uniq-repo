import type { MetadataRoute } from 'next';

import { BLOG_URL } from '@constants/url';
import { getAllPosts } from '@lib';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrl = posts.map((post) => ({
    url: `${BLOG_URL}/posts/${post.slug}`,
    lastModified: new Date(),
  }));

  const rootUrl = {
    url: BLOG_URL,
    lastModified: new Date(),
  };

  const redirectUrl = {
    url: `${BLOG_URL}/`,
    lastModified: new Date(),
  };

  return [rootUrl, redirectUrl, ...postUrl];
}

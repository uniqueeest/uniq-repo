import type { MetadataRoute } from 'next';

import { BLOG_URL } from '@constants/url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BLOG_URL}/sitemap.xml`,
  };
}

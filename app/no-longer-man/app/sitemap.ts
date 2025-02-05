import type { MetadataRoute } from 'next';

import { URL } from '@/src/constants/url';

export default function sitemap(): MetadataRoute.Sitemap {
  // 메인 페이지
  const mainUrl = {
    url: URL.replace(/\/$/, ''),
    lastModified: new Date().toISOString(),
  };

  return [mainUrl];
}

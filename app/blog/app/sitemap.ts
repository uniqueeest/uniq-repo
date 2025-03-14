import type { MetadataRoute } from 'next';
import { BLOG_URL } from '@constants/url';
import { getAllPosts } from '@lib';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // 블로그 포스트 URL
  const postUrls = posts.map((post) => ({
    url: `${BLOG_URL}/posts/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
  }));

  // 메인 페이지
  const mainUrl = {
    url: BLOG_URL.replace(/\/$/, ''),
    lastModified: new Date().toISOString(),
  };

  return [mainUrl, ...postUrls];
}

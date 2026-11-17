import { posts } from '@/.velite';

export type Post = (typeof posts)[number];

export const getSortedPosts = () =>
  posts
    .filter((post) => !post.draft)
    .toSorted((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  getSortedPosts().find((post) => post.slug === slug);

export const getAllTags = () => {
  const counts = new Map<string, number>();
  for (const post of getSortedPosts()) {
    for (const tag of post.tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].toSorted((a, b) => b[1] - a[1]);
};

/** 태그가 많이 겹치는 순으로 관련 글을 고른다 */
export const getRelatedPosts = (post: Post, limit = 3) =>
  getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tag.filter((t) => post.tag.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .toSorted((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);

export const formatDate = (date: string) => date.slice(0, 10).replaceAll('-', '.');

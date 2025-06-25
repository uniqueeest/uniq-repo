import { posts } from '@/.velite';

export const getSortedPosts = () => {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

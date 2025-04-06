import { posts } from '@/.velite';

import { PostCard } from '@/entities/post/ui';

export default function Home() {
  return (
    <section className="center-700">
      <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            date={post.date}
            id={post.id}
          />
        ))}
      </article>
    </section>
  );
}

import { getAllPosts } from '@entities/posts/api';
import { PostCard } from '@entities/posts/ui/PostCard';

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <section className="py-3 lg:py-5 lg:center-1020">
      <article>
        {allPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </article>
    </section>
  );
}

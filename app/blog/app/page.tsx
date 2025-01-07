import Link from 'next/link';

import { getAllPosts } from '@lib';

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <section>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>uniqueeest</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

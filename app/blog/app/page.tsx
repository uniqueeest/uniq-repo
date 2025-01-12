import { getAllPosts } from '@lib';
import { HomePage } from './Home-Client';

export default function Home() {
  const allPosts = getAllPosts();

  return <HomePage posts={allPosts} />;
}

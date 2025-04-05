import { PostCard } from '@/entities/post';

const MOCK_POSTS = [
  {
    id: 1,
    title: '브런치 스타일로 만드는 블로그',
    description:
      '브런치처럼 세련된 디자인의 블로그를 만드는 방법에 대해 알아봅니다. 깔끔한 타이포그래피와 여백을 활용한 레이아웃이 특징입니다.',
    date: '2024-10-28T00:00:00Z',
    slug: 'create-brunch-style-blog',
  },
  {
    id: 2,
    title: '미니멀한 디자인의 매력',
    description:
      '불필요한 요소를 제거하고 본질에 집중하는 미니멀 디자인의 매력과 그 철학에 대해 이야기합니다.',
    date: '2024-10-28T00:00:00Z',
    slug: 'charm-of-minimal-design',
  },
];

export default function Home() {
  return (
    <section className="center-700">
      <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {MOCK_POSTS.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </article>
    </section>
  );
}

import { PostHeader } from '@/entities/post';

// 이 함수는 서버에서 실제 데이터를 가져올 때 대체될 예정입니다
const getPostData = (slug: string) => {
  // 임시 데이터
  return {
    title: '브런치 스타일의 멋진 블로그 포스트 제목',
    content: `
      <p>이것은 포스트의 내용입니다. 실제로는 MDX 또는 마크다운 컨텐츠가 여기에 렌더링될 것입니다.</p>
      <p>브런치처럼 깔끔하고 읽기 좋은 타이포그래피를 적용했습니다.</p>
      <p>여기에는 더 많은 내용이 들어갈 수 있습니다. 글의 본문 내용이 표시됩니다.</p>
      <h2>부제목도 멋지게 표시됩니다</h2>
      <p>이렇게 계속해서 내용이 이어집니다. 실제로는 더 많은 내용이 들어갈 것입니다.</p>
      <p>이 예시는 단지 레이아웃을 보여주기 위한 것입니다.</p>
            <p>이것은 포스트의 내용입니다. 실제로는 MDX 또는 마크다운 컨텐츠가 여기에 렌더링될 것입니다.</p>
      <p>브런치처럼 깔끔하고 읽기 좋은 타이포그래피를 적용했습니다.</p>
      <p>여기에는 더 많은 내용이 들어갈 수 있습니다. 글의 본문 내용이 표시됩니다.</p>
      <h2>부제목도 멋지게 표시됩니다</h2>
      <p>이렇게 계속해서 내용이 이어집니다. 실제로는 더 많은 내용이 들어갈 것입니다.</p>
      <p>이 예시는 단지 레이아웃을 보여주기 위한 것입니다.</p>
            <p>이것은 포스트의 내용입니다. 실제로는 MDX 또는 마크다운 컨텐츠가 여기에 렌더링될 것입니다.</p>
      <p>브런치처럼 깔끔하고 읽기 좋은 타이포그래피를 적용했습니다.</p>
      <p>여기에는 더 많은 내용이 들어갈 수 있습니다. 글의 본문 내용이 표시됩니다.</p>
      <h2>부제목도 멋지게 표시됩니다</h2>
      <p>이렇게 계속해서 내용이 이어집니다. 실제로는 더 많은 내용이 들어갈 것입니다.</p>
      <p>이 예시는 단지 레이아웃을 보여주기 위한 것입니다.</p>
            <p>이것은 포스트의 내용입니다. 실제로는 MDX 또는 마크다운 컨텐츠가 여기에 렌더링될 것입니다.</p>
      <p>브런치처럼 깔끔하고 읽기 좋은 타이포그래피를 적용했습니다.</p>
      <p>여기에는 더 많은 내용이 들어갈 수 있습니다. 글의 본문 내용이 표시됩니다.</p>
      <h2>부제목도 멋지게 표시됩니다</h2>
      <p>이렇게 계속해서 내용이 이어집니다. 실제로는 더 많은 내용이 들어갈 것입니다.</p>
      <p>이 예시는 단지 레이아웃을 보여주기 위한 것입니다.</p>
    `,
    author: '작가 이름',
    date: '2024-10-28T00:00:00Z',
    thumbnailUrl: '',
  };
};

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = getPostData(slug);

  return (
    <>
      <PostHeader
        title={post.title}
        author={post.author}
        date={post.date}
        thumbnailUrl={post.thumbnailUrl ? post.thumbnailUrl : '/pildam-zip.png'}
      />
      <div className="mt-[100vh]">
        <div className="center-1020 mt-16">
          <div className="max-w-prose mx-auto px-4">
            <div
              className="prose prose-lg prose-gray mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

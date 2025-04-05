export default function AboutPage() {
  return (
    <div className="center-1020 py-16">
      <h1 className="text-4xl font-bold mb-8">필담집 소개</h1>

      <div className="prose max-w-none">
        <p className="text-xl leading-relaxed mb-6">
          필담집은 다양한 생각과 이야기를 나누는 공간입니다. 브런치처럼
          고급스러운 분위기에서 깊이 있는 글을 공유할 수 있습니다.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">우리의 철학</h2>
        <p className="mb-6">
          필담집은 글을 통해 서로의 생각을 공유하고 소통하는 장입니다. 글을 쓰는
          작가들과 그 글을 읽는 독자들이 함께 만들어가는 커뮤니티를 지향합니다.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">이야기를 시작하세요</h2>
        <p className="mb-6">
          당신의 이야기는 누군가에게 영감을 줄 수 있습니다. 글쓰기를 통해 자신의
          생각을 정리하고, 세상과 공유해보세요.
        </p>

        <blockquote className="bg-gray-50 p-6 border-l-4 border-gray-300 italic my-8">
          &ldquo;글쓰기는 생각을 정리하는 가장 효과적인 방법이다.&rdquo;
        </blockquote>

        <h2 className="text-2xl font-bold mt-10 mb-4">필담집 팀</h2>
        <p>
          필담집은 글쓰기와 독서를 사랑하는 사람들이 모여 만들었습니다. 우리는
          더 나은 글쓰기 환경을 제공하기 위해 노력하고 있습니다.
        </p>
      </div>
    </div>
  );
}

import * as runtime from 'react/jsx-runtime';

// velite가 컴파일한 MDX 함수 본문을 실행한다 (https://velite.js.org/guide/using-mdx)
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MDXContentProps) => {
  const Component = useMDXComponent(code);
  // 빌드 타임 정적 렌더링이라 렌더마다 새 컴포넌트가 생겨도 상태 유실 문제가 없다
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
};

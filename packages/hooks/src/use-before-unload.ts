import { useEffect } from 'react';

/**
 *
 * @param callback 브라우저 뒤로가기 또는 새로고침 이벤트 발생 시 실행할 콜백 함수
 * @param options 이벤트 캡처 옵션
 */
export const useBeforeUnload = (
  callback: (event: BeforeUnloadEvent) => unknown,
  options?: { capture?: boolean },
): void => {
  const { capture } = options || {};
  useEffect(() => {
    const opts = capture != null ? { capture } : undefined;
    window.addEventListener('beforeunload', callback, opts);
    return () => {
      window.removeEventListener('beforeunload', callback, opts);
    };
  }, [callback, capture]);
};

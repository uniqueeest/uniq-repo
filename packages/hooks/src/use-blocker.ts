'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';

/**
 *
 * @param shouldBlock 네비게이션을 차단할지 여부를 결정하는 함수
 * @returns 네비게이션 차단 상태를 관리하는 객체
 */
// reference: https://github.com/vercel/next.js/discussions/47020#discussioncomment-12640439
export const useBlocker = (
  shouldBlock: boolean | (() => boolean),
): {
  proceed: () => void;
  reset: () => void;
  state: 'blocked' | 'proceeding' | 'unblocked';
} => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAttemptingNavigation, setIsAttemptingNavigation] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | undefined>();

  const originalPushRef = useRef(router.push);
  const originalBackRef = useRef(router.back);
  const isBlockingRef = useRef(false);
  const hasAddedHistoryEntry = useRef(false);

  // 뒤로가기 차단을 위한 히스토리 엔트리 추가
  const addHistoryEntry = useCallback(() => {
    if (!hasAddedHistoryEntry.current) {
      // 현재 히스토리 상태 확인
      const currentState = history.state;

      // 이미 blocker 상태가 있다면 추가하지 않음
      if (currentState?.blocker) {
        hasAddedHistoryEntry.current = true;
        return;
      }

      const blockerState = {
        blocker: true,
        url: window.location.href,
      };

      history.pushState(blockerState, '', window.location.href);
      hasAddedHistoryEntry.current = true;
    }
  }, []);

  // 히스토리 엔트리 제거
  const removeHistoryEntry = useCallback(() => {
    if (hasAddedHistoryEntry.current) {
      // 현재 상태가 blocker인지 확인 후 제거
      const currentState = history.state;
      if (currentState?.blocker) {
        history.back();
      }
      hasAddedHistoryEntry.current = false;
    }
  }, []);

  useEffect(() => {
    const originalPush = originalPushRef.current;

    const handleNavigation = (url: string) => {
      const isBlocked =
        typeof shouldBlock === 'function' ? shouldBlock() : shouldBlock;

      if (!isBlocked || url === pathname) {
        originalPush(url);
        return;
      }

      if (nextRoute !== url) {
        setIsAttemptingNavigation(true);
        setNextRoute(url);
      }
    };

    router.push = ((url) => {
      handleNavigation(url);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [shouldBlock, pathname, nextRoute, router]);

  useEffect(() => {
    const handlePopState = () => {
      const isBlocked =
        typeof shouldBlock === 'function' ? shouldBlock() : shouldBlock;

      if (isBlocked && !isBlockingRef.current) {
        isBlockingRef.current = true;

        // 현재 상태가 이미 blocker가 아닌 경우에만 새로운 엔트리 추가
        const currentState = history.state;
        if (!currentState?.blocker) {
          const blockerState = {
            blocker: true,
            url: window.location.href,
          };
          history.pushState(blockerState, '', window.location.href);
        }

        setIsAttemptingNavigation(true);
        setNextRoute('back');
      }
    };

    const isBlocked =
      typeof shouldBlock === 'function' ? shouldBlock() : shouldBlock;

    if (isBlocked) {
      addHistoryEntry();
      window.addEventListener('popstate', handlePopState);
    } else {
      removeHistoryEntry();
      window.removeEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [shouldBlock, addHistoryEntry, removeHistoryEntry]);

  const proceedNavigation = () => {
    if (nextRoute) {
      setIsAttemptingNavigation(false);

      if (nextRoute === 'back') {
        // 차단 해제하고 바로 뒤로가기 실행
        isBlockingRef.current = true;

        if (hasAddedHistoryEntry.current) {
          hasAddedHistoryEntry.current = false;
          // history.back()을 두 번 호출: 1) 추가된 엔트리 제거, 2) 실제 뒤로가기
          history.go(-2);
        } else {
          originalBackRef.current();
        }

        // 네비게이션 완료 후 차단 상태 리셋
        isBlockingRef.current = false;
      } else {
        originalPushRef.current(nextRoute);
      }

      setNextRoute(undefined);
    }
  };

  const cancelNavigation = () => {
    setIsAttemptingNavigation(false);
    setNextRoute(undefined);
    isBlockingRef.current = false;
  };

  return {
    proceed: proceedNavigation,
    reset: cancelNavigation,
    state: isAttemptingNavigation ? 'blocked' : 'unblocked',
  };
};

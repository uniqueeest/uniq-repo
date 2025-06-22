import { useState, useEffect, useRef, useCallback } from 'react';

const SCROLL_THRESHOLD = 10;
const TOP_OFFSET_THRESHOLD = 50;

type ScrollDirection = 'up' | 'down';

interface UseScrollDirectionOptions {
  threshold?: number;
  topOffsetThreshold?: number;
}

/**
 * 스크롤 방향을 감지하는 훅
 *
 * requestAnimationFrame을 사용하여 브라우저 렌더링 사이클과 동기화된
 * 효율적인 스크롤 이벤트 처리를 제공합니다.
 *
 * @param options 스크롤 감지 설정 옵션
 * @returns 현재 스크롤 방향 ('up' | 'down')
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * const scrollDirection = useScrollDirection();
 *
 * // 커스텀 설정
 * const scrollDirection = useScrollDirection({
 *   threshold: 20,
 *   topOffsetThreshold: 100
 * });
 * ```
 */
export const useScrollDirection = (options?: UseScrollDirectionOptions) => {
  const {
    threshold = SCROLL_THRESHOLD,
    topOffsetThreshold = TOP_OFFSET_THRESHOLD,
  } = options || {};

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // 스크롤이 최상단에 가까울 때는 항상 'up'으로 설정 (헤더 표시 등)
    if (currentScrollY < topOffsetThreshold) {
      setScrollDirection('up');
      lastScrollY.current = currentScrollY;
      return;
    }

    // 일정 임계값 이상 스크롤해야 방향 변화를 감지
    if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
      return;
    }

    // 현재 스크롤 위치와 이전 스크롤 위치를 비교하여 방향 설정
    setScrollDirection(lastScrollY.current > currentScrollY ? 'up' : 'down');
    lastScrollY.current = currentScrollY;
  }, [threshold, topOffsetThreshold]);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', requestTick, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, [requestTick]);

  return scrollDirection;
};

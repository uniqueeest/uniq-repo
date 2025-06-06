import { useEffect, useCallback, useRef } from 'react';

/**
 * 페이지 이탈 차단을 위한 설정 옵션
 */
export interface UseBlockerOptions {
  /** 차단 기능 활성화 여부 */
  when: boolean;
  /** 페이지 이탈 시 표시할 메시지 (onBlock이 없을 때 기본 confirm에서 사용) */
  message?: string;
  /** 커스텀 차단 로직 함수 - true 반환 시 이탈 허용, false 반환 시 이탈 차단 */
  onBlock?: () => boolean | Promise<boolean>;
  /** 차단이 발생했을 때 호출되는 콜백 */
  onBlocked?: () => void;
  /** 차단 없이 이탈할 때 호출되는 콜백 */
  onUnblocked?: () => void;
}

/**
 * 페이지 이탈을 차단하는 훅
 *
 * React Router DOM에 종속되지 않으면서 다음 상황에서 페이지 이탈을 차단합니다:
 * - 브라우저 탭 닫기/새로고침 (beforeunload) - 브라우저 기본 다이얼로그만 가능
 * - 뒤로가기/앞으로가기 (popstate) - 커스텀 로직 지원
 * - 외부 링크 클릭 등 (click) - 커스텀 로직 지원
 *
 * @param options 차단 설정 옵션
 *
 * @example
 * ```tsx
 * // 기본 사용법 (window.confirm 사용)
 * useBlocker({
 *   when: isDirty,
 *   message: "저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?",
 * });
 *
 * // 커스텀 로직 사용
 * useBlocker({
 *   when: isDirty,
 *   onBlock: async () => {
 *     // 커스텀 모달이나 다른 로직을 사용
 *     return await showCustomModal("변경사항이 저장되지 않을 수 있습니다.");
 *   },
 *   onBlocked: () => console.log("이탈이 차단되었습니다"),
 *   onUnblocked: () => console.log("이탈이 허용되었습니다")
 * });
 * ```
 */
export function useBlocker(options: UseBlockerOptions) {
  const { when } = options;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  // 공통 차단 로직
  const executeBlockLogic = useCallback(async (): Promise<boolean> => {
    if (optionsRef.current.onBlock) {
      try {
        return await optionsRef.current.onBlock();
      } catch (error) {
        console.error('useBlocker: onBlock 함수 실행 중 오류 발생:', error);
        return false; // 오류 시 안전하게 차단
      }
    } else {
      // 기본 확인 다이얼로그
      return window.confirm(optionsRef.current.message || '');
    }
  }, []);

  // beforeunload 이벤트 핸들러 (탭 닫기, 새로고침 등)
  // 주의: beforeunload에서는 커스텀 모달이나 비동기 작업이 불가능합니다.
  // 브라우저가 페이지를 닫기 전에 동기적으로만 처리하기 때문입니다.
  const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    if (!optionsRef.current.when) {
      return;
    }

    // beforeunload에서는 항상 브라우저 기본 다이얼로그 사용
    // 최신 방식: preventDefault() 호출
    event.preventDefault();

    // legacy 브라우저 지원을 위해 returnValue도 설정 (Chrome < 119, Edge < 119 등)
    event.returnValue = true;
  }, []);

  // popstate 이벤트 핸들러 (뒤로가기, 앞으로가기)
  const handlePopState = useCallback(
    async (event: PopStateEvent) => {
      if (!optionsRef.current.when) {
        return;
      }

      const shouldAllow = await executeBlockLogic();

      if (shouldAllow) {
        // 이탈 허용
        optionsRef.current.onUnblocked?.();
      } else {
        // 이탈 차단
        event.preventDefault();
        // 브라우저 히스토리를 원래 상태로 복원
        window.history.pushState(null, '', window.location.href);
        optionsRef.current.onBlocked?.();
      }
    },
    [executeBlockLogic],
  );

  // 링크 클릭 이벤트 핸들러 (외부 링크, 앵커 등)
  const handleClick = useCallback(
    async (event: MouseEvent) => {
      if (!optionsRef.current.when) {
        return;
      }

      const target = event.target as HTMLElement;
      const link = target.closest('a');

      // 외부 링크이거나 새 탭에서 열리는 링크는 제외
      if (
        !link ||
        link.target === '_blank' ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:')
      ) {
        return;
      }

      // 같은 페이지 내 앵커 링크는 제외
      if (
        link.href.includes('#') &&
        link.href.split('#')[0] === window.location.href.split('#')[0]
      ) {
        return;
      }

      // React Router Link와의 충돌을 방지하기 위해 즉시 preventDefault
      event.preventDefault();

      const shouldAllow = await executeBlockLogic();

      if (shouldAllow) {
        // 링크 클릭 허용 - 프로그래밍 방식으로 네비게이션
        optionsRef.current.onUnblocked?.();
        window.location.href = link.href;
      } else {
        // 링크 클릭 차단
        optionsRef.current.onBlocked?.();
      }
    },
    [executeBlockLogic],
  );

  useEffect(() => {
    if (!when) {
      return;
    }

    // 뒤로가기/앞으로가기 차단을 위한 더미 히스토리 엔트리 추가
    window.history.pushState(null, '', window.location.href);

    // 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true); // 캡처 단계에서 처리

    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
    };
  }, [when, handleBeforeUnload, handlePopState, handleClick]);
}

/**
 * 간단한 페이지 이탈 차단 훅 (기본 설정)
 *
 * @param when 차단 조건
 * @param message 차단 시 표시할 메시지
 *
 * @example
 * ```tsx
 * const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
 * useSimpleBlocker(hasUnsavedChanges, "저장하지 않은 변경사항이 있습니다.");
 * ```
 */
export function useSimpleBlocker(when: boolean, message?: string) {
  useBlocker({ when, message });
}

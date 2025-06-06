import { renderHook } from '@testing-library/react';
import { useBlocker, useSimpleBlocker } from '../src/use-blocker';

// DOM 이벤트 모킹
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
const mockPushState = vi.fn();
const mockConfirm = vi.fn();
const mockPreventDefault = vi.fn();

// 전역 객체 모킹
Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

Object.defineProperty(window, 'history', {
  value: {
    pushState: mockPushState,
  },
});

Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
});

Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
  },
  writable: true,
});

Object.defineProperty(document, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(document, 'removeEventListener', {
  value: mockRemoveEventListener,
});

describe('useBlocker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConfirm.mockReturnValue(false); // 기본값으로 차단
  });

  describe('기본 동작', () => {
    it('when이 true일 때 이벤트 리스너가 등록되어야 한다.', () => {
      renderHook(() => useBlocker({ when: true }));

      expect(mockPushState).toHaveBeenCalledWith(
        null,
        '',
        window.location.href,
      );
      expect(mockAddEventListener).toHaveBeenCalledWith(
        'beforeunload',
        expect.any(Function),
      );
      expect(mockAddEventListener).toHaveBeenCalledWith(
        'popstate',
        expect.any(Function),
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function),
        true,
      );
    });

    it('when이 false일 때 이벤트 리스너가 등록되지 않아야 한다.', () => {
      renderHook(() => useBlocker({ when: false }));

      expect(mockPushState).not.toHaveBeenCalled();
      expect(mockAddEventListener).not.toHaveBeenCalled();
    });

    it('컴포넌트가 언마운트될 때 이벤트 리스너가 해제되어야 한다.', () => {
      const { unmount } = renderHook(() => useBlocker({ when: true }));

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'beforeunload',
        expect.any(Function),
      );
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'popstate',
        expect.any(Function),
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function),
        true,
      );
    });

    it('when 값이 변경될 때 이벤트 리스너가 적절히 등록/해제되어야 한다.', () => {
      const { rerender } = renderHook(({ when }) => useBlocker({ when }), {
        initialProps: { when: false },
      });

      // 초기에는 이벤트 리스너가 등록되지 않음
      expect(mockAddEventListener).not.toHaveBeenCalled();

      // when을 true로 변경
      rerender({ when: true });
      expect(mockAddEventListener).toHaveBeenCalled();

      // when을 false로 변경
      vi.clearAllMocks();
      rerender({ when: false });
      expect(mockRemoveEventListener).toHaveBeenCalled();
    });
  });

  describe('기본 confirm 모드', () => {
    it('message가 제공되어야 한다.', () => {
      const customMessage = '사용자 정의 메시지';

      renderHook(() =>
        useBlocker({
          when: true,
          message: customMessage,
        }),
      );

      expect(mockAddEventListener).toHaveBeenCalled();
    });

    it('popstate 이벤트에서 기본 confirm을 사용해야 한다.', async () => {
      const onBlocked = vi.fn();
      const onUnblocked = vi.fn();
      const customMessage = '정말 나가시겠습니까?';

      renderHook(() =>
        useBlocker({
          when: true,
          message: customMessage,
          onBlocked,
          onUnblocked,
        }),
      );

      // popstate 이벤트 핸들러 가져오기
      const popstateHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'popstate',
      )?.[1];

      expect(popstateHandler).toBeDefined();

      // confirm이 false를 반환하는 경우 (차단)
      mockConfirm.mockReturnValue(false);
      const mockEvent = { preventDefault: mockPreventDefault };
      await popstateHandler(mockEvent);

      expect(mockConfirm).toHaveBeenCalledWith(customMessage);
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockPushState).toHaveBeenCalledWith(
        null,
        '',
        window.location.href,
      );
      expect(onBlocked).toHaveBeenCalled();
      expect(onUnblocked).not.toHaveBeenCalled();

      // confirm이 true를 반환하는 경우 (허용)
      vi.clearAllMocks();
      mockConfirm.mockReturnValue(true);
      await popstateHandler(mockEvent);

      expect(onUnblocked).toHaveBeenCalled();
      expect(onBlocked).not.toHaveBeenCalled();
      expect(mockPreventDefault).not.toHaveBeenCalled();
    });
  });

  describe('커스텀 onBlock 모드', () => {
    it('onBlock이 true를 반환하면 이탈을 허용해야 한다.', async () => {
      const onBlock = vi.fn().mockResolvedValue(true);
      const onBlocked = vi.fn();
      const onUnblocked = vi.fn();

      renderHook(() =>
        useBlocker({
          when: true,
          onBlock,
          onBlocked,
          onUnblocked,
        }),
      );

      // popstate 이벤트 핸들러 가져오기
      const popstateHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'popstate',
      )?.[1];

      const mockEvent = { preventDefault: mockPreventDefault };
      await popstateHandler(mockEvent);

      expect(onBlock).toHaveBeenCalled();
      expect(onUnblocked).toHaveBeenCalled();
      expect(onBlocked).not.toHaveBeenCalled();
      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockConfirm).not.toHaveBeenCalled(); // confirm은 호출되지 않아야 함
    });

    it('onBlock이 false를 반환하면 이탈을 차단해야 한다.', async () => {
      const onBlock = vi.fn().mockResolvedValue(false);
      const onBlocked = vi.fn();
      const onUnblocked = vi.fn();

      renderHook(() =>
        useBlocker({
          when: true,
          onBlock,
          onBlocked,
          onUnblocked,
        }),
      );

      // popstate 이벤트 핸들러 가져오기
      const popstateHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'popstate',
      )?.[1];

      const mockEvent = { preventDefault: mockPreventDefault };
      await popstateHandler(mockEvent);

      expect(onBlock).toHaveBeenCalled();
      expect(onBlocked).toHaveBeenCalled();
      expect(onUnblocked).not.toHaveBeenCalled();
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockPushState).toHaveBeenCalledWith(
        null,
        '',
        window.location.href,
      );
    });

    it('onBlock에서 에러가 발생하면 안전하게 차단해야 한다.', async () => {
      const onBlock = vi.fn().mockRejectedValue(new Error('테스트 에러'));
      const onBlocked = vi.fn();
      const onUnblocked = vi.fn();

      renderHook(() =>
        useBlocker({
          when: true,
          onBlock,
          onBlocked,
          onUnblocked,
        }),
      );

      // popstate 이벤트 핸들러 가져오기
      const popstateHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'popstate',
      )?.[1];

      const mockEvent = { preventDefault: mockPreventDefault };
      await popstateHandler(mockEvent);

      expect(onBlock).toHaveBeenCalled();
      expect(onBlocked).toHaveBeenCalled();
      expect(onUnblocked).not.toHaveBeenCalled();
      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('링크 클릭 처리', () => {
    beforeEach(() => {
      // location.href setter 모킹
      Object.defineProperty(window, 'location', {
        value: { href: 'http://localhost:3000' },
        writable: true,
      });
    });

    it('일반 링크 클릭 시 차단 로직이 실행되어야 한다.', async () => {
      const onBlock = vi.fn().mockResolvedValue(false);
      const onBlocked = vi.fn();

      renderHook(() =>
        useBlocker({
          when: true,
          onBlock,
          onBlocked,
        }),
      );

      // click 이벤트 핸들러 가져오기
      const clickHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'click',
      )?.[1];

      // 링크 엘리먼트 모킹
      const mockLink = {
        href: 'http://localhost:3000/other',
        target: '',
        startsWith: vi.fn(),
      };
      const mockTarget = {
        closest: vi.fn().mockReturnValue(mockLink),
      };
      const mockEvent = {
        target: mockTarget,
        preventDefault: mockPreventDefault,
      };

      await clickHandler(mockEvent);

      expect(mockPreventDefault).toHaveBeenCalled();
      expect(onBlock).toHaveBeenCalled();
      expect(onBlocked).toHaveBeenCalled();
    });

    it('외부 링크(_blank)는 차단하지 않아야 한다.', async () => {
      const onBlock = vi.fn();

      renderHook(() =>
        useBlocker({
          when: true,
          onBlock,
        }),
      );

      const clickHandler = mockAddEventListener.mock.calls.find(
        (call) => call[0] === 'click',
      )?.[1];

      const mockLink = {
        href: 'http://external.com',
        target: '_blank',
      };
      const mockTarget = {
        closest: vi.fn().mockReturnValue(mockLink),
      };
      const mockEvent = {
        target: mockTarget,
        preventDefault: mockPreventDefault,
      };

      await clickHandler(mockEvent);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(onBlock).not.toHaveBeenCalled();
    });
  });
});

describe('useSimpleBlocker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('when이 true일 때 이벤트 리스너가 등록되어야 한다.', () => {
    renderHook(() => useSimpleBlocker(true));

    expect(mockAddEventListener).toHaveBeenCalled();
  });

  it('when이 false일 때 이벤트 리스너가 등록되지 않아야 한다.', () => {
    renderHook(() => useSimpleBlocker(false));

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it('커스텀 메시지와 함께 작동해야 한다.', () => {
    const customMessage = '저장하지 않은 변경사항이 있습니다.';

    renderHook(() => useSimpleBlocker(true, customMessage));

    expect(mockAddEventListener).toHaveBeenCalled();
  });
});

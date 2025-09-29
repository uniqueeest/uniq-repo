import { renderHook, act } from '@testing-library/react';
import { useScrollDirection } from '../src/use-scroll-direction';

// DOM 이벤트 모킹
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

// 전역 객체 모킹
Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

// requestAnimationFrame 모킹
const mockRequestAnimationFrame = vi.fn((callback) => {
  callback();
  return 1;
});

Object.defineProperty(window, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
});

describe('useScrollDirection', () => {
  let scrollHandler: (event: Event) => void;

  beforeEach(() => {
    vi.clearAllMocks();

    // scrollY 초기화
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });

    // addEventListener에서 핸들러 함수 추출
    mockAddEventListener.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler;
      }
    });
  });

  it('기본적으로 "up" 방향을 반환해야 한다.', () => {
    const { result } = renderHook(() => useScrollDirection());

    expect(result.current).toBe('up');
  });

  it('스크롤 이벤트 리스너가 등록되어야 한다.', () => {
    renderHook(() => useScrollDirection());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      {
        passive: true,
      },
    );
  });

  it('enabled가 false일 때 스크롤 이벤트 리스너가 등록되지 않아야 한다.', () => {
    renderHook(() => useScrollDirection({ enabled: false }));

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it('컴포넌트 언마운트 시 스크롤 이벤트 리스너가 제거되어야 한다.', () => {
    const { unmount } = renderHook(() => useScrollDirection());

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  it('아래로 스크롤할 때 "down" 방향을 반환해야 한다.', () => {
    const { result } = renderHook(() => useScrollDirection());

    // 스크롤 위치를 100px로 설정 (임계값 10px 초과)
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });

    act(() => {
      scrollHandler(new Event('scroll'));
    });

    expect(result.current).toBe('down');
  });

  it('임계값보다 작은 스크롤 변화는 무시되어야 한다.', () => {
    const { result } = renderHook(() => useScrollDirection());

    // 임계값(10px)보다 작은 변화
    Object.defineProperty(window, 'scrollY', {
      value: 5,
      writable: true,
    });

    act(() => {
      scrollHandler(new Event('scroll'));
    });

    // 여전히 초기값 "up"을 유지해야 함
    expect(result.current).toBe('up');
  });

  it('상단 오프셋 임계값 내에서는 항상 "up"을 반환해야 한다.', () => {
    const { result } = renderHook(() => useScrollDirection());

    // 상단 오프셋 임계값(50px) 내에서 스크롤
    Object.defineProperty(window, 'scrollY', {
      value: 30,
      writable: true,
    });

    act(() => {
      scrollHandler(new Event('scroll'));
    });

    expect(result.current).toBe('up');
  });

  it('커스텀 상단 오프셋 임계값이 적용되어야 한다.', () => {
    const { result } = renderHook(() =>
      useScrollDirection({ topOffsetThreshold: 100 }),
    );

    // 커스텀 상단 오프셋 임계값(100px) 내에서 스크롤
    Object.defineProperty(window, 'scrollY', {
      value: 80,
      writable: true,
    });

    act(() => {
      scrollHandler(new Event('scroll'));
    });

    expect(result.current).toBe('up');
  });

  it('requestAnimationFrame이 호출되어야 한다.', () => {
    renderHook(() => useScrollDirection());

    act(() => {
      scrollHandler(new Event('scroll'));
    });

    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('연속된 스크롤 이벤트에서 중복 requestAnimationFrame 호출을 방지해야 한다.', () => {
    renderHook(() => useScrollDirection());

    // 연속된 스크롤 이벤트 발생
    act(() => {
      scrollHandler(new Event('scroll'));
      scrollHandler(new Event('scroll'));
      scrollHandler(new Event('scroll'));
    });

    // requestAnimationFrame은 한 번만 호출되어야 함
    expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(1);
  });
});

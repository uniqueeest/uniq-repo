import { renderHook, act } from '@testing-library/react';

// next/navigation 모킹은 훅 import 이전에 선언되어야 함
const router = {
  push: vi.fn<(url: string) => void>(),
  back: vi.fn<() => void>(),
};
let currentPathname = '/current';

vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => currentPathname,
}));

const goSpy = vi.spyOn(history, 'go').mockImplementation(() => {});
const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

describe('useBlocker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentPathname = '/current';
    router.push = vi.fn();
    router.back = vi.fn();
  });

  it('shouldBlock=false 에서 push가 허용되고 state=unblocked', async () => {
    const { useBlocker } = await import('../src/use-blocker');
    const originalPush = router.push;

    const { result } = renderHook(() => useBlocker(false));
    act(() => router.push('/next'));

    expect(originalPush).toHaveBeenCalledWith('/next');
    expect(result.current.state).toBe('unblocked');
  });

  it('shouldBlock=true 에서 push 차단, proceed() 시 원본 push 호출', async () => {
    const { useBlocker } = await import('../src/use-blocker');
    const originalPush = router.push;

    const { result } = renderHook(() => useBlocker(true));

    act(() => router.push('/next'));
    expect(originalPush).not.toHaveBeenCalled();
    expect(result.current.state).toBe('blocked');

    act(() => result.current.proceed());
    expect(originalPush).toHaveBeenCalledWith('/next');
    expect(result.current.state).toBe('unblocked');
  });

  it('같은 경로로 이동 시(== pathname) 차단하지 않고 원본 push 호출', async () => {
    const { useBlocker } = await import('../src/use-blocker');
    const originalPush = router.push;
    currentPathname = '/same';

    renderHook(() => useBlocker(true));
    act(() => router.push('/same'));

    expect(originalPush).toHaveBeenCalledWith('/same');
  });

  it('같은 URL로 연속 push 시 차단 1회만 발생', async () => {
    const { useBlocker } = await import('../src/use-blocker');
    const originalPush = router.push;

    const { result } = renderHook(() => useBlocker(true));

    act(() => router.push('/next'));
    act(() => router.push('/next'));
    expect(originalPush).not.toHaveBeenCalled(); // 아직 proceed 안 함
    expect(result.current.state).toBe('blocked');

    act(() => result.current.proceed());
    expect(originalPush).toHaveBeenCalledTimes(1);
    expect(originalPush).toHaveBeenCalledWith('/next');
  });

  it('뒤로가기(popstate) 차단 후 proceed() 시 history.go(-2) 호출', async () => {
    const { useBlocker } = await import('../src/use-blocker');

    const { result } = renderHook(() => useBlocker(true));
    // 차단 상태에서 popstate 발생
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));

    expect(result.current.state).toBe('blocked');

    act(() => result.current.proceed());
    expect(goSpy).toHaveBeenCalledWith(-2);
  });

  it('shouldBlock 토글 시 popstate 리스너 등록/해제', async () => {
    const { useBlocker } = await import('../src/use-blocker');

    const { rerender, unmount } = renderHook(({ block }) => useBlocker(block), {
      initialProps: { block: true },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function),
    );

    rerender({ block: false });
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function),
    );

    unmount();
  });
});

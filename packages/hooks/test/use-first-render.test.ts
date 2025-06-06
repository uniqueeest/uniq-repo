import { renderHook } from '@testing-library/react';
import { useFirstRender } from '../src/use-first-render';

describe('useFirstRender', () => {
  it('첫 번째 렌더링에서 콜백이 실행되어야 한다.', () => {
    const callback = vi.fn();

    renderHook(() => useFirstRender(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('재렌더링에서는 콜백이 실행되지 않아야 한다.', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(() => useFirstRender(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();
    expect(callback).toHaveBeenCalledTimes(1);

    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('새로운 콜백이 전달되어도 재렌더링에서는 실행되지 않아야 한다.', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({ callback }) => useFirstRender(callback),
      { initialProps: { callback: callback1 } },
    );

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(0);

    rerender({ callback: callback2 });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(0);
  });
});

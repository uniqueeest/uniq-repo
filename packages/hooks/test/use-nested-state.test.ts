import { renderHook, act } from '@testing-library/react';
import { useNestedState } from '../src/use-nested-state';

describe('useNestedState', () => {
  it('validator 없이 중첩된 값을 업데이트한다.', () => {
    const { result } = renderHook(() =>
      useNestedState({
        form: {
          name: '',
          age: '20',
        },
      }),
    );

    act(() => {
      result.current.handleChange('25', 'form', 'age');
    });

    expect(result.current.state.form.age).toBe('25');
  });

  it('validator를 제공하면 값을 검증한 뒤 저장한다.', () => {
    const trim = vi.fn((value: string) => value.trim());
    const { result } = renderHook(() =>
      useNestedState({
        form: {
          name: '  Alice  ',
        },
      }),
    );

    act(() => {
      result.current.handleChange('  Bob  ', trim, 'form', 'name');
    });

    expect(trim).toHaveBeenCalledWith('  Bob  ');
    expect(result.current.state.form.name).toBe('Bob');
  });

  it('키를 전달하지 않으면 예외를 던진다.', () => {
    const { result } = renderHook(() =>
      useNestedState({
        form: {},
      }),
    );

    expect(() => result.current.handleChange('value')).toThrow(
      '키 값은 필수입니다',
    );
  });
});

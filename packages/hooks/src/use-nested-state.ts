import { useState } from 'react';
import { updateNestedValue } from '@uniqueeest/utils';

/**
 * 중첩된 객체 상태를 관리하는 훅
 *
 * @param initialState 초기 상태 객체
 * @example
 * const { state, handleChange, handleBlur } = useNestedState({
 *   form: {
 *     name: '',
 *     age: '20'
 *   }
 * });
 *
 * // 사용 예시
 * handleChange(
 *   event.target.value,
 *   validateAge,  // 유효성 검사 함수
 *   'form', 'age'
 * );
 */
export function useNestedState<T extends Record<string, any>, V = string>(
  initialState: T,
) {
  const [state, setState] = useState<T>(initialState);

  const handleChange = (
    newValue: V,
    validator: ((value: V) => V) | null,
    ...keys: string[]
  ) => {
    // key가 비어있는 경우
    if (keys.length === 0) {
      throw new Error('Key is required');
    }

    const validatedValue = validator ? validator(newValue) : newValue;
    setState((prev) => updateNestedValue(prev, keys, validatedValue));
  };

  const handleBlur = (currentValue: V, fallbackValue: V, ...keys: string[]) => {
    const finalValue = currentValue || fallbackValue;
    handleChange(finalValue, null, ...keys);
  };

  return { state, handleChange, handleBlur };
}

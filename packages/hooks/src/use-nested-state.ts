import { useState } from 'react';
import { updateNestedValue } from '@uniqueeest/utils';

/**
 * 중첩된 객체 상태를 관리하는 훅
 *
 * @param initialState 초기 상태 객체
 * @example
 * const { state, handleChange, handleBlur } = useNestedState({ form: { age: '20' } });
 *
 * // 검증 함수 없이 값 갱신
 * handleChange(event.target.value, 'form', 'age');
 *
 * // 검증 함수와 함께 값 갱신
 * handleChange(event.target.value, validateAge, 'form', 'age');
 */
export function useNestedState<
  T extends Record<string, any>,
  K extends string = string,
  V = any,
>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  /**
   * 중첩된 객체의 특정 필드 값을 변경합니다.
   *
   * @param newValue 새로운 값
   * @param validator 유효성 검사 함수 (선택적)
   * @param keys 변경할 필드 경로
   */

  function handleChange(
    newValue: V,
    validator: (value: V) => V,
    ...keys: K[]
  ): void;
  function handleChange(newValue: V, ...keys: K[]): void;
  function handleChange(
    newValue: V,
    validatorOrFirstKey?: ((value: V) => V) | K,
    ...restKeys: K[]
  ) {
    const hasValidator = typeof validatorOrFirstKey === 'function';
    const keys = hasValidator
      ? restKeys
      : [validatorOrFirstKey, ...restKeys].filter(
          (key): key is K => typeof key === 'string',
        );

    if (keys.length === 0) {
      throw new Error('키 값은 필수입니다');
    }

    const validator = hasValidator
      ? (validatorOrFirstKey as (value: V) => V)
      : undefined;
    const validatedValue = validator ? validator(newValue) : newValue;
    setState((prev) => updateNestedValue<T, K, V>(prev, keys, validatedValue));
  }

  /**
   * 필드 값이 비어있을 때 기본값을 설정합니다.
   *
   * @param currentValue 현재 값
   * @param fallbackValue 기본값
   * @param keys 필드 경로
   */
  const handleBlur = (currentValue: V, fallbackValue: V, ...keys: K[]) => {
    if (keys.length === 0) {
      throw new Error('키 값은 필수입니다');
    }

    const finalValue = currentValue || fallbackValue;
    setState((prev) => updateNestedValue<T, K, V>(prev, keys, finalValue));
  };

  return { state, handleChange, handleBlur };
}

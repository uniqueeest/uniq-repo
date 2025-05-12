/**
 * 중첩된 객체의 특정 경로에 있는 값을 업데이트합니다.
 *
 * @param obj - 업데이트할 원본 객체
 * @param keys - 업데이트할 값의 경로를 나타내는 키 배열
 * @param value - 새로운 값
 * @returns 업데이트된 새로운 객체
 *
 * @example
 * const settings = {
 *   display: {
 *     theme: {
 *       color: 'red'
 *     }
 *   }
 * };
 *
 * // 중첩된 값 업데이트
 * const newSettings = updateNestedValue(
 *   settings,
 *   ['display', 'theme', 'color'],
 *   'blue'
 * );
 * // 결과: { display: { theme: { color: 'blue' } } }
 */
export function updateNestedValue<
  T extends Record<string, any>,
  K extends string,
  V = any,
>(obj: T, keys: K[], value: V): T {
  if (keys.length === 0) {
    return obj;
  }

  // 객체를 얕은 복사
  const result = { ...obj } as Record<string, any>;

  if (keys.length === 1) {
    result[keys[0]] = value;
    return result as T;
  }

  const [firstKey, ...restKeys] = keys;

  // 해당 키가 없으면 새로운 객체 생성
  const currentValue = obj[firstKey] ?? {};

  // 깊은 경로 업데이트를 위한 재귀 호출
  result[firstKey] = updateNestedValue(
    typeof currentValue === 'object' ? { ...currentValue } : {},
    restKeys as K[],
    value,
  );

  return result as T;
}

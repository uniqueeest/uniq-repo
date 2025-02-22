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
export function updateNestedValue<T extends Record<string, any>>(
  obj: T,
  keys: string[],
  value: any,
): T {
  const updatedObj = { ...obj };
  let current: any = updatedObj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    current[key] = { ...current[key] };
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];

  if (typeof current === 'object' && current !== null) {
    current[lastKey] = value;
  }

  return updatedObj;
}

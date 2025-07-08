import { cn } from '../src/cn';

describe('cn utility function', () => {
  it('should properly merge Tailwind classes', () => {
    // 기본 클래스 병합 테스트
    expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3');
  });

  it('should not merge text color with text size classes', () => {
    // text-white(색상)와 text-size-30(폰트 크기)이 충돌하지 않아야 함
    const result = cn('text-white text-size-30');

    // 두 클래스 모두 유지되어야 함
    expect(result).toContain('text-white');
    expect(result).toContain('text-size-30');
  });

  it('should handle complex class combinations correctly', () => {
    const result = cn(
      'font-bold',
      'text-gray-10',
      'text-size-30',
      'leading-normal',
      'lg:text-size-48',
    );

    // 모든 클래스가 유지되어야 함
    expect(result).toContain('font-bold');
    expect(result).toContain('text-gray-10');
    expect(result).toContain('text-size-30');
    expect(result).toContain('leading-normal');
    expect(result).toContain('lg:text-size-48');
  });

  it('should properly handle class conflicts within the same type', () => {
    // 같은 타입(폰트 크기)의 클래스 충돌
    const result = cn('text-size-30 text-size-48');

    // 나중에 오는 클래스가 우선되어야 함
    expect(result).not.toContain('text-size-30');
    expect(result).toContain('text-size-48');
  });

  it('should handle text color conflicts correctly', () => {
    // 색상 클래스 간 충돌
    const result = cn('text-white text-gray-10');

    // 나중에 오는 클래스가 우선되어야 함
    expect(result).not.toContain('text-white');
    expect(result).toContain('text-gray-10');
  });

  it('should handle conditional classes correctly', () => {
    // 조건부 클래스 처리
    const result = cn(
      'text-white',
      'text-size-30',
      false && 'hidden',
      true && 'block',
    );

    expect(result).toContain('text-white');
    expect(result).toContain('text-size-30');
    expect(result).not.toContain('hidden');
    expect(result).toContain('block');
  });
});

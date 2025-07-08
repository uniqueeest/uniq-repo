import { updateNestedValue } from '../src/update-nested-value';

describe('updateNestedValue', () => {
  const originalObject = {
    user: {
      profile: {
        name: 'John',
        age: 30,
      },
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
    system: {
      version: '1.0.0',
    },
  };

  it('빈 키 배열일 때 원본 객체를 그대로 반환해야 함', () => {
    const result = updateNestedValue(originalObject, [], 'new value');
    expect(result).toBe(originalObject);
  });

  it('단일 키로 최상위 레벨 값을 업데이트해야 함', () => {
    const result = updateNestedValue(originalObject, ['system'], {
      version: '2.0.0',
    });

    expect(result.system).toEqual({ version: '2.0.0' });
    expect(result.user).toBe(originalObject.user); // 다른 프로퍼티는 변경되지 않음
  });

  it('중첩된 키로 깊은 레벨 값을 업데이트해야 함', () => {
    const result = updateNestedValue(
      originalObject,
      ['user', 'profile', 'name'],
      'Jane',
    );

    expect(result.user.profile.name).toBe('Jane');
    expect(result.user.profile.age).toBe(30); // 다른 프로퍼티는 유지
    expect(result.user.settings).toBe(originalObject.user.settings); // 다른 브랜치는 변경되지 않음
  });

  it('존재하지 않는 키 경로에 새로운 값을 생성해야 함', () => {
    const result = updateNestedValue(
      originalObject,
      ['user', 'newSection', 'newField'],
      'new value',
    );

    expect((result.user as any).newSection.newField).toBe('new value');
    expect(result.user.profile).toBe(originalObject.user.profile); // 기존 프로퍼티는 유지
  });

  it('완전히 새로운 최상위 키에 값을 추가해야 함', () => {
    const result = updateNestedValue(
      originalObject,
      ['newTopLevel'],
      'new value',
    );

    expect((result as any).newTopLevel).toBe('new value');
    expect(result.user).toBe(originalObject.user); // 기존 프로퍼티는 유지
  });

  it('원본 객체를 변경하지 않아야 함 (불변성 유지)', () => {
    const originalCopy = JSON.parse(JSON.stringify(originalObject));

    updateNestedValue(
      originalObject,
      ['user', 'profile', 'name'],
      'Changed Name',
    );

    expect(originalObject).toEqual(originalCopy);
  });

  it('다양한 타입의 값을 처리해야 함', () => {
    const testCases = [
      { value: 'string', expected: 'string' },
      { value: 42, expected: 42 },
      { value: true, expected: true },
      { value: null, expected: null },
      { value: undefined, expected: undefined },
      { value: [], expected: [] },
      { value: { nested: 'object' }, expected: { nested: 'object' } },
    ];

    testCases.forEach(({ value, expected }) => {
      const result = updateNestedValue(
        originalObject,
        ['user', 'testField'],
        value,
      );
      expect((result.user as any).testField).toEqual(expected);
    });
  });

  it('깊은 중첩 구조에서 올바르게 동작해야 함', () => {
    const deepObject = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    };

    const result = updateNestedValue(
      deepObject,
      ['level1', 'level2', 'level3', 'level4', 'value'],
      'updated deep value',
    );

    expect(result.level1.level2.level3.level4.value).toBe('updated deep value');
  });

  it('중간 경로가 객체가 아닌 경우 새로운 객체로 교체해야 함', () => {
    const objectWithPrimitive = {
      data: 'primitive value',
    };

    const result = updateNestedValue(
      objectWithPrimitive,
      ['data', 'nested', 'value'],
      'new nested value',
    );

    expect((result.data as any).nested.value).toBe('new nested value');
  });

  it('배열 인덱스를 키로 사용할 수 있어야 함', () => {
    const objectWithArray = {
      items: ['first', 'second'],
    };

    const result = updateNestedValue(
      objectWithArray,
      ['items', '1'],
      'updated second',
    );

    expect(result.items[1]).toBe('updated second');
    expect(result.items[0]).toBe('first');
  });
});
